import { Canvas, useFrame } from "@react-three/fiber";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useThree } from "@react-three/fiber";
import axios from "axios";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { VertexNormalsHelper } from "three/addons/helpers/VertexNormalsHelper.js";
import * as THREE from "three";
import { GUI } from "dat.gui";

const Scene = ({ vertex, fragment }) => {
  const meshRef = useRef();
  const state = useThree();
  state.scene.background = new THREE.Color(0.78, 0.57, 0.57);
  useFrame((state) => {
    let time = state.clock.getElapsedTime();
    // start from 20 to skip first 20 seconds ( optional )
    meshRef.current.material.uniforms.iTime.value = time + 20;
  });
  const gui = new GUI();
  const cameraFolder = gui.addFolder("Camera");
  cameraFolder.add(state.camera.position, "z", 0, 10);
  cameraFolder.add(state.camera.position, "x", 0, 10);
  cameraFolder.add(state.camera.position, "y", 0, 10);
  cameraFolder.add(state.camera.rotation, "x", 0, Math.PI);
  cameraFolder.add(state.camera.rotation, "y", 0, Math.PI);
  cameraFolder.add(state.camera.rotation, "z", 0, Math.PI);
  cameraFolder.open();
  // Define the shader uniforms with memoization to optimize performance
  const uniforms = useMemo(
    () => ({
      iTime: {
        type: "f",
        value: 1.0,
      },
    }),
    []
  );

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <planeGeometry args={[10, 10, 600, 600]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertex}
        fragmentShader={fragment}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

function Mountain() {
  // State variables to store the vertex and fragment shaders as strings
  const [vertex, setVertex] = useState("");
  const [fragment, setFragment] = useState("");

  // Fetch the shaders once the component mounts
  useEffect(() => {
    // fetch the vertex and fragment shaders from public folder
    axios.get("./vertexShader.glsl").then((res) => setVertex(res.data));
    axios.get("./fragmentShader.glsl").then((res) => setFragment(res.data));
  }, []);

  // If the shaders are not loaded yet, return null (nothing will be rendered)
  if (vertex == "" || fragment == "") return null;

  return (
    <div>
      <Canvas
        style={{ width: "100vw", height: "100vh" }}
        camera={{
          position: [0.9, 0.27, 1.3],
          rotation: [0, 0.67, 1.6],
        }}
      >
        <Scene vertex={vertex} fragment={fragment} />
        <axesHelper args={[5]} />
      </Canvas>
    </div>
  );
}

export default Mountain;
