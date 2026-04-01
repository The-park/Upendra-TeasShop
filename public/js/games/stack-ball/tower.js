// Stack Ball Game - Tower & Disc Generation
// Procedural generation of platforms, pole, and multiplier discs

import { C } from './constants.js';

/* ── Color palettes — one entry per level (cycles) ── */
const PALETTES = [
  { colors: ['#f1c40f', '#f39c12'], bg: 0x9b59b6, badge: '#2980b9' }, // yellow
  { colors: ['#2ecc71', '#27ae60'], bg: 0xe67e22, badge: '#e67e22' }, // green
  { colors: ['#e67e22', '#d35400'], bg: 0xf1c40f, badge: '#e67e22' }, // orange
  { colors: ['#3498db', '#8e44ad'], bg: 0x2c3e50, badge: '#e67e22' }, // blue/purple
  { colors: ['#1abc9c', '#16a085'], bg: 0x2980b9, badge: '#e67e22' }, // teal
  { colors: ['#e74c3c', '#c0392b'], bg: 0x7f8c8d, badge: '#e74c3c' }, // red
];

/* ─────────────────────────────────────────────
   Build Pole
───────────────────────────────────────────── */
export function buildPole(scene) {
  const geo = new THREE.CylinderGeometry(C.POLE_RADIUS, C.POLE_RADIUS, C.POLE_HEIGHT, 18);
  const mat = new THREE.MeshLambertMaterial({ color: 0xecf0f1 });
  const pole = new THREE.Mesh(geo, mat);
  pole.position.y = -(C.POLE_HEIGHT / 2) + 2; // anchor at top, extends deep
  pole.receiveShadow = true;
  scene.add(pole);
  return pole;
}

/* ─────────────────────────────────────────────
   Build a complete tower for the given level
───────────────────────────────────────────── */
export function buildTower(scene, levelIndex) {
  const palette = PALETTES[levelIndex % PALETTES.length];
  const discCount = C.BASE_DISC_COUNT + levelIndex * C.DISCS_PER_LEVEL;
  const discs = [];

  for (let i = 0; i < discCount; i++) {
    const isLast = (i === discCount - 1);

    // Last disc is checkered (marks end of tower)
    const disc = isLast
      ? buildCheckeredDisc(i)
      : buildColoredDisc(palette.colors, i, discCount, levelIndex);

    // Stack discs: disc 0 at top (y=0), deeper = more negative y
    disc.group.position.y = -i * (C.DISC_THICKNESS + C.DISC_GAP);
    scene.add(disc.group);
    discs.push(disc);
  }

  return { discs, palette };
}

/* ─────────────────────────────────────────────
   Single colored disc with breakable segments
───────────────────────────────────────────── */
function buildColoredDisc(colors, index, total, level) {
  const group = new THREE.Group();
  const segments = [];

  // Ramp up black segments toward the bottom of the tower
  const progress = index / total;
  const blackCount = Math.min(
    Math.floor(progress * (1 + level * 0.5)),
    C.MAX_BLACK_SEGS,
  );
  const blackSlots = randomSlots(C.DISC_SEGMENTS, blackCount);

  for (let s = 0; s < C.DISC_SEGMENTS; s++) {
    const isBlack = blackSlots.includes(s);
    const hexColor = isBlack ? '#1c1c1c' : colors[s % colors.length];

    const startAngle = (s / C.DISC_SEGMENTS) * Math.PI * 2;
    const endAngle = ((s + 1) / C.DISC_SEGMENTS) * Math.PI * 2;

    const mesh = buildArcMesh(startAngle, endAngle, hexColor);
    mesh.userData = { isBlack, alive: true, segIndex: s, color: hexColor };

    group.add(mesh);
    segments.push(mesh);
  }

  // Alternating rotation direction between discs
  group.userData = {
    segments,
    aliveCount: C.DISC_SEGMENTS,
    rotSpeed: 0.005 + Math.random() * 0.007,
    rotDir: index % 2 === 0 ? 1 : -1,
    index: index,
  };

  return { group, segments };
}

/* ─────────────────────────────────────────────
   Checkered disc — final disc of tower
───────────────────────────────────────────── */
function buildCheckeredDisc(index) {
  const colors = ['#111111', '#ffffff'];
  const group = new THREE.Group();
  const segments = [];

  for (let s = 0; s < C.DISC_SEGMENTS; s++) {
    const startAngle = (s / C.DISC_SEGMENTS) * Math.PI * 2;
    const endAngle = ((s + 1) / C.DISC_SEGMENTS) * Math.PI * 2;
    const mesh = buildArcMesh(startAngle, endAngle, colors[s % 2]);
    mesh.userData = { isBlack: false, alive: true, segIndex: s, color: colors[s % 2] };
    group.add(mesh);
    segments.push(mesh);
  }

  group.userData = {
    segments,
    aliveCount: C.DISC_SEGMENTS,
    rotSpeed: 0.003,
    rotDir: 1,
    index: index,
  };

  return { group, segments };
}

/* ─────────────────────────────────────────────
   Multiplier disc — pie wedges labeled ×2–×7
───────────────────────────────────────────── */
const MULT_COLORS = ['#e74c3c', '#e67e22', '#f1c40f', '#2ecc71', '#3498db', '#9b59b6', '#1abc9c', '#e74c3c'];
const MULT_VALUES = [2, 3, 4, 5, 6, 7, 3, 5];
const MULT_SLICES = MULT_VALUES.length;

export function buildMultiplierDisc(scene, yPosition) {
  const group = new THREE.Group();
  group.position.y = yPosition;
  const wedges = [];

  for (let s = 0; s < MULT_SLICES; s++) {
    const startAngle = (s / MULT_SLICES) * Math.PI * 2;
    const endAngle = ((s + 1) / MULT_SLICES) * Math.PI * 2;
    const mesh = buildArcMesh(startAngle, endAngle, MULT_COLORS[s], 2.3, C.DISC_INNER_R, 0.5);
    mesh.userData = { multiplier: MULT_VALUES[s], alive: true };
    group.add(mesh);
    wedges.push(mesh);
  }

  group.userData = { wedges, aliveCount: MULT_SLICES, rotSpeed: 0.008, rotDir: 1, isMultiplier: true };
  scene.add(group);
  return { group, wedges };
}

/* ─────────────────────────────────────────────
   Core helper: extruded arc segment mesh

   Three.js ExtrudeGeometry takes a 2D shape and
   pushes it along Z. We then rotate -90° on X
   so the extrusion goes along Y (vertical).
───────────────────────────────────────────── */
function buildArcMesh(
  startAngle, endAngle, hexColor,
  outerR = C.DISC_OUTER_R,
  innerR = C.DISC_INNER_R,
  thickness = C.DISC_THICKNESS,
) {
  const shape = makeArcShape(startAngle, endAngle, innerR, outerR);

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: thickness,
    bevelEnabled: false,
  });
  geo.rotateX(-Math.PI / 2); // lay flat on the XZ plane

  const mat = new THREE.MeshLambertMaterial({ color: hexColor });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

/* ── 2D arc shape (donut slice) for ExtrudeGeometry ── */
function makeArcShape(startAngle, endAngle, innerR, outerR) {
  const shape = new THREE.Shape();
  const steps = C.DISC_CURVE_STEPS;

  // Trace outer arc clockwise
  for (let i = 0; i <= steps; i++) {
    const a = startAngle + (endAngle - startAngle) * (i / steps);
    const x = Math.cos(a) * outerR;
    const y = Math.sin(a) * outerR;
    i === 0 ? shape.moveTo(x, y) : shape.lineTo(x, y);
  }
  // Trace inner arc counter-clockwise (closes the donut slice)
  for (let i = steps; i >= 0; i--) {
    const a = startAngle + (endAngle - startAngle) * (i / steps);
    shape.lineTo(Math.cos(a) * innerR, Math.sin(a) * innerR);
  }
  shape.closePath();
  return shape;
}

/* ── Pick N unique random indices from [0, total) ── */
function randomSlots(total, count) {
  const pool = Array.from({ length: total }, (_, i) => i);
  const out = [];
  while (out.length < count && pool.length > 0) {
    const i = Math.floor(Math.random() * pool.length);
    out.push(pool.splice(i, 1)[0]);
  }
  return out;
}
