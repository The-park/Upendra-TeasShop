import * as THREE from 'three';

const MAX_PARTICLES = 1500;

class ParticleSystem {
	constructor(scene) {
		this.scene = scene;
		this.positions = new Float32Array(MAX_PARTICLES * 3);
		this.colors = new Float32Array(MAX_PARTICLES * 3);
		this.velocities = new Float32Array(MAX_PARTICLES * 3);
		this.life = new Float32Array(MAX_PARTICLES);
		this.active = new Uint8Array(MAX_PARTICLES);

		this.geometry = new THREE.BufferGeometry();
		this.positionAttr = new THREE.BufferAttribute(this.positions, 3);
		this.colorAttr = new THREE.BufferAttribute(this.colors, 3);
		this.geometry.setAttribute('position', this.positionAttr);
		this.geometry.setAttribute('color', this.colorAttr);
		this.geometry.setDrawRange(0, MAX_PARTICLES);

		this.material = new THREE.PointsMaterial({
			size: 0.12,
			vertexColors: true,
			transparent: true,
			opacity: 0.95,
			depthWrite: false,
			blending: THREE.AdditiveBlending
		});

		this.points = new THREE.Points(this.geometry, this.material);
		this.scene.add(this.points);
	}

	_findFreeIndex() {
		for (let i = 0; i < MAX_PARTICLES; i += 1) {
			if (!this.active[i]) {
				return i;
			}
		}
		return -1;
	}

	burst(position, color, count = 20, explosive = false) {
		const c = new THREE.Color(color);
		const spread = explosive ? 1.9 : 0.85;
		const speedBase = explosive ? 8.0 : 3.6;
		const upwardBoost = explosive ? 4.5 : 2.2;

		for (let i = 0; i < count; i += 1) {
			const idx = this._findFreeIndex();
			if (idx === -1) {
				break;
			}

			this.active[idx] = 1;
			this.life[idx] = explosive ? 0.9 + Math.random() * 0.35 : 0.45 + Math.random() * 0.3;

			const base = idx * 3;
			this.positions[base] = position.x + (Math.random() - 0.5) * 0.18;
			this.positions[base + 1] = position.y + 0.05;
			this.positions[base + 2] = position.z + (Math.random() - 0.5) * 0.18;

			const theta = Math.random() * Math.PI * 2;
			const phi = Math.acos(2 * Math.random() - 1);
			const vx = Math.sin(phi) * Math.cos(theta);
			const vy = Math.abs(Math.cos(phi));
			const vz = Math.sin(phi) * Math.sin(theta);
			const speed = speedBase + Math.random() * (explosive ? 4.2 : 2.4);

			this.velocities[base] = vx * speed * spread;
			this.velocities[base + 1] = vy * speed + upwardBoost;
			this.velocities[base + 2] = vz * speed * spread;

			this.colors[base] = c.r;
			this.colors[base + 1] = c.g;
			this.colors[base + 2] = c.b;
		}

		this.positionAttr.needsUpdate = true;
		this.colorAttr.needsUpdate = true;
	}

	update(dt) {
		const drag = 0.985;
		for (let i = 0; i < MAX_PARTICLES; i += 1) {
			if (!this.active[i]) {
				continue;
			}

			this.life[i] -= dt;
			const base = i * 3;

			if (this.life[i] <= 0) {
				this.active[i] = 0;
				this.positions[base + 1] = -9999;
				continue;
			}

			this.velocities[base] *= drag;
			this.velocities[base + 1] = this.velocities[base + 1] * drag - 13.5 * dt;
			this.velocities[base + 2] *= drag;

			this.positions[base] += this.velocities[base] * dt;
			this.positions[base + 1] += this.velocities[base + 1] * dt;
			this.positions[base + 2] += this.velocities[base + 2] * dt;
		}

		this.positionAttr.needsUpdate = true;
	}

	dispose() {
		this.scene.remove(this.points);
		this.geometry.dispose();
		this.material.dispose();
	}
}

export { ParticleSystem };
export default ParticleSystem;
