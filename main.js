import * as THREE from "three";
import { TransformControls } from "three/examples/jsm/controls/TransformControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

// Наш Javascript будет здесь..
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5); // направленное освещение
directionalLight.position.set(0, 1, 0); // устанавливаем положение света
scene.add(directionalLight);

// Instantiate a loader
const loader = new GLTFLoader();

// Load a glTF resource
loader.load(
	// resource URL
	"/scene.gltf",
	// called when the resource is loaded
	function (gltf) {
		//scene.add(gltf.scene);
		const control = new TransformControls(camera, renderer.domElement);

		const handleClickAdd = () => {
			// scene.add(cube);
			scene.add(gltf.scene)

			console.log("added");
		};

		const handleClickRemove = () => {
			// scene.remove(cube)
			scene.remove(gltf.scene)
		};

		const handleClickAttach = () => {
			// control.attach(cube)
			control.attach(gltf.scene)
		};

		const handleClickDetach = () => {
			// control.detach(cube)
			control.detach(gltf.scene)
		};

		const handleClickTranslate = () => {
			control.setMode("translate")
		};

		const handleClickRotate = () => {
			control.setMode("rotate")
		};

		const handleClickScale = () => {
			control.setMode("scale")
		};

		const addBtn = document.getElementById("addBtn");
		addBtn.addEventListener("click", handleClickAdd);

		const removeBtn = document.getElementById("removeBtn");
		removeBtn.addEventListener("click", handleClickRemove);

		const attachBtn = document.getElementById("attachBtn");
		attachBtn.addEventListener("click", handleClickAttach);

		const detachBtn = document.getElementById("detachBtn");
		detachBtn.addEventListener("click", handleClickDetach);

		const translateBtn = document.getElementById("translateBtn");
		translateBtn.addEventListener("click", handleClickTranslate);

		const rotateBtn = document.getElementById("rotateBtn");
		rotateBtn.addEventListener("click", handleClickRotate);

		const scaleBtn = document.getElementById("scaleBtn");
		scaleBtn.addEventListener("click", handleClickScale);

		scene.add(control);
	},
	// called while loading is progressing
	function (xhr) {
		console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
	},
	// called when loading has errors
	function (error) {
		console.log("An error happened");
	}
);

// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// const cube = new THREE.Mesh(geometry, material);

camera.position.z = 15;

function animate() {
	requestAnimationFrame(animate);

	// cube.rotation.x += 0.01;
	// cube.rotation.y += 0.01;

	renderer.render(scene, camera);
}
animate();
