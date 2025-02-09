precision mediump float;
uniform vec2 resolution;
uniform float time;
uniform vec2 mouse;

vec3 rainbow(float t) {
  t = mod(t, 1.0);
  float r = smoothstep(0.0, 1.0, abs(t * 6.0 - 3.0) - 1.0);
  float g = smoothstep(0.0, 1.0, 2.0 - abs(t * 6.0 - 2.0));
  float b = smoothstep(0.0, 1.0, 2.0 - abs(t * 6.0 - 4.0));
  return clamp(vec3(r, g, b), 0.0, 1.0);
}

void main() {
  vec2 uv = 1.75 * (2.0 * gl_FragCoord.xy - resolution.xy) / resolution.y;
  float sine = sin(1.0 * 15.0 - time * 2.0);
  vec2 offset = vec2(cos(time / 0.5) * mouse.x, sin(time / 2.0) * mouse.y) * sine;
  float scale = 1.0 + 0.1 * sin(time * 1.5);
  uv *= scale;
  vec3 rainbowColour = rainbow((uv.y * 0.2) + time * 0.1);
  float ring1 = smoothstep(0.0, 1.0, 0.01 / distance(normalize(uv), uv));
  ring1 *= 0.5;
  float ring2 = 0.5 / distance(normalize(uv - offset), uv - offset);
  float combined = ring1 * ring2;
  float fade = smoothstep(0.0, 1.0, 1.0 - length(uv) / 1.5);
  gl_FragColor = vec4(combined * rainbowColour, combined * fade);
}