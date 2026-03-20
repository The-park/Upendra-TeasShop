// Stack Ball Game - Camera
// Smooth follow + shake effects

import { C } from './constants.js';

let shakeFrames = 0;
let shakeAmount = 0;

/* Smooth follow — lerps camera Y toward ball Y */
export function updateCamera(cam, ball) {
  const targetY = ball.mesh.position.y + C.CAM_OFFSET_Y;
  cam.position.y += (targetY - cam.position.y) * C.CAM_LERP;
  cam.position.x = 0;
  cam.position.z = C.CAM_OFFSET_Z;
  cam.lookAt(0, ball.mesh.position.y, 0);
}

/* Trigger a screen shake (call once on game over or big bounce) */
export function triggerShake(frames = 14, amount = 0.15) {
  shakeFrames = frames;
  shakeAmount = amount;
}

/* Apply per-frame jitter (call every frame) */
export function applyShake(cam) {
  if (shakeFrames <= 0) return;
  cam.position.x += (Math.random() - 0.5) * shakeAmount;
  cam.position.z += (Math.random() - 0.5) * shakeAmount;
  shakeFrames--;
}
