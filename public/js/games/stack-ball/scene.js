// Stack Ball Game - Scene Setup
// Three.js renderer, scene, camera, lights

export function initScene(canvas) {
  // Renderer — WebGL via Three.js
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // cap at 2× for perf
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  // Scene
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x8e44ad); // overridden per level
  scene.fog = new THREE.FogExp2(0x8e44ad, 0.018); // hides geometry pop-in

  // Camera — angled slightly down, behind the ball
  const cam = new THREE.PerspectiveCamera(
    58,
    window.innerWidth / window.innerHeight,
    0.1,
    250,
  );
  cam.position.set(0, 10, 12);
  cam.lookAt(0, 0, 0);

  // Ambient light — fills in shadow areas
  scene.add(new THREE.AmbientLight(0xffffff, 0.55));

  // Main sun — casts shadows from discs
  const sun = new THREE.DirectionalLight(0xffffff, 1.1);
  sun.position.set(6, 20, 10);
  sun.castShadow = true;
  sun.shadow.mapSize.set(1024, 1024);
  sun.shadow.camera.near = 0.5;
  sun.shadow.camera.far = 120;
  sun.shadow.camera.left = sun.shadow.camera.bottom = -20;
  sun.shadow.camera.right = sun.shadow.camera.top = 20;
  scene.add(sun);

  // Soft fill from below — simulates sky bounce light
  const fill = new THREE.DirectionalLight(0xffd0a0, 0.3);
  fill.position.set(-4, -10, -5);
  scene.add(fill);

  // Resize handler
  window.addEventListener('resize', () => {
    cam.aspect = window.innerWidth / window.innerHeight;
    cam.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  return { renderer, scene, cam };
}
