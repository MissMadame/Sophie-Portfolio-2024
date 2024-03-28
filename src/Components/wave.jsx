import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import WebGL from "three/addons/capabilities/WebGL.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

//uniform shader: pass from outer to vertex and fragment shader
//varying shader: pass from vertex to fragment shader
function vertexShader() {
  return `
      uniform float u_time; 
      varying vec2 vUv;
      varying vec3 vColor;

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
        float scale = 0.75; 
        float displacement =30.0; 
        vUv = uv ;
        vec3 pos = position;
        float fn = fbm(vec2(vUv.y * 0.3*u_time * scale),(vUv.y * scale)) ; // uv value at the vertex position
        pos.z +=  fn * displacement; // make sure it is always up
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;
}

function FragmentShader() {
  return `
      varying vec2 vUv;
      varying vec4 modelViewPosition; 
      varying vec3 vecNormal; 
      uniform float u_time; 
      varying vec3 vColor;


      void main() {
        gl_FragColor = vec4(vUv.y, abs(cos(u_time)), 0.667, 1.0);
        //gl_FragColor = vec4( vColor.r,vColor.r, vColor.r,1.0 );


      }
  `;
}

const clock = new THREE.Clock();
const uniformData = {
  u_time: {
    type: "f",
    value: clock.getElapsedTime(),
  },
};

const render = () => {
  uniformData.u_time.value = clock.getElapsedTime();
  window.requestAnimationFrame(render);
};
render();

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  500
);

camera.position.set(50, 50, 0);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

window.addEventListener(
  "resize",
  function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  },
  false
);

//camera orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, -3, 0);
controls.update();

//axis helper
const axesHelper = new THREE.AxesHelper(40);
scene.add(axesHelper);

// Create a Three.js geometry
const geometry = new THREE.PlaneGeometry(100, 100, 24, 24);
// Create a Three.js material
let material = new THREE.ShaderMaterial({
  uniforms: uniformData,
  fragmentShader: FragmentShader(),
  vertexShader: vertexShader(),
  vertexColors: true,
  //wireframe: true,
});
// Create a Three.js mesh
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Animate the scene
const animate = () => {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
};
animate();

function wave() {
  return (
    <div>
      <h1>This is a Mountain Component</h1>
    </div>
  );
}

export default Wave;
