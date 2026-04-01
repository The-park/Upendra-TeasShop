import * as THREE from 'three';
import { getLevelConfig as getTowerLevelConfig } from './Tower.js';

const GameState = {
	IDLE: 'IDLE',
	PLAYING: 'PLAYING',
	DEAD: 'DEAD',
	WIN: 'WIN'
};

function getLevelConfig(levelNumber) {
	return getTowerLevelConfig(levelNumber);
}

class GameManager {
	static instance = null;

	constructor(ball, tower, pole, hud, audio, particles) {
		this.ball = ball;
		this.tower = tower;
		this.pole = pole;
		this.hud = hud;
		this.audio = audio;
		this.audioManager = audio;
		this.particles = particles;

		this.state = GameState.IDLE;
		this.score = 0;
		this.level = 1;
		this.totalLevels = 10;
		this.renderer = null;
		this._comboCount = 0;
		this._comboMultiplier = 1;
		this._lastSoftHitAt = 0;
		this._comboTimeoutMs = 1850;

		this._sequenceRunning = false;
		this._sequenceMeshes = [];

		this.tower.particleSystem = this.particles;
		GameManager.instance = this;
	}

	start() {
		this.state = GameState.PLAYING;
		this._comboCount = 0;
		this._comboMultiplier = 1;
		this._lastSoftHitAt = 0;
		this.hud.showPlayingUI(this.score, this.level, this.tower.totalSlabs);
		this.hud.updateCombo?.(0, 1, 0);
	}

	notifyLandingType(type) {
		if (this.state !== GameState.PLAYING) return;
		this.hud.showLandingHint?.(type);
	}

	onSoftHit(slabUserData) {
		if (this.state !== GameState.PLAYING) return;
		const broken = this.tower.onSoftHit(slabUserData);
		if (broken) {
			const now = performance.now();
			if (now - this._lastSoftHitAt <= this._comboTimeoutMs) {
				this._comboCount += 1;
			} else {
				this._comboCount = 1;
			}
			this._lastSoftHitAt = now;

			this._comboMultiplier = Math.min(4, 1 + Math.floor(Math.max(0, this._comboCount - 1) / 4));
			const gainedPoints = 3 * this._comboMultiplier;

			this.score += gainedPoints;
			this.hud.updateProgress(this.tower.slabsBroken, this.tower.totalSlabs, this.score);
			this.hud.updateCombo?.(this._comboCount, this._comboMultiplier, gainedPoints);
			this.audioManager?.play('break');
			if (this.tower.allDone()) this._levelComplete();
		}
	}

	onHardHit(slabUserData) {
		if (this.state !== GameState.PLAYING) return;
		this._comboCount = 0;
		this._comboMultiplier = 1;
		this._lastSoftHitAt = 0;
		this.audioManager?.play('bounce');
		this.renderer?.triggerShake?.(0.3);
		this.score = Math.max(0, this.score - 3);
		this.hud.updateProgress(this.tower.slabsBroken, this.tower.totalSlabs, this.score);
		this.hud.updateCombo?.(0, 1, 0);
	}

	restart() {
		this._clearCompletionSequence();
		// Clean up any remaining debris from slabs
		for (const slab of this.tower.slabs) {
			for (const d of slab.debris) {
				this.tower.scene.remove(d.mesh);
				d.mesh.geometry?.dispose();
				d.mesh.material?.dispose();
			}
			slab.debris = [];
		}
		this._comboCount = 0;
		this._comboMultiplier = 1;
		this._lastSoftHitAt = 0;
		this.ball.reset(this.level);
		this.tower.buildLevel(getLevelConfig(this.level));
		this.start();
	}

	nextLevel() {
		this._clearCompletionSequence();
		// Clean up any remaining debris from slabs
		for (const slab of this.tower.slabs) {
			for (const d of slab.debris) {
				this.tower.scene.remove(d.mesh);
				d.mesh.geometry?.dispose();
				d.mesh.material?.dispose();
			}
			slab.debris = [];
		}
		this._comboCount = 0;
		this._comboMultiplier = 1;
		this._lastSoftHitAt = 0;
		this.level = Math.min(this.level + 1, this.totalLevels);
		this.ball.reset(this.level);
		this.tower.buildLevel(getLevelConfig(this.level));
		this.start();
	}

	async _levelComplete() {
		if (this._sequenceRunning) return;
		this.state = GameState.WIN;
		this.audioManager?.play('win');
		this._sequenceRunning = true;

		try {
			await this._runLevelCompleteSequence();
		} finally {
			this._sequenceRunning = false;
		}
	}

	async _runLevelCompleteSequence() {
		console.log("Starting level complete sequence");
		try {
			const scene = this.tower.scene;
			if (!scene) {
				this.hud.showLevelComplete(this.score, this.level, this.totalLevels, 1);
				return;
			}

			const towerBottomY = -(this.tower.totalSlabs * 0.62) - 0.4;
			const platformY = towerBottomY - 0.8;
			const wheelY = platformY - 1.8;
			const cupY = wheelY - 2.4;

			this._spawnConfettiBurst(scene, this.ball.mesh.position.y + 0.2);

			const platform = this._createCheckeredPlatform();
			platform.position.set(0, platformY, 0);
			scene.add(platform);
			this._sequenceMeshes.push(platform);

			console.log("Creating wheel...");
			const wheel = this._createMultiplierWheel();
			wheel.group.position.set(0, wheelY, 0);
			scene.add(wheel.group);
			this._sequenceMeshes.push(wheel.group);

			console.log("Spinning wheel...");
			await this._spinWheel(wheel.group, 2000);
			console.log("Wheel spin complete, animating ball to wheel...");
			await this._animateBallToY(wheelY + 0.75, 900);

			const wedgeIndex = this._getWheelIndex(wheel.group.rotation.y, wheel.multipliers.length);
			const multiplier = wheel.multipliers[wedgeIndex] || 1;
			console.log(`Got multiplier: ${multiplier}`);
			this.score += multiplier;
			this.hud.updateProgress(this.tower.slabsBroken, this.tower.totalSlabs, this.score);

			console.log("Creating cup...");
			const cup = this._createCup();
			cup.position.set(0, cupY, 0);
			scene.add(cup);
			this._sequenceMeshes.push(cup);

			console.log("Animating ball to cup...");
			await this._animateBallToY(cupY + 0.45, 900);
			this._spawnConfettiBurst(scene, cupY + 0.8);

			console.log("Showing level complete dialog");
			this.hud.showLevelComplete(this.score, this.level, this.totalLevels, multiplier);
		} catch (error) {
			console.error("Error in level complete sequence:", error);
			// Fallback - show level complete dialog anyway
			this.hud.showLevelComplete(this.score, this.level, this.totalLevels, 1);
		}
	}

	_spawnConfettiBurst(scene, centerY) {
		const confettiColors = [0xfecf6a, 0x7fd4c6, 0x87c8f8, 0xffb7a1, 0xd2b6ff, 0xffffff];
		const confetti = [];
		for (let i = 0; i < 60; i++) {
			const mesh = new THREE.Mesh(
				new THREE.BoxGeometry(0.09, 0.03, 0.05),
				new THREE.MeshBasicMaterial({ color: confettiColors[i % confettiColors.length], transparent: true, opacity: 1 })
			);
			mesh.position.set((Math.random() - 0.5) * 3.2, centerY + Math.random() * 0.6, (Math.random() - 0.5) * 3.2);
			scene.add(mesh);
			this._sequenceMeshes.push(mesh);
			confetti.push({
				mesh,
				vx: (Math.random() - 0.5) * 2.2,
				vy: 3 + Math.random() * 3,
				vz: (Math.random() - 0.5) * 2.2,
				life: 1.6 + Math.random() * 0.6
			});
		}

		let prev = performance.now();
		const tick = (now) => {
			const dt = Math.min((now - prev) / 1000, 0.033);
			prev = now;
			let anyAlive = false;
			for (const c of confetti) {
				if (c.life <= 0) continue;
				anyAlive = true;
				c.life -= dt;
				c.vy -= 8 * dt;
				c.mesh.position.x += c.vx * dt;
				c.mesh.position.y += c.vy * dt;
				c.mesh.position.z += c.vz * dt;
				c.mesh.rotation.x += dt * 7;
				c.mesh.rotation.z += dt * 5;
				c.mesh.material.opacity = Math.max(0, c.life / 1.2);
			}
			if (anyAlive) {
				requestAnimationFrame(tick);
			}
		};
		requestAnimationFrame(tick);
	}

	_createCheckeredPlatform() {
		const size = 128;
		const canvas = document.createElement('canvas');
		canvas.width = size;
		canvas.height = size;
		const ctx = canvas.getContext('2d');
		const cell = size / 8;
		for (let y = 0; y < 8; y++) {
			for (let x = 0; x < 8; x++) {
				ctx.fillStyle = (x + y) % 2 === 0 ? '#eaf5ff' : '#d9ebe6';
				ctx.fillRect(x * cell, y * cell, cell, cell);
			}
		}
		const tex = new THREE.CanvasTexture(canvas);
		tex.wrapS = THREE.RepeatWrapping;
		tex.wrapT = THREE.RepeatWrapping;
		tex.repeat.set(2, 2);

		const platform = new THREE.Mesh(
			new THREE.CylinderGeometry(2.35, 2.35, 0.24, 36),
			new THREE.MeshPhongMaterial({ map: tex, color: 0xe8f1ff, shininess: 80 })
		);

		const marker = this._makeTextSprite('!', '#ff8b6b', 128, 'bold 84px Arial Rounded MT Bold');
		marker.position.set(0, 0.22, 0);
		platform.add(marker);
		return platform;
	}

	_createMultiplierWheel() {
		const group = new THREE.Group();
		const radius = 2.0;
		const wedges = 8;
		const multipliers = [1, 2, 3, 4, 5, 6, 4, 3];
		const colors = [0x6ccab4, 0x73bdf0, 0xfecf83, 0xff9f84, 0x6ccab4, 0x73bdf0, 0xfecf83, 0xff9f84];

		const base = new THREE.Mesh(
			new THREE.CylinderGeometry(radius + 0.14, radius + 0.14, 0.22, 40),
			new THREE.MeshPhongMaterial({ color: 0x2b374f })
		);
		group.add(base);

		for (let i = 0; i < wedges; i++) {
			const start = (i / wedges) * Math.PI * 2;
			const arc = (Math.PI * 2) / wedges;
			const wedge = new THREE.Mesh(
				new THREE.CircleGeometry(radius, 28, start, arc),
				new THREE.MeshPhongMaterial({ color: colors[i], side: THREE.DoubleSide })
			);
			wedge.rotation.x = -Math.PI / 2;
			wedge.position.y = 0.12;
			group.add(wedge);

			const labelAngle = start + arc * 0.5;
			const label = this._makeTextSprite(`x${multipliers[i]}`, '#ffffff', 160, 'bold 56px Arial Rounded MT Bold');
			label.position.set(Math.cos(labelAngle) * 1.2, 0.24, Math.sin(labelAngle) * 1.2);
			group.add(label);
		}

		return { group, multipliers };
	}

	_makeTextSprite(text, color = '#ffffff', size = 256, font = 'bold 64px Arial') {
		const canvas = document.createElement('canvas');
		canvas.width = size;
		canvas.height = size;
		const ctx = canvas.getContext('2d');
		ctx.clearRect(0, 0, size, size);
		ctx.font = font;
		ctx.textAlign = 'center';
		ctx.textBaseline = 'alphabetic';
		ctx.fillStyle = color;

		const lines = String(text).split('\n');
		const lineHeight = Math.round(size * 0.24);
		const blockHeight = lineHeight * lines.length;
		let y = size * 0.5 - blockHeight * 0.5 + lineHeight * 0.78;
		for (const line of lines) {
			ctx.fillText(line, size / 2, y);
			y += lineHeight;
		}

		const texture = new THREE.CanvasTexture(canvas);
		const material = new THREE.SpriteMaterial({ map: texture, transparent: true });
		const sprite = new THREE.Sprite(material);
		sprite.scale.set(0.8, 0.8, 0.8);
		return sprite;
	}

	_spinWheel(wheelGroup, durationMs = 2000) {
		return new Promise((resolve) => {
			const start = performance.now();
			let prev = start;
			let animId;
			let isDone = false;
			const step = (now) => {
				if (isDone) return;
				const t = Math.min((now - start) / durationMs, 1);
				const dt = Math.min((now - prev) / 1000, 0.033);
				prev = now;
				const speed = THREE.MathUtils.lerp(12, 0.6, t);
				wheelGroup.rotation.y += speed * dt;
				if (t < 1) {
					animId = requestAnimationFrame(step);
				} else {
					isDone = true;
					console.log("Wheel spin complete");
					resolve();
				}
			};
			animId = requestAnimationFrame(step);
			
			// Timeout safeguard
			setTimeout(() => {
				if (isDone) return;
				isDone = true;
				cancelAnimationFrame(animId);
				console.warn("Wheel spin timeout reached");
				resolve();
			}, durationMs + 1000);
		});
	}

	_getWheelIndex(rotationY, wedgeCount) {
		const full = Math.PI * 2;
		const normalized = ((rotationY % full) + full) % full;
		const seg = full / wedgeCount;
		return Math.floor(((full - normalized) % full) / seg);
	}

	_animateBallToY(targetY, durationMs = 900) {
		return new Promise((resolve) => {
			const startY = this.ball.body.position.y;
			const start = performance.now();
			let animId;
			let isDone = false;
			const step = (now) => {
				if (isDone) return;
				const t = Math.min((now - start) / durationMs, 1);
				const eased = 1 - Math.pow(1 - t, 3);
				const y = THREE.MathUtils.lerp(startY, targetY, eased);
				this.ball.body.position.set(0, y, 0);
				this.ball.body.velocity.set(0, 0, 0);
				this.ball.mesh.position.set(0, y, 0);
				if (t < 1) {
					animId = requestAnimationFrame(step);
				} else {
					isDone = true;
					console.log(`Ball animation to Y=${targetY} complete`);
					resolve();
				}
			};
			animId = requestAnimationFrame(step);
			
			// Timeout safeguard
			setTimeout(() => {
				if (isDone) return;
				isDone = true;
				cancelAnimationFrame(animId);
				console.warn(`Ball animation to Y=${targetY} timeout reached`);
				this.ball.body.position.set(0, targetY, 0);
				this.ball.body.velocity.set(0, 0, 0);
				this.ball.mesh.position.set(0, targetY, 0);
				resolve();
			}, durationMs + 1000);
		});
	}

	_createCup() {
		const group = new THREE.Group();
		const cup = new THREE.Mesh(
			new THREE.CylinderGeometry(0.55, 0.92, 2.2, 24, 1, true),
			new THREE.MeshPhongMaterial({ color: 0xf18a70, side: THREE.DoubleSide })
		);
		group.add(cup);

		const label = this._makeTextSprite(`${this.level}\n/${this.totalLevels}`, '#ffffff', 256, 'bold 58px Arial Rounded MT Bold');
		label.position.set(0, 0.2, 0.95);
		group.add(label);
		return group;
	}

	_clearCompletionSequence() {
		const scene = this.tower.scene;
		for (const obj of this._sequenceMeshes) {
			if (obj?.parent) {
				obj.parent.remove(obj);
			}
			obj?.traverse?.((child) => {
				if (child.geometry?.dispose) child.geometry.dispose();
				if (child.material?.dispose) child.material.dispose();
				if (Array.isArray(child.material)) {
					child.material.forEach((m) => m?.dispose?.());
				}
			});
		}
		this._sequenceMeshes = [];
		if (scene) {
			this.ball.mesh.position.x = 0;
			this.ball.mesh.position.z = 0;
		}
	}
}

export { GameManager, GameState, getLevelConfig };
export default GameManager;