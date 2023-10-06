import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import WebGL from "three/addons/capabilities/WebGL.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const Eyeball = () => {
  const canvas = useRef(null);

  useEffect(() => {
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const scene = new THREE.Scene();
    const geometry = new THREE.SphereGeometry(1, 32, 32);

    const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

    const fragmentShader = `
    uniform sampler2D tex1;
    uniform float hour;
    uniform float minute;
    uniform float second;
    varying vec2 vUv;
    
    float rectangle (vec2 uv, vec2 scale) {
      vec2 s = scale * 0.5;
      vec2 shaper = vec2(step(-s.x, uv.x), step(-s.y, uv.y));
      shaper *= vec2(1.0 - step(s.x, uv.x), 1.0 - step(s.y, uv.y));
      return shaper.x * shaper.y;
    }
    
    float circle (vec2 uv, float size) {
      return smoothstep(0.0, 0.005, 1.0 - length(uv) / size);
    }
    
    mat3 translateMatrix(vec2 translation) {
      return mat3(
        1.0, 0.0, x,
        0.0, 1.0, y,
        0.0, 0.0, 1.0
      );
    }
    
    mat3 scaleMatrix(float scaleMagnitude) {
      return mat3(
        scaleMagnitude, 0.0, 0.0,
        0.0, scaleMagnitude, 0.0,
        0.0, 0.0, 1.0
      );
    }
    
    mat3 rotationMatrix(float angle) {
      return mat3(
        cos(angle), -sin(angle), 0.0,
        sin(angle), cos(angle), 0.0,
        0.0, 0.0, 1.0
      );
    }

    void main() {
        vec2 uv = vUv * 2.0 - 1.0;
        float t = mod(gl_FragCoord.z, 1.0);
        vec3 color = vec3(0.0);
        float count = 24.0;

        float polar = (atan(uv.y, uv.x) / 6.28318530718) + 0.5;
        float hA = polar;
        hA = mod(hA + (hour / 12.0) + 0.25, 1.0);
        float mA = polar;
        mA = mod(mA + (minute / 60.0) + 0.25, 1.0);
        float sA = polar;
        sA = mod(sA + (second / 60.0) + 0.5, 1.0);

        color = vec3(0.5 * step(sA, mod(polar + 0.25, 1.0)));
        float polarMask = step(sA, mod(polar + 0.25, 1.0));

        vec3 t1 = texture2D(tex1, uv * 0.5 - 0.5).rgb;
        vec3 t2 = texture2D(tex1, uv * 0.95).rgb;
        vec2 t3UV = uv * 0.5;
        float Secondangle = (second / 60.0 + 0.37) * 6.28318530718;
        t3UV = (rotationMatrix(-Secondangle) * vec3(t3UV, 1.0)).xy;
        vec3 t3 = texture2D(tex1, t3UV).rgb;

        color += vec3(t1.g * polarMask - 2.0 * t1.r - t1.b * polarMask);
        color += 0.5 * vec3(t2.b + t2.r) * (1.0 - polarMask);
        color += 5.0 * vec3(t3.g);

        for (int i = 0; i < int(count); i++) {
            vec2 newUV = uv;
            float offset = 0.5 * float(i);
            float angle = (second / 60.0 + 0.37) * 6.28318530718 - (offset + 6.28318530718);
            mat3 composite = translateMatrix(vec2(0.48)) * rotationMatrix(angle);
            composite = scaleMatrix(1.0 + floor(mod(float(i), 3.0))) * composite;
            newUV = (composite * vec3(newUV, 1.0)).xy;
            float newCircle = circle(newUV, 0.03);
            float changeFrequency = step(0.5, mod(second, 1.0));
            float shouldAdd = step(0.5, mod(second, 1.0)) + step(0.0, mod(float(i + 1), 2.0));
            color += shouldAdd * 2.0 * newCircle;
            float shouldSubtract = step(mod(second, 1.0), 0.5) * step(mod(float(i + 1), 2.0), 0.0);
            color -= shouldSubtract * 2.0 * newCircle;
        }

        for (int i = 0; i < 20; i++) {
            vec2 newUV = uv;
            float difference = (minute / 60.0) / 20.0;
            float offset = difference * float(i) * 4.0;
            float minuteAngle = abs((minute / 60.0 + 0.37) * 6.28318530718 - offset);
            mat3 composite = translateMatrix(vec2(0.23)) * rotationMatrix(minuteAngle);
            composite = scaleMatrix(1.0 + 0.5 * float(i)) * composite;
            newUV = (composite * vec3(newUV, 1.0)).xy;
            float newRect = rectangle(newUV, vec2(0.06));
            color += vec3(newRect);
        }

        float outerCircle = circle(uv, 0.25);
        color += vec3(outerCircle);
        float minuteFrequency = step(0.5, mod(second / 60.0, 1.0));
        vec2 newUV = uv;
        float innerCircle = circle(newUV, 0.08);
        color -= 10.0 * vec3(innerCircle);

        for (int i = 0; i < 10; i++) {
            vec2 newUV = uv;
            float offset = 0.45 * float(i);
            float hourAngle = (hour / 12.0 + 0.37) * 6.28318530718 - (offset + 6.28318530718);
            mat3 composite = translateMatrix(vec2(0.1)) * rotationMatrix(hourAngle);
            composite = scaleMatrix(scaleMatrix(1.0 + 0.5 * float(i))) * composite;
            newUV = (composite * vec3(newUV, 1.0)).xy;h
            float newCircle = circle(newUV, 0.03);
            color -= 2.0 * vec3(newCircle);
        }

        gl_FragColor = vec4(color.r, 0.0, 0.2, 1.0);
        }
  `;

    const uniforms = {
      tex1: { value: new THREE.TextureLoader().load("./mask") },
      hour: { value: 0 },
      minute: { value: 0 },
      second: { value: 0 },
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    camera.position.z = 5;

    const animate = () => {
      const now = new Date();
      const hour = now.getHours();
      const minute = now.getMinutes();
      const second = now.getSeconds();
      material.uniforms.hour.value = hour;
      material.uniforms.minute.value = minute;
      material.uniforms.second.value = second;
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();
  }, []);

  return <canvas ref={canvas} />;
};

export default Eyeball;
