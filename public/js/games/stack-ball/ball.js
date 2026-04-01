// Stack Ball Game - Ball
// Ball mesh, physics, fire mode

import { C } from './constants.js';

export function createBall(scene) {
  const geo = new THREE.SphereGeometry(C.BALL_RADIUS, 24, 24);
  const mat = new THREE.MeshLambertMaterial({ color: 0x3498db });
  const mesh = new THREE.Mesh(geo, mat);

  mesh.position.set(0, C.BALL_START_Y, 0);
  mesh.castShadow = true;
  scene.add(mesh);

  return {
    mesh,
    vy: 0,       // vertical velocity — negative = falling
    holding: false,   // player is pressing
    onFire: false,   // fire / chain-break mode active
    fireTimer: 0,
  };
}

export function stepBall(ball) {
  // Gravity every frame
  ball.vy -= C.GRAVITY;

  // Extra push while player holds
  if (ball.holding) ball.vy -= C.HOLD_ACCEL;

  // Terminal velocity
  if (ball.vy < -C.MAX_FALL_SPEED) ball.vy = -C.MAX_FALL_SPEED;

  ball.mesh.position.y += ball.vy;

  // Fire mode countdown
  if (ball.onFire) {
    ball.fireTimer--;
    if (ball.fireTimer <= 0) exitFire(ball);
  }

  // Auto-enter fire mode when falling fast
  if (!ball.onFire && Math.abs(ball.vy) >= C.FIRE_THRESHOLD) {
    enterFire(ball);
  }
}

export function bounceBall(ball) {
  ball.vy = C.BOUNCE_SPEED;
  exitFire(ball);
}

function enterFire(ball) {
  ball.onFire = true;
  ball.fireTimer = C.FIRE_DURATION;
  ball.mesh.material.color.set(0xe67e22);  // orange
}

function exitFire(ball) {
  ball.onFire = false;
  ball.mesh.material.color.set(0x3498db);  // back to blue
}
