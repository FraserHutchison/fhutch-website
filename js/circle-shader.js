document.addEventListener('DOMContentLoaded', function() 
{
  const canvas = document.getElementById('shaderCanvas');
  if (canvas) {
    const gl = canvas.getContext('webgl');
    // Your existing code to work with the context

    const vertexShaderSource = `
      attribute vec4 position;
      void main() {
        gl_Position = position;
      }
    `;

    const fragmentShaderSource = `
        // Testing
        // https://www.shadertoy.com/view/MlyGzW
        // https://www.shadertoy.com/view/3tBGRm
        precision mediump float;
        uniform vec2 resolution;
        uniform float time;
        uniform vec2 mouse;      // Mouse input (normalized to resolution)

        vec3 rainbow(float t)
        {
            t = mod(t, 1.0);
            float r = smoothstep(0.0, 1.0, abs(t * 6.0 - 3.0) - 1.0);
            float g = smoothstep(0.0, 1.0, 2.0 - abs(t * 6.0 - 2.0));
            float b = smoothstep(0.0, 1.0, 2.0 - abs(t * 6.0 - 4.0));
            return clamp(vec3(r, g, b), 0.0, 1.0);
        }

        void main()
        {
            vec2 uv = 1.75 * (2.0 * gl_FragCoord.xy - resolution.xy) / resolution.y;
            float sine = sin(1.0 * 15.0 - time * 2.0);
            vec2 offset = vec2(cos(time / 0.5) * mouse.x, sin(time / 2.0) * mouse.y) * sine;

            // Add scaling factor based on time
            float scale = 1.0 + 0.1 * sin(time * 1.5);
            uv *= scale;

            vec3 rainbowColour = rainbow((uv.y * 0.2) + time * 0.1);
            // vec3 rainbowColour = vec3(0.0);
            float ring1 = smoothstep(0.0, 1.0, 0.01 / distance(normalize(uv), uv));
            ring1 *= 0.5; // Reduced intensity

            float ring2 = 0.5 / distance(normalize(uv - offset), uv - offset);

            float combined = ring1 * ring2;

            // Calculate fade factor based on distance to canvas edge
            float fade = smoothstep(0.0, 1.0, 1.0 - length(uv) / 1.5);

            gl_FragColor = vec4(combined * rainbowColour, combined * fade);
        }
    `;

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

    // Set up vertex data for a full-screen quad
    const positions = new Float32Array([
        -1.0, -1.0,
        1.0, -1.0,
        -1.0,  1.0,
        -1.0,  1.0,
        1.0, -1.0,
        1.0,  1.0,
    ]);

    // Create a buffer and bind the data to it
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    // Set up the position attribute
    const positionLocation = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    // Variables to track mouse position
    const mouseLocation = gl.getUniformLocation(program, 'mouse');
    let mouseX = canvas.width / 2; // Initialize to center of canvas
    let mouseY = canvas.height / 2; // Initialize to center of canvas

    // Track mouse position on canvas
    canvas.addEventListener('mousemove', (event) => {
        const rect = canvas.getBoundingClientRect();
        mouseX = event.clientX - rect.left;
        mouseY = event.clientY - rect.top;
    });

    // Set the resolution uniform
    const resolutionLocation = gl.getUniformLocation(program, "resolution");
    gl.uniform2f(resolutionLocation, canvas.width, canvas.height);

    function render(time)
    {
        // Update mouse position
        const mousePosition = [mouseX / canvas.width, mouseY / canvas.height]; // Normalized mouse position
        gl.uniform2fv(mouseLocation, mousePosition);

        // Update time uniform
        gl.uniform1f(gl.getUniformLocation(program, "time"), time * 0.001);

        // Clear the canvas and draw the full-screen quad
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLES, 0, 6); // Draw the full-screen quad
        requestAnimationFrame(render);
    }
    render();

  } else {
      console.error('Canvas element not found');
  }
});