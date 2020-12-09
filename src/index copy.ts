import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

window.addEventListener("DOMContentLoaded", () => {
  const container: any = document.querySelector("#scene-container");
  // レンダラーを作成
  const renderer = new THREE.WebGLRenderer();
  // レンダラーのサイズを設定
  renderer.setSize(container.clientWidth, container.clientHeight);
  // canvasをbodyに追加
  container.appendChild(renderer.domElement);

  // シーンを作成
  const scene = new THREE.Scene();

  // カメラを作成
  const camera = new THREE.PerspectiveCamera(
    35,
    container.clientWidth / container.clientHeight,
    0.1,
    100
  );
  camera.position.set(0, 0, 15);
  const BASE_X = -5;
  const BASE_Y = 3.5;
  const wrap = new THREE.Group();
  let w = window.innerWidth;
  let h = window.innerHeight;

  // let createGeometry = function () {
  const boxGeometry = new THREE.BoxBufferGeometry(0.5, 0.5, 0.5);
  const edges = new THREE.EdgesGeometry(boxGeometry);
  const material = new THREE.LineBasicMaterial({ color: 0xff55dd });

  // for (let i = 0; i < 7; i += 0.5) {
  //   for (let j = 0; j < 10; j += 0.5) {
  const lineBox = new THREE.LineSegments(edges, material);
  // lineBox.position.x = BASE_X + j;
  // lineBox.position.y = BASE_Y - i;
  // wrap.add(lineBox);
  // }
  // }
  // };
  // createGeometry();
  // wrap.rotation.x = 2;
  // console.log("wrap.position.x: ", wrap.position.x);
  // scene.add(wrap);
  scene.add(lineBox);
  // wrap.position.x = 0;
  // const boxGeometry = new THREE.BoxBufferGeometry(0.5, 0.5, 0.5);
  // const edges = new THREE.EdgesGeometry(boxGeometry);
  // for (let i = -3.5; i < 0; i += 0.5) {
  //   for (let j = 0; j < 5; j += 0.5) {
  //     const lineBox = new THREE.LineSegments(
  //       edges,
  //       new THREE.LineBasicMaterial({ color: 0xff55dd })
  //     );
  //     lineBox.position.set(j, 0, 0);
  //     scene.add(lineBox);
  //   }
  //   const lineBox = new THREE.LineSegments(
  //     edges,
  //     new THREE.LineBasicMaterial({ color: 0xff55dd })
  //   );
  //   lineBox.position.set(0, -i, 0);
  //   scene.add(lineBox);
  // }
  // var lineBox = new THREE.LineSegments(
  //   edges,
  //   new THREE.LineBasicMaterial({ color: 0xff55dd })
  // );
  // lineBox.position.set(-5, 3, 0);
  // // // lineBox.rotation.y = 10;
  // scene.add(lineBox);
  // var lineBox2 = new THREE.LineSegments(
  //   edges,
  //   new THREE.LineBasicMaterial({ color: 0xff55dd })
  // );
  // lineBox2.position.set(-4.5, 2, 0);
  // scene.add(lineBox2);

  // const geometry = new THREE.BoxGeometry(1, 1, 1);
  // const material = new THREE.MeshPhongMaterial({ color: 0xff0000 });
  // const box = new THREE.Mesh(geometry, material);

  // scene.add(box);
  // const box2 = new THREE.Mesh(geometry, material);
  // box.position.x = 1;
  // scene.add(box2);

  // 平行光源を生成
  const light = new THREE.DirectionalLight(0xffffff);
  light.position.set(1, 1, 1);
  scene.add(light);

  // const controls = new OrbitControls(camera, renderer.domElement);
  // console.log(controls.object.position.x);
  // controls.object.position.set(-1, 0, 15);

  const mouse = new THREE.Vector2(0, 0);
  const mouseMoved = (x, y) => {
    let mouseX = x - w / 2; // 原点を中心に持ってくる
    let mouseY = -y + h / 2; // 軸を反転して原点を中心に持ってくる
  };

  let mouseX;
  let mouseY;

  window.addEventListener("mousemove", (e) => {
    // mouseMoved(e.clientX, e.clientY);
    mouseX = ((e.clientX / window.innerWidth) * 2 - 1) * 10;
    // mouseY = -((e.clientY / window.innerHeight) * 2 + 1) * 10;
    mouseY = (-(e.clientY / window.innerHeight) * 2 + 1) * 10;
    // mouseX = mouseX * 10;
    console.log(mouseX * 2);
    // console.log(mouseY * 2);
  });

  function tick() {
    // レンダリング
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
    camera.position.x = mouseX;
    // console.log(camera.position.x);
    camera.position.y = mouseY;
    // console.log(camera.position.y);

    camera.lookAt(0, 0, 0);
  }
  tick();
});
