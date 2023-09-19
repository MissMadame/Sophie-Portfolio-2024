import * as THREE from "three";
import React from "react";
import WebGL from "three/addons/capabilities/WebGL.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import GUI from "lil-gui";

let planetMesh;
let angle = 0;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  500
);
camera.position.set(0, 0, 50);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//camera orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, -3, 0);
controls.update();

const loader = new GLTFLoader();
loader.load(
  "./model.gltf",
  function (gltf) {
    planetMesh = gltf.scene.children[0];
    planetMesh.scale.set(5, 5, 5);
    planetMesh.position.set(0, 0, 0);
    scene.add(planetMesh);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

//draw shape
const materialLine = new THREE.LineBasicMaterial({ color: 0x0000ff });
const points = [];
points.push(new THREE.Vector3(-10, 0, 0));
points.push(new THREE.Vector3(0, -10, 0));
points.push(new THREE.Vector3(10, 0, 0));
points.push(new THREE.Vector3(0, 10, 0));
points.push(new THREE.Vector3(-10, 0, 0));

const geometryLine = new THREE.BufferGeometry().setFromPoints(points);
const line = new THREE.Line(geometryLine, materialLine);
scene.add(line);

//texture cube
let cube;
const Texloader = new THREE.TextureLoader();
Texloader.load("./texture.jpeg", (texture) => {
  texture.colorSpace = THREE.SRGBColorSpace;
  const geometry = new THREE.BoxGeometry(5, 5, 5);
  const material = new THREE.MeshPhysicalMaterial({
    map: texture,
  });
  cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
});

//light
//color helper
class ColorGUIHelper {
  constructor(object, prop) {
    this.object = object;
    this.prop = prop;
  }
  get value() {
    return `#${this.object[this.prop].getHexString()}`;
  }
  set value(hexString) {
    this.object[this.prop].set(hexString);
  }
}
//helper GUI
function makeXYZGUI(gui, vector3, name, onChangeFn) {
  const folder = gui.addFolder(name);
  folder.add(vector3, "x", -10, 10).onChange(onChangeFn);
  folder.add(vector3, "y", 0, 10).onChange(onChangeFn);
  folder.add(vector3, "z", -10, 10).onChange(onChangeFn);
  folder.open();
}

const color = 0xffffff;
const intensity = 10;
const light = new THREE.DirectionalLight(color, intensity);
light.position.set(10, 10, 0);
light.target.position.set(0, 0, 0);
scene.add(light);
scene.add(light.target);

const helper = new THREE.DirectionalLightHelper(light);
scene.add(helper);

const skyColor = 0xd67171; // light blue
const groundColor = 0xd67171; // brownish orange
const intensity2 = 5;
const light2 = new THREE.HemisphereLight(skyColor, groundColor, intensity2);
scene.add(light2);

const gui = new GUI();
gui.addColor(new ColorGUIHelper(light, "color"), "value").name("color");
gui.add(light, "intensity", 0, 10, 0.01);
gui.add(light.target.position, "x", -10, 10);
gui.add(light.target.position, "z", -10, 10);
gui.add(light.target.position, "y", 0, 10);
makeXYZGUI(gui, light.position, "position", updateLight);
makeXYZGUI(gui, light.target.position, "target", updateLight);
gui.addColor(new ColorGUIHelper(light2, "color"), "value").name("skyColor");
gui
  .addColor(new ColorGUIHelper(light2, "groundColor"), "value")
  .name("groundColor");
gui.add(light2, "intensity", 0, 10, 0.01);

function updateLight() {
  light.target.updateMatrixWorld();
  helper.update();
}
updateLight();

//animation
function animate(time) {
  requestAnimationFrame(animate);

  if (planetMesh) {
    planetMesh.rotation.y += 0.01 * (Math.PI / 2);
    planetMesh.rotation.x += 0.01 * (Math.PI / 4);
  }

  cube.rotation.x = time * 0.001;
  cube.rotation.y = time * 0.001;
  renderer.render(scene, camera);
}

if (WebGL.isWebGLAvailable()) {
  // Initiate function or other initializations here
  animate();
} else {
  const warning = WebGL.getWebGLErrorMessage();
  document.getElementById("container").appendChild(warning);
}

function Cube() {
  return (
    <div>
      <h1>This is a Cube Component</h1>
    </div>
  );
}

export default Cube;
