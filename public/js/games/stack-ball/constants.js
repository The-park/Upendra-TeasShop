// Stack Ball Game - Constants
// All tunable numbers centralized for easy balancing

export const C = {
  // Pole
  POLE_RADIUS: 0.22,
  POLE_HEIGHT: 300,

  // Disc geometry
  DISC_INNER_R: 0.40,   // must be larger than POLE_RADIUS
  DISC_OUTER_R: 2.60,
  DISC_THICKNESS: 0.34,
  DISC_GAP: 0.06,       // vertical space between stacked discs
  DISC_SEGMENTS: 12,    // number of arc slices per disc ring
  DISC_CURVE_STEPS: 14, // smoothness of arc edges

  // Ball
  BALL_RADIUS: 0.30,
  BALL_START_Y: 2.0,    // spawns above the top disc

  // Physics (all per-frame values at 60fps)
  GRAVITY: 0.018,       // added to downward velocity every frame
  HOLD_ACCEL: 0.028,    // extra acceleration while player is holding
  MAX_FALL_SPEED: 0.90, // terminal velocity cap
  BOUNCE_SPEED: 0.18,   // upward kick on bouncing off black segment
  FIRE_THRESHOLD: 0.42, // speed at which fire mode activates
  FIRE_DURATION: 45,    // frames of fire mode (~0.75s at 60fps)

  // Scoring
  SCORE_SEGMENT: 10,      // points per broken segment
  SCORE_DISC_BONUS: 50,   // bonus when all segments of a disc break
  SCORE_LEVEL_BONUS: 200, // bonus on level clear

  // Camera
  CAM_OFFSET_Y: 10,  // units above the ball
  CAM_OFFSET_Z: 12,  // units behind the ball
  CAM_LERP: 0.08,    // 0 = instant snap, 1 = no movement

  // Particles
  PARTICLE_COUNT: 10,   // spawned per segment break
  PARTICLE_LIFE: 45,    // frames before particle despawns
  PARTICLE_SPEED: 0.22,

  // Level progression
  BASE_DISC_COUNT: 14,  // discs in level 1
  DISCS_PER_LEVEL: 2,   // extra discs added per level
  MAX_BLACK_SEGS: 3,    // hard cap on deadly segments per disc
};
