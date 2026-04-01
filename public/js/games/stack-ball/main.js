// Stack Ball Game - Main
// Entry point, game loop, state machine

import { C } from './constants.js';
import { initScene } from './scene.js';
import { buildPole, buildTower, buildMultiplierDisc } from './tower.js';
import { createBall, stepBall } from './ball.js';
import { checkCollisions } from './collision.js';
import { ParticleSystem } from './particles.js';
import { updateCamera, triggerShake, applyShake } from './camera.js';
import { setScore, setProgress, setLevel, setTheme, showStart, showGameOver, hideAll, flashMultiplier } from './ui.js';

/* ── Init ── */
const canvas = document.getElementById('orderMiniGame');
if (!canvas) {
  console.error('Stack Ball: Canvas element #orderMiniGame not found');
  throw new Error('Canvas not found');
}

const { renderer, scene, cam } = initScene(canvas);
const particles = new ParticleSystem(scene);

/* ── Game state ── */
let state = 'idle';
let score = 0;
let level = 1;
let multiplier = 1;
let ball, discs, palette, multDisc;
let totalSegs, brokenSegs;

/* ─────────────────────────────────────────
   Build / rebuild level
───────────────────────────────────────── */
function buildLevel() {
  // Remove all existing meshes/groups from scene (except lights)
  const toRemove = [];
  scene.children.forEach(o => {
    if (o.type !== 'AmbientLight' && o.type !== 'DirectionalLight') {
      toRemove.push(o);
    }
  });
  toRemove.forEach(o => scene.remove(o));

  particles.clear();

  buildPole(scene);

  const result = buildTower(scene, level - 1);
  discs = result.discs;
  palette = result.palette;

  // Multiplier disc every 5th level — placed halfway down
  const halfY = -(discs.length / 2) * (C.DISC_THICKNESS + C.DISC_GAP);
  multDisc = (level % 5 === 0) ? buildMultiplierDisc(scene, halfY) : null;

  // Update scene colors
  scene.background.set(palette.bg);
  scene.fog.color.set(palette.bg);
  setTheme(palette.badge);
  setLevel(level);

  totalSegs = discs.reduce((a, d) => a + d.segments.length, 0);
  brokenSegs = 0;

  ball = createBall(scene);

  // Setup input for this ball instance
  setupInput(ball);
}

/* ─────────────────────────────────────────
   Input
───────────────────────────────────────── */
function setupInput(ball) {
  const press = () => {
    ball.holding = true;
    // Handle tap events for state transitions
    if (state === 'idle') {
      state = 'playing';
      hideAll();
    }
    if (state === 'dead') {
      state = 'playing';
      score = 0;
      level = 1;
      multiplier = 1;
      setScore(score);
      buildLevel();
      hideAll();
    }
  };

  const release = () => {
    ball.holding = false;
  };

  // Remove old listeners if they exist
  window.removeEventListener('mousedown', press);
  window.removeEventListener('mouseup', release);
  window.removeEventListener('touchstart', press);
  window.removeEventListener('touchend', release);

  // Add new listeners
  window.addEventListener('mousedown', press);
  window.addEventListener('mouseup', release);
  window.addEventListener('touchstart', press, { passive: true });
  window.addEventListener('touchend', release, { passive: true });
}

/* ─────────────────────────────────────────
   Collision result handler
───────────────────────────────────────── */
function handleCollisions() {
  const result = checkCollisions(
    ball, discs, multDisc,
    // onBreak callback
    (color, worldPos) => {
      brokenSegs++;
      score += C.SCORE_SEGMENT * multiplier;
      setScore(score);
      setProgress((brokenSegs / totalSegs) * 100);
      particles.spawn(worldPos, color);
    },
    // onDie callback
    () => {
      state = 'dead';
      triggerShake(14, 0.15);
      setTimeout(() => showGameOver(score), 700);
    },
  );

  if (result.type === 'disc-cleared') {
    score += C.SCORE_DISC_BONUS * multiplier;
    setScore(score);
  }

  if (result.type === 'multiplier') {
    multiplier = result.value;
    flashMultiplier(multiplier);
    // Multiplier expires after 4 seconds
    setTimeout(() => { multiplier = 1; }, 4000);
  }
}

/* ─────────────────────────────────────────
   Check if tower is fully cleared
───────────────────────────────────────── */
function checkLevelClear() {
  if (state !== 'playing') return;
  const allGone = discs.every(d => d.group.userData.aliveCount <= 0);
  if (!allGone) return;

  state = 'clearing';
  score += C.SCORE_LEVEL_BONUS;
  setScore(score);

  setTimeout(() => {
    level++;
    multiplier = 1;
    buildLevel();
    state = 'playing';
  }, 1200);
}

/* ─────────────────────────────────────────
   Rotate all disc groups every frame
───────────────────────────────────────── */
function rotateTower() {
  for (const disc of discs) {
    const d = disc.group.userData;
    disc.group.rotation.y += d.rotSpeed * d.rotDir;
  }
  if (multDisc) {
    multDisc.group.rotation.y += multDisc.group.userData.rotSpeed;
  }
}

/* ─────────────────────────────────────────
   Main loop — runs every frame via rAF
───────────────────────────────────────── */
function loop() {
  requestAnimationFrame(loop);

  if (state === 'playing') {
    rotateTower();
    stepBall(ball);
    handleCollisions();
    checkLevelClear();
  }

  if (state !== 'idle') {
    updateCamera(cam, ball);
    applyShake(cam);
  }

  particles.update();
  renderer.render(scene, cam);
}

/* ─────────────────────────────────────────
   Bootstrap
───────────────────────────────────────── */
buildLevel();
showStart();
loop();
