import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import WebGL from "three/addons/capabilities/WebGL.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

//uniform shader: pass from outer to vertex and fragment shader
//varying shader: pass from vertex to fragment shader
function vertexShader() {
  return `
      uniform float u_time; 
      varying vec4 modelViewPosition; 
      varying vec3 vecNormal;
      vec4 result; 
      varying vec2 vUv;
      varying vec3 vColor;
  
      void main() {
        vUv = uv; 
        vColor = color;
        vec4 result = vec4(position, 1.0);
        result.y = result.y+ 10.0*cos(result.z / 4.0 + u_time * 4.0) * 0.2;
        result.x = result.x+ 5.0*sin(result.x * 0.5 + u_time*4.0 ) * 0.2;
        result.z = result.z+ 10.0*sin(result.y * 0.5 + u_time*4.0 ) * 0.2;
        vecNormal = (modelViewMatrix * vec4(normal, 0.0)).xyz; 
        gl_Position = projectionMatrix * modelViewMatrix * result; 
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

//camera orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, -3, 0);
controls.update();

//axis helper
const axesHelper = new THREE.AxesHelper(40);
scene.add(axesHelper);

// Create a Three.js geometry
const geometry = new THREE.BoxGeometry(24, 4, 24, 24, 4, 24);

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

export default wave;
