import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

window.addEventListener("DOMContentLoaded", () => {
  const container: HTMLDivElement = document.querySelector("#scene-container");

  const renderer = new THREE.WebGLRenderer();

  renderer.setSize(container.clientWidth, container.clientHeight);

  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    35,
    container.clientWidth / container.clientHeight,
    0.1,
    100
  );

  camera.position.set(0, 0, 10);
  camera.lookAt(0, 0, 0);

  const BASE_X = -4;
  const BASE_Y = 2;
  const wrap = new THREE.Group();
  let w = window.innerWidth;
  let h = window.innerHeight;

  const mouse = new THREE.Vector2(-5, 3);

  let createGeometry = function () {
    const boxGeometry = new THREE.BoxBufferGeometry(0.5, 0.5, 0.5);
    const edges = new THREE.EdgesGeometry(boxGeometry);
    const material = new THREE.LineBasicMaterial({ color: 0xff55dd });

    for (let i = 0; i < 5; i += 0.5) {
      for (let j = 0; j < 8.5; j += 0.5) {
        const lineBox = new THREE.LineSegments(edges, material);
        lineBox.position.x = BASE_X + j;
        lineBox.position.y = BASE_Y - i;
        wrap.add(lineBox);
      }
    }
  };
  createGeometry();
  scene.add(wrap);

  const light = new THREE.DirectionalLight(0xffffff);
  light.position.set(1, 1, 1);
  scene.add(light);

  gsap
    .timeline({
      scrollTrigger: {
        // markers: true,（開発用）
        trigger: "#scroll",
        start: "top 50%",
        scrub: true,
        pin: true,
      },
    })
    .to(wrap.rotation, { x: 0.7 * Math.PI, duration: 2 })
    .to(camera.position, { z: 5, duration: 2 }, "<")
    .to(camera.position, { z: 10, duration: 2 });

  // const controls = new OrbitControls(camera, renderer.domElement); 開発用

  window.addEventListener("mousemove", (e) => {
    mouse.x = ((e.clientX / w) * 2 - 1) * 5;
    mouse.y = (-(e.clientY / h) * 2 + 1) * 3;
  });

  function tick() {
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
    camera.position.x = mouse.x;
    camera.position.y = mouse.y;
    camera.lookAt(0, 0, 0);
  }
  tick();
});
