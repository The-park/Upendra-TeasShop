import * as THREE from 'three';
import Slab from './Slab.js';

const SLAB_SPACING = 0.62;

export function getLevelConfig(levelNumber) {
  const level = Math.max(1, Math.min(levelNumber, 10));
  const softRunCount = level <= 5 ? 2 : 1;
  const softRunMax = level <= 3 ? 4 : 3;

  return {
    slabCount: 12 + level * 2,
    rotationSpeed: 0.5 + level * 0.06,
    spotsPerSide: 4,
    softRunCount,
    softRunMin: 2,
    softRunMax,
    poleRadius: 0.22,
    poleGap: 0.44,
  };
}

export default class Tower {
  constructor(scene, world, physics) {
    this.scene = scene;
    this.world = world;
    this.physics = physics;
    this.towerGroup = new THREE.Group();
    scene.add(this.towerGroup);
    this.slabs = [];
    this.slabsBroken = 0;
    this.totalSlabs = 0;
    this.autoRotationSpeed = 0;
    this.particleSystem = null; // set by GameManager after creation
  }

  buildLevel(config) {
    // Dispose old slabs
    for (const s of this.slabs) s.dispose();
    this.slabs = [];
    this.slabsBroken = 0;
    this.totalSlabs = config.slabCount;
    this.autoRotationSpeed = (Math.random() > 0.5 ? 1 : -1) * (config.rotationSpeed ?? 0.5) * 0.2;

    for (let i = 0; i < config.slabCount; i++) {
      const yPos = -(i * SLAB_SPACING);  // stack downward from Y=0

      const slab = new Slab(
        this.scene,
        this.world,
        this.physics,
        yPos,
        i,
        config,
        this.towerGroup
      );
      this.slabs.push(slab);
    }
  }

  update(dt, inputRotationDelta) {
    // Rotate the whole tower: player drag + gentle continuous spin.
    this.towerGroup.rotation.y += inputRotationDelta + this.autoRotationSpeed * dt;

    // Sync ALL slab physics bodies to match rotated mesh positions
    for (const slab of this.slabs) {
      slab.syncBodiesToTower();
      // Animate any flying debris
      slab.animateDebris(dt);
    }
  }

  // Called by GameManager when ball hits a soft body
  onSoftHit(slabUserData) {
    const slab = slabUserData.slab;
    if (!slab || slab.isBroken) return false;
    slab.breakWholeSlab(this.particleSystem);
    this.slabsBroken++;
    return true; // signal score increase
  }

  allDone() {
    return this.slabsBroken >= this.totalSlabs;
  }

  dispose() {
    for (const s of this.slabs) s.dispose();
    this.slabs = [];
    this.scene.remove(this.towerGroup);
  }
}