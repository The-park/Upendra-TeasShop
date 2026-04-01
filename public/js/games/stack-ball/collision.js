// Stack Ball Game - Collision Detection
// Y-axis overlap + angle-based segment detection

import { C } from './constants.js';
import { bounceBall } from './ball.js';

/**
 * Returns: { type: 'none'|'broke'|'disc-cleared'|'died'|'multiplier', ... }
 */
export function checkCollisions(ball, discs, multiplierDisc, onBreak, onDie) {
  const ballY = ball.mesh.position.y;
  const ballTop = ballY + C.BALL_RADIUS;
  const ballBot = ballY - C.BALL_RADIUS;

  // Check multiplier disc first
  if (multiplierDisc) {
    const mY = multiplierDisc.group.position.y;
    if (ballBot < mY + 0.5 && ballTop > mY) {
      const wedge = getSegmentUnderBall(multiplierDisc.group, multiplierDisc.wedges, 8);
      if (wedge && wedge.userData.alive) {
        wedge.userData.alive = false;
        return { type: 'multiplier', value: wedge.userData.multiplier };
      }
    }
  }

  // Check regular discs
  for (const disc of discs) {
    if (disc.group.userData.aliveCount <= 0) continue;

    const discY = disc.group.position.y;
    const discTop = discY + C.DISC_THICKNESS;
    const discBot = discY;

    // No Y overlap — skip
    if (ballBot > discTop || ballTop < discBot) continue;

    // Find which segment is under the ball
    const seg = getSegmentUnderBall(disc.group, disc.segments, C.DISC_SEGMENTS);
    if (!seg || !seg.userData.alive) continue;

    if (seg.userData.isBlack && !ball.onFire) {
      // Hit deadly segment without fire mode
      bounceBall(ball);
      onDie();
      return { type: 'died' };
    }

    // Break the segment
    seg.userData.alive = false;
    disc.group.remove(seg);

    const worldPos = new THREE.Vector3();
    seg.getWorldPosition(worldPos);

    seg.geometry.dispose();   // free GPU memory immediately
    seg.material.dispose();
    disc.group.userData.aliveCount--;

    onBreak(seg.userData.color, worldPos);

    if (disc.group.userData.aliveCount <= 0) {
      return { type: 'disc-cleared' };
    }

    return { type: 'broke' };
  }

  return { type: 'none' };
}

/**
 * Determine which segment index is currently under the ball.
 *
 * Since the ball is always at the pole center (x=0, z=0),
 * its angle relative to the disc is just the inverse of the disc's
 * world rotation — no raycasting needed.
 */
function getSegmentUnderBall(group, segments, segCount) {
  // Accumulated Y rotation of the disc group
  const discRot = group.rotation.y;

  // Ball is at angle 0 in world space.
  // In disc-local space, ball is at angle -discRot.
  let localAngle = (-discRot % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);

  const idx = Math.floor((localAngle / (Math.PI * 2)) * segCount) % segCount;

  return segments[idx] ?? null;
}
