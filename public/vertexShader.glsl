uniform float i_time;
varying vec2 vUv;

float rand (vec2 uv) {
    return fract(sin(dot(uv.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

float value_noise (vec2 uv) {
    vec2 ipos = floor(uv);
    vec2 fpos = fract(uv); 
    
    float o  = rand(ipos);
    float x  = rand(ipos + vec2(1, 0));
    float y  = rand(ipos + vec2(0, 1));
    float xy = rand(ipos + vec2(1, 1));
    
    vec2 smoothNumber = smoothstep(vec2(0), vec2(1), fpos);
    return mix( mix(o,  x, smoothNumber.x), 
                 mix(y, xy, smoothNumber.x), smoothNumber.y);
}

float fbm (vec2 uv) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 0.0;
    // Loop of octaves
    for (int i = 0; i < 10; i++) {
        value += amplitude * value_noise(uv) ;
        uv *= 2.0; // lacunarity
        amplitude *= 0.5; // gain
    }
    return value; 
}


void main() {
    float scale =30.0; 
    float displacement = 0.7; 
    vUv = uv ;
    vec3 pos = position;
    float fn = fbm(vUv * scale); // uv value at the vertex position
    pos.z +=  fn * displacement; // make sure it is always up
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}