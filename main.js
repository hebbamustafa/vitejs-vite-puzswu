import * as THREE from "three";
import "./style.css"
import {orbitControls} from "three/examples/jsm/controls/OrbitControls";

// scene
const scene = new THREE.Scene();

// sphere
const geometry = new THREE.SphereGeometry(3, 64, 64);
const material = new THREE.MeshStandardMaterial({
  color: "#00ff83",
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
};

// light
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(0, 10, 10);
scene.add(light);

// camera
const camera = new THREE.PerspectiveCamera(
    45,
    sizes.width/ sizes.height,
    0.1,
    100
);
camera.position.z = 20;
scene.add(camera);

// renderer
const canvas = document.querySelector(".webgl");
const render = new THREE.WebGLRenderer({ canvas });
render.setSize(sizes.width/ sizes.height);
render.render(scene, camera);

// controls
const controls = new orbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoon = false;
controls.autoRotate = true;
controls.autoRotateSpeed = true;

// resize
window.addEventListener("resize", () => {

  // update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // update camera
  camera.updateProjectionMatrix()
  camera.aspect = sizes.width / sizes.height;
  renderer.setSize(sizes.width / sizes.height);
});

const loop = ()=> {
  controls.update()
  mesh.position.y += 0.0;
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop);
}
loop();