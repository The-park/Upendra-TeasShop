// Stack Ball Game - Particle System
// Break debris particle system with lifecycle management

import { C } from './constants.js';

export class ParticleSystem {
  constructor(scene) {
    this.scene = scene;
    this.particles = [];
  }

  /* Spawn debris chunks at worldPos in the given color */
  spawn(worldPos, hexColor) {
    for (let i = 0; i < C.PARTICLE_COUNT; i++) {
      const geo = new THREE.BoxGeometry(0.14, 0.14, 0.14);
      const mat = new THREE.MeshLambertMaterial({
        color: hexColor,
        transparent: true,
      });
      const mesh = new THREE.Mesh(geo, mat);

      // Scatter spawn position slightly
      mesh.position.set(
        worldPos.x + (Math.random() - 0.5) * 0.8,
        worldPos.y,
        worldPos.z + (Math.random() - 0.5) * 0.8,
      );

      const spd = C.PARTICLE_SPEED;
      mesh.userData = {
        vx: (Math.random() - 0.5) * spd * 2,
        vy: Math.random() * spd + 0.06,     // initial upward burst
        vz: (Math.random() - 0.5) * spd * 2,
        life: C.PARTICLE_LIFE,
        maxLife: C.PARTICLE_LIFE,
      };

      this.scene.add(mesh);
      this.particles.push(mesh);
    }
  }

  /* Call once per frame */
  update() {
    const dead = [];

    for (const p of this.particles) {
      const d = p.userData;
      d.life--;

      if (d.life <= 0) {
        this.scene.remove(p);
        p.geometry.dispose();
        p.material.dispose();
        dead.push(p);
        continue;
      }

      p.position.x += d.vx;
      p.position.y += d.vy;
      p.position.z += d.vz;
      d.vy -= 0.012;   // gravity on particle
      p.rotation.x += 0.10;
      p.rotation.z += 0.08;

      // Fade out over lifetime
      p.material.opacity = d.life / d.maxLife;
    }

    this.particles = this.particles.filter(p => !dead.includes(p));
  }

  /* Remove all particles (on level reset) */
  clear() {
    for (const p of this.particles) {
      this.scene.remove(p);
      p.geometry.dispose();
      p.material.dispose();
    }
    this.particles = [];
  }
}
