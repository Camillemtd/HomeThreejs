import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// Textures

const loadingManager = new THREE.LoadingManager();

loadingManager.onStart = () => {
  console.log("onStart");
};
loadingManager.onLoad = () => {
  console.log("onLoad");
};
loadingManager.onProgress = () => {
  console.log("onProgess");
};
loadingManager.onError = () => {
  console.log("onError");
};

const textureLoader = new THREE.TextureLoader(loadingManager);
// Texture wall1
const basecolorWall = textureLoader.load(
  "/wall/Bricks_Terracotta_003_basecolor.jpg"
);
const normalWall = textureLoader.load("/wall/Bricks_Terracotta_003_normal.jpg");
const roughnessWall = textureLoader.load(
  "/wall/Bricks_Terracotta_003_roughness.jpg"
);

// Texture map
const basecolorFloor = textureLoader.load("/floor/Wood_Floor_012_basecolor.jpg");

// Texture Wall2
const matcapWall2 = textureLoader.load("matcap/mapcapWall2.jpeg");

// Texture Desk
const matcapOctahedron = textureLoader.load("matcap/3.png");
const matcapDeskplate = textureLoader.load("/matcap/matcapDesk.jpeg");

// Texture Carpet
const carpetMatcap = textureLoader.load('/matcap/matcapCarpet.jpeg')

// Texture Library
const libraryMatcap = textureLoader.load('/matcap/matcapLibrary.jpeg')


/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Lights 

const ambientLight = new THREE.AmbientLight(0xffffff, 2)
scene.add(ambientLight)

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Objects

// Floor
const mapGeometry = new THREE.BoxGeometry(1.1, 0.1, 1.1);
const mapMaterial = new THREE.MeshBasicMaterial({ map: basecolorFloor});
const mapMesh = new THREE.Mesh(mapGeometry, mapMaterial);
mapMesh.position.y = -0.3;
mapMesh.position.x = -0.05;
mapMesh.position.z = -0.05;

// Wall1
const wallGeometry = new THREE.BoxGeometry(1, 0.1, 1);
const wall1Material = new THREE.MeshMatcapMaterial({ map: basecolorWall });
wall1Material.roughnessMap = roughnessWall;
wall1Material.normalMap = normalWall;

const wall1Mesh = new THREE.Mesh(wallGeometry, wall1Material);
wall1Mesh.rotation.z = Math.PI * 0.5;

wall1Mesh.rotation.x = Math.PI * 0.5;
wall1Mesh.position.x = -0.55;
wall1Mesh.position.y = 0.25;

// Wall2
const wall2Material = new THREE.MeshMatcapMaterial({ matcap: matcapWall2 });
const wall2Mesh = new THREE.Mesh(wallGeometry, wall2Material);
wall2Mesh.rotation.z = Math.PI * 0.5;
wall2Mesh.rotation.y = Math.PI * 0.5;

wall2Mesh.position.y = 0.25;
wall2Mesh.position.z = -0.55;

//Desk
const deskplateGeometry = new THREE.BoxGeometry(0.3, 0.01, 0.5);

const deskplateMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapDeskplate });
const deskplateMesh = new THREE.Mesh(deskplateGeometry, deskplateMaterial);
deskplateMesh.position.x = -0.4;
const deskfeetGeometry = new THREE.CylinderGeometry(0.01, 0.01, 0.3, 20);
const deskfeetMaterial = new THREE.MeshBasicMaterial({ color: "white" });

const deskfeet1Mesh = new THREE.Mesh(deskfeetGeometry, deskfeetMaterial);
deskfeet1Mesh.position.set(-0.465, -0.15, 0.2);

const deskfeet2Mesh = new THREE.Mesh(deskfeetGeometry, deskfeetMaterial);
deskfeet2Mesh.position.set(-0.465, -0.15, -0.2);

const deskfeet3Mesh = new THREE.Mesh(deskfeetGeometry, deskfeetMaterial);
deskfeet3Mesh.position.set(-0.29, -0.15, -0.2);

const deskfeet4Mesh = new THREE.Mesh(deskfeetGeometry, deskfeetMaterial);
deskfeet4Mesh.position.set(-0.29, -0.15, 0.2);

const coneGeometry = new THREE.ConeGeometry(0.04, 0.08, 10);
const coneMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapOctahedron });
const coneMesh = new THREE.Mesh(coneGeometry, coneMaterial);
coneMesh.position.set(-0.42, 0.05, -0.18);

const octahedronGeometry = new THREE.OctahedronGeometry(0.03, 0);
const octahedronMaterial = new THREE.MeshMatcapMaterial({
  matcap: matcapOctahedron,
});
const octahedronMesh = new THREE.Mesh(octahedronGeometry, octahedronMaterial);
octahedronMesh.position.set(-0.42, 0.14, -0.18);

// Carpet
const carpetGeometry = new THREE.CircleGeometry(0.3, 32);
const carpetMaterial = new THREE.MeshMatcapMaterial({ matcap: carpetMatcap});

const carpetMesh = new THREE.Mesh(carpetGeometry, carpetMaterial);
carpetMesh.rotation.x = Math.PI * - 0.5
carpetMesh.position.set(0.1, -0.24, 0.1)

// Library

const library1Group = new THREE.Group();

const libraryGeometry = new THREE.BoxGeometry(0.02, 0.17, 0.17)
const libraryMaterial = new THREE.MeshMatcapMaterial({ matcap: libraryMatcap})
const library1LeftMesh = new THREE.Mesh(libraryGeometry, libraryMaterial)
library1LeftMesh.position.z = - 0.42
library1LeftMesh.position.y =  0.5
library1LeftMesh.position.set(0.01, 0.5, - 0.42)

const library1TopMesh = new THREE.Mesh(libraryGeometry, libraryMaterial)
library1TopMesh.position.set(0.1, 0.575, -0.42)
library1TopMesh.rotation.z = Math.PI * 0.5

const library1BottomMesh = new THREE.Mesh(libraryGeometry, libraryMaterial)
library1BottomMesh.position.set(0.1, 0.425, -0.42)
library1BottomMesh.rotation.z = Math.PI * 0.5

const library1RightMesh = new THREE.Mesh(libraryGeometry, libraryMaterial)
library1RightMesh.position.set(0.19, 0.5, - 0.42)

library1Group.add(library1LeftMesh);
library1Group.add(library1TopMesh);
library1Group.add(library1BottomMesh);
library1Group.add(library1RightMesh);

const library2Group = new THREE.Group();


const library2LeftMesh = new THREE.Mesh(libraryGeometry, libraryMaterial)
library2LeftMesh.position.z = - 0.42
library2LeftMesh.position.y =  0.5
library2LeftMesh.position.set(0.01, 0.5, - 0.42)

const library2TopMesh = new THREE.Mesh(libraryGeometry, libraryMaterial)
library2TopMesh.position.set(0.1, 0.575, -0.42)
library2TopMesh.rotation.z = Math.PI * 0.5

const library2BottomMesh = new THREE.Mesh(libraryGeometry, libraryMaterial)
library2BottomMesh.position.set(0.1, 0.425, -0.42)
library2BottomMesh.rotation.z = Math.PI * 0.5

const library2RightMesh = new THREE.Mesh(libraryGeometry, libraryMaterial)
library2RightMesh.position.set(0.19, 0.5, - 0.42)

library2Group.add(library2LeftMesh);
library2Group.add(library2TopMesh);
library2Group.add(library2BottomMesh);
library2Group.add(library2RightMesh);

library2Group.position.set(- 0.3, - 0.3, 0)

const library3Group = new THREE.Group();


const library3LeftMesh = new THREE.Mesh(libraryGeometry, libraryMaterial)
library3LeftMesh.position.z = - 0.42
library3LeftMesh.position.y =  0.5
library3LeftMesh.position.set(0.01, 0.5, - 0.42)

const library3TopMesh = new THREE.Mesh(libraryGeometry, libraryMaterial)
library3TopMesh.position.set(0.1, 0.575, -0.42)
library3TopMesh.rotation.z = Math.PI * 0.5

const library3BottomMesh = new THREE.Mesh(libraryGeometry, libraryMaterial)
library3BottomMesh.position.set(0.1, 0.425, -0.42)
library3BottomMesh.rotation.z = Math.PI * 0.5

const library3RightMesh = new THREE.Mesh(libraryGeometry, libraryMaterial)
library3RightMesh.position.set(0.19, 0.5, - 0.42)

library3Group.add(library3LeftMesh);
library3Group.add(library3TopMesh);
library3Group.add(library3BottomMesh);
library3Group.add(library3RightMesh);

library3Group.position.set(0.2, - 0.35, 0)

scene.add(
  mapMesh,
  wall1Mesh,
  wall2Mesh,
  deskplateMesh,
  deskfeet1Mesh,
  deskfeet2Mesh,
  deskfeet3Mesh,
  deskfeet4Mesh,
  coneMesh,
  octahedronMesh,
  carpetMesh,
  library1Group,
  library2Group,
  library3Group,
);

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 1;
camera.position.y = 0.5;
camera.position.z = 1;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  //Animation
  octahedronMesh.rotation.x = Math.cos(elapsedTime);
  octahedronMesh.rotation.y = Math.cos(elapsedTime);
  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
