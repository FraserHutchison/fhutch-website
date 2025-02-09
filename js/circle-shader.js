document.addEventListener('DOMContentLoaded', function() {
        const canvas = document.getElementById('shaderCanvas');
        if (canvas) {
          const gl = canvas.getContext('webgl');
      
          function loadShaderSource(url) {
            return fetch(url).then(response => response.text());
          }
      
          Promise.all([
            loadShaderSource('circle-shader-vertex.glsl'),
            loadShaderSource('circle-shader-fragment.glsl')
          ]).then(([vertexShaderSource, fragmentShaderSource]) => {
            function compileShader(gl, source, type) {
              let shader = gl.createShader(type);
              gl.shaderSource(shader, source);
              gl.compileShader(shader);
              if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                console.error(gl.getShaderInfoLog(shader));
                return null;
              }
              return shader;
            }
      
            const vertexShader = compileShader(gl, vertexShaderSource, gl.VERTEX_SHADER);
            const fragmentShader = compileShader(gl, fragmentShaderSource, gl.FRAGMENT_SHADER);
      
            const program = gl.createProgram();
            gl.attachShader(program, vertexShader);
            gl.attachShader(program, fragmentShader);
            gl.linkProgram(program);
            if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
              console.error(gl.getProgramInfoLog(program));
            }
            gl.useProgram(program);
      
            const positions = new Float32Array([
              -1.0, -1.0,
              1.0, -1.0,
              -1.0,  1.0,
              -1.0,  1.0,
              1.0, -1.0,
              1.0,  1.0,
            ]);
      
            const positionBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
      
            const positionLocation = gl.getAttribLocation(program, "position");
            gl.enableVertexAttribArray(positionLocation);
            gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
      
            const mouseLocation = gl.getUniformLocation(program, 'mouse');
            let mouseX = canvas.width / 2;
            let mouseY = canvas.height / 2;
      
            canvas.addEventListener('mousemove', (event) => {
              const rect = canvas.getBoundingClientRect();
              mouseX = event.clientX - rect.left;
              mouseY = event.clientY - rect.top;
            });
      
            const resolutionLocation = gl.getUniformLocation(program, "resolution");
            gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      
            function render(time) {
              const mousePosition = [mouseX / canvas.width, mouseY / canvas.height];
              gl.uniform2fv(mouseLocation, mousePosition);
              gl.uniform1f(gl.getUniformLocation(program, "time"), time * 0.001);
              gl.clear(gl.COLOR_BUFFER_BIT);
              gl.drawArrays(gl.TRIANGLES, 0, 6);
              requestAnimationFrame(render);
            }
            render();
          }).catch(error => {
            console.error('Error loading shader files:', error);
          });
        } else {
          console.error('Canvas element not found');
        }
      });