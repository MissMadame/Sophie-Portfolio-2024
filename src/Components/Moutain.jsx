import { useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

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
          result.z = result.z+ 10.0*cos(result.y * 0.5 + u_time*4.0 ) * 0.2;
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

function Mountain() {
  useEffect(() => {}, []);

  return (
    <div>
      <Mountain />
    </div>
  );
}

export default Mountain;
