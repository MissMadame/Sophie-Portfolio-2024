import * as THREE from 'three';
import React from 'react';
import WebGL from 'three/addons/capabilities/WebGL.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

let planetMesh;
let angle = 0;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500 );
camera.position.set( 0, 0, 100 );
camera.lookAt( 0, 0, 0 );
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


const loader = new GLTFLoader();
loader.load( './model.gltf', function ( gltf ) {
	planetMesh =	gltf.scene.children[0];
	planetMesh.scale.set( 5, 5, 5 );	
	planetMesh.position.set( 0, 0, 0 );
	scene.add( planetMesh );
}, undefined, function ( error ) {
	console.error( error );
} );

const materialLine = new THREE.LineBasicMaterial( { color: 0x0000ff } );
const points = [];
points.push( new THREE.Vector3( - 10, 0, 0 ) );
points.push( new THREE.Vector3( 0,-10, 0 ) );
points.push( new THREE.Vector3( 10, 0, 0 ) );
points.push( new THREE.Vector3( 0, 10, 0 ) )
points.push( new THREE.Vector3( - 10, 0, 0 ) );

const geometryLine = new THREE.BufferGeometry().setFromPoints( points );
const line = new THREE.Line( geometryLine, materialLine);
scene.add( line );


const geometry = new THREE.BoxGeometry( 5, 5, 5 );
const material = new THREE.MeshBasicMaterial();

const color1 = new THREE.Color(1, 0, 0);
const color2 = new THREE.Color(0, 0, 1); // Blue
const blendedColor = new THREE.Color().lerpColors(color1, color2, 0.15); // 0.5 is the blend factor

material.color.set(blendedColor);
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 50;

function animate() {
	requestAnimationFrame( animate );

	if (planetMesh) {
        planetMesh.rotation.y += 0.01*(Math.PI/2);
		planetMesh.rotation.x += 0.01*(Math.PI/4);
    }

	cube.rotation.x += 0.001;
	cube.rotation.y += 0.001;

	renderer.render( scene, camera );
}

animate();


if ( WebGL.isWebGLAvailable() ) {

	// Initiate function or other initializations here
	animate();

} else {

	const warning = WebGL.getWebGLErrorMessage();
	document.getElementById( 'container' ).appendChild( warning );

}


function Cube() {
	return (
		<div>
			<h1>Cube Component</h1>
		</div>
	);
}

export default Cube;