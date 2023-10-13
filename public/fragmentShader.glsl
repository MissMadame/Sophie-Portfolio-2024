uniform float iTime;
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
    mat2 rotation = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
    // Loop of octaves
    for (int i = 0; i < 10; i++) {
        value += amplitude * value_noise(uv) ;
        uv *= 2.0; // lacunarity
        amplitude *= 0.5; // gain
    }
    return value; 
}

void main() {
    vec2 uv = vUv * 30.0;
    float t = iTime * 0.2;
    float value = 0.0; 
    vec2 q, r;    
    vec3 color = vec3(0.0); 
    float vertexColor =  (fbm(uv)); 

    q.x = fbm( uv + vec2(0.0,0.0) + 0.125* t);
    q.y = fbm( uv + vec2(5.2,1.3) - 0.75*t );
    r.x = fbm( uv + 8.0*q + vec2(1.7,9.2) + 0.75*t);
    r.y = fbm( uv + 8.0*q + vec2(8.3,2.8) + 0.25*t);
    value = fbm( 0.5*uv + 2.0*r); 

    color = mix(vec3(0.101961,0.619608,0.666667),
                vec3(0.666667,0.666667,0.498039),
                smoothstep((value)*4.0,0.0,1.0));

    color = mix(color,
                vec3(0.801,0.935,0.797),
                smoothstep(q.x /q.y,0.0,1.0));

    color = mix(color,
                vec3(0.666667,1,1),
                clamp(value,0.0,0.5));

    color = mix(vec3(0.96, 0.8, 0.46),color,  vertexColor); 
    gl_FragColor = vec4(color, 1.0);

}
