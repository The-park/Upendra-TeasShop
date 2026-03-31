import * as THREE from 'three';
import * as CANNON from 'cannon-es';

const BALL_RADIUS = 0.50;
const BALL_START_Y = 0.72;
const BOUNCE_TARGET_HEIGHT = 4.05;
const BOUNCE_MIN_HEIGHT = 1.35;
const BOUNCE_MAX_HEIGHT = 3.45;
const BOUNCE_MIN_SPEED = 8.9;
const BOUNCE_MAX_SPEED = 16.6;

class Ball {
	constructor(scene, physics, level = 1) {
		this.scene = scene;
		this._scene = scene;
		this.physics = physics;
		void level;

		this._visualZOffset = 0.36;
		this._baseScale = BALL_RADIUS * 2;

		const ballTexture = this._createBallSpriteTexture();
		const ballMat = new THREE.SpriteMaterial({
			map: ballTexture,
			transparent: true,
			depthTest: false,
			depthWrite: false
		});
		this.mesh = new THREE.Sprite(ballMat);
		this.mesh.castShadow = false;
		this.mesh.renderOrder = 999;
		this.mesh.position.set(0, BALL_START_Y, this._visualZOffset);
		this.mesh.scale.set(this._baseScale, this._baseScale, 1);
		this._visualY = BALL_START_Y;
		this._smoothedVelY = 0;
		this._baseSpriteColor = new THREE.Color(0xffffff);
		this._landingTintColor = this._baseSpriteColor.clone();
		this._landingTintTimer = 0;
		scene.add(this.mesh);

		const shadowGeo = new THREE.CircleGeometry(BALL_RADIUS * 0.72, 18);
		const shadowMat = new THREE.MeshBasicMaterial({
			color: 0x000000,
			transparent: true,
			opacity: 0.22,
			depthTest: true,
			depthWrite: false
		});
		this._shadow = new THREE.Mesh(shadowGeo, shadowMat);
		this._shadow.rotation.x = -Math.PI / 2;
		this._shadow.renderOrder = 998;
		scene.add(this._shadow);

		this.body = this.physics.createBallBody(BALL_RADIUS, { x: 0, y: BALL_START_Y, z: 0 });

		this.isAlive = true;
		this._dieAnimId = null;
		this._lastVelY = 0;
		this._lastContactY = BALL_START_Y;
		this._fallHeight = 0;

		this._state = 'idle';
		this._stateTimer = 0;
		this._squashTimer = 0;
		this._fallSpeed = 0;
		this._BALL_RADIUS = BALL_RADIUS;
		this._lastTrail = 0;
		this._hardContactLockUntil = 0;
		this._lastBounceAt = 0;
		this._lastLandingType = '';
		this._lastLandingHintAt = 0;
		this._lastContactResolveAt = 0;
		this._idlePhase = Math.random() * Math.PI * 2;
		this._isBreakInputActive = () => false;

		this._onCollide = (event) => {
			const now = Date.now();
			const other = event.body;
			const ud = other.userData;
			if (!ud || !ud.type) return;
			if (ud.type !== 'soft_slab' && ud.type !== 'hard_slab') return;

			this._emitLandingHint(ud.type === 'soft_slab' ? 'soft' : 'hard');

			if (this._recentHits.has(other.id)) return;

			this._lastContactY = this.body.position.y;
			this._fallHeight = 0;

			if (ud.type === 'soft_slab') {
				const isFallingOrNeutral = this.body.velocity.y <= 1;
				const canBreak = this._canBreakSoftSlab();
				const canBreakSoft = isFallingOrNeutral && canBreak;
				if (canBreakSoft) {
					this._markRecentHit(other.id, 140);
					// Soft hit takes priority over any pending hard bounce from mixed edge contacts.
					this._pendingBounce = false;
					this._pendingBounceSpeed = 0;
					this._squashTimer = 0.08;
					import('./GameManager.js').then((m) => {
						m.GameManager.instance?.onSoftHit(ud);
					});
				} else {
					this._markRecentHit(other.id, 120);
					this._queueBounce(this._computeLimitedBounceSpeed(this.body.position.y));
					this._squashTimer = 0.18;
				}
			} else if (ud.type === 'hard_slab') {
				this._markRecentHit(other.id, 160);
				this._hardContactLockUntil = now + 170;
				this._queueBounce(this._computeLimitedBounceSpeed(this.body.position.y));
				this._squashTimer = 0.25;
				import('./GameManager.js').then((m) => {
					m.GameManager.instance?.onHardHit(ud);
				});
			}
		};

		this.body.addEventListener('collide', this._onCollide);
		this._recentHits = new Set();
		this._pendingBounce = false;
		this._pendingBounceSpeed = 0;

		if (this._postStepHandler) {
			this.physics.world.removeEventListener('postStep', this._postStepHandler);
		}

		this._postStepHandler = () => {
			this.body.position.x = 0;
			this.body.position.z = 0;
			this.body.velocity.x = 0;
			this.body.velocity.z = 0;
			this.body.angularVelocity.set(0, 0, 0);

			if (this._pendingBounce) {
				this.body.velocity.y = Math.max(this._pendingBounceSpeed, this.body.velocity.y);
				this.body.position.y += 0.03;
				this._pendingBounce = false;
			}

			if (this.body.position.y > 4.0) {
				this.body.position.y = 4.0;
				if (this.body.velocity.y > 0) this.body.velocity.y = 0;
			}
		};
		this.physics.world.addEventListener('postStep', this._postStepHandler);
	}

	_createBallSpriteTexture() {
		const size = 256;
		const canvas = document.createElement('canvas');
		canvas.width = size;
		canvas.height = size;
		const ctx = canvas.getContext('2d');
		const cx = size * 0.5;
		const cy = size * 0.5;
		const r = size * 0.45;

		ctx.clearRect(0, 0, size, size);

		const base = ctx.createRadialGradient(cx - r * 0.28, cy - r * 0.25, r * 0.12, cx, cy, r);
		base.addColorStop(0.0, '#5AAAF3');
		base.addColorStop(0.65, '#1E88E5');
		base.addColorStop(1.0, '#0D47A1');
		ctx.fillStyle = base;
		ctx.beginPath();
		ctx.arc(cx, cy, r, 0, Math.PI * 2);
		ctx.fill();

		ctx.fillStyle = 'rgba(255,255,255,0.55)';
		ctx.beginPath();
		ctx.ellipse(cx - r * 0.28, cy - r * 0.22, r * 0.20, r * 0.17, -0.35, 0, Math.PI * 2);
		ctx.fill();

		ctx.fillStyle = 'rgba(255,255,255,0.90)';
		ctx.beginPath();
		ctx.ellipse(cx - r * 0.03, cy - r * 0.35, r * 0.17, r * 0.12, 0, 0, Math.PI * 2);
		ctx.fill();

		ctx.strokeStyle = 'rgba(255,255,255,0.18)';
		ctx.lineWidth = r * 0.09;
		ctx.beginPath();
		ctx.arc(cx, cy, r * 0.9, Math.PI * 0.15, Math.PI * 0.95);
		ctx.stroke();

		const texture = new THREE.CanvasTexture(canvas);
		texture.needsUpdate = true;
		texture.minFilter = THREE.LinearFilter;
		texture.magFilter = THREE.LinearFilter;
		return texture;
	}

	_applyScale(scaleXZ, scaleY) {
		this.mesh.scale.set(this._baseScale * scaleXZ, this._baseScale * scaleY, 1);
	}

	_emitLandingHint(type) {
		const now = Date.now();
		if (type === this._lastLandingType && now - this._lastLandingHintAt < 120) {
			return;
		}

		this._lastLandingType = type;
		this._lastLandingHintAt = now;

		import('./GameManager.js').then((m) => {
			m.GameManager.instance?.notifyLandingType?.(type);
		});

		this._landingTintColor.setHex(type === 'soft' ? 0x8fffd8 : 0xffd29a);
		this._landingTintTimer = 0.22;
	}

	_computeLimitedBounceSpeed(contactY) {
		const gravityY = Math.abs(this.physics?.world?.gravity?.y ?? 35);
		const headRoom = Math.max(0.8, 3.8 - contactY);
		const targetHeight = THREE.MathUtils.clamp(
			Math.min(BOUNCE_TARGET_HEIGHT, headRoom),
			BOUNCE_MIN_HEIGHT,
			BOUNCE_MAX_HEIGHT
		);
		const speed = Math.sqrt(2 * gravityY * targetHeight);
		return THREE.MathUtils.clamp(speed, BOUNCE_MIN_SPEED, BOUNCE_MAX_SPEED);
	}

	_queueBounce(speed) {
		const now = Date.now();
		if (now - this._lastBounceAt < 90) {
			this._pendingBounce = true;
			this._pendingBounceSpeed = Math.max(this._pendingBounceSpeed * 0.92, speed * 0.9);
			return;
		}

		this._pendingBounce = true;
		this._pendingBounceSpeed = speed;
		this._lastBounceAt = now;
	}

	_markRecentHit(id, timeoutMs = 120) {
		this._recentHits.add(id);
		setTimeout(() => this._recentHits.delete(id), timeoutMs);
	}

	_isTouchingHardSlab() {
		return this._getActiveSlabContacts().hasHard;
	}

	_getActiveSlabContacts() {
		const equations = this.physics?.world?.narrowphase?.contactEquations;
		const info = {
			hasSoft: false,
			hasHard: false,
			softUserData: null,
			hardUserData: null
		};

		if (!equations || equations.length === 0) return info;

		for (const eq of equations) {
			const bi = eq.bi;
			const bj = eq.bj;
			if (bi !== this.body && bj !== this.body) continue;

			const other = bi === this.body ? bj : bi;
			if (other?.userData?.type === 'soft_slab') {
				info.hasSoft = true;
				if (!info.softUserData) info.softUserData = other.userData;
			}
			if (other?.userData?.type === 'hard_slab') {
				info.hasHard = true;
				if (!info.hardUserData) info.hardUserData = other.userData;
			}
		}

		return info;
	}

	setBreakInputSource(isActiveFn) {
		this._isBreakInputActive = typeof isActiveFn === 'function' ? isActiveFn : () => false;
	}

	_canBreakSoftSlab() {
		// Check if user is actively pressing - this overrides hard contact lock
		try {
			const userWantsToBreak = !!this._isBreakInputActive?.();
			
			// If user is actively clicking, allow breaking regardless of hard contact lock
			if (userWantsToBreak) {
				return true;
			}
			
			// If user is NOT clicking, check hard contact lock
			if (Date.now() < this._hardContactLockUntil) {
				return false;
			}
			
			return false;
		} catch (e) {
			return false;
		}
	}

	_resolveStuckContact() {
		const now = Date.now();
		if (now - this._lastContactResolveAt < 110) return;

		const contact = this._getActiveSlabContacts();
		if (!contact.hasSoft && !contact.hasHard) return;

		const nearlyStill = Math.abs(this.body.velocity.y) < 0.16;
		if (!nearlyStill) return;

		// Update hard contact lock if touching hard slab
		if (contact.hasHard) {
			this._hardContactLockUntil = Math.max(this._hardContactLockUntil, now + 130);
		}

		// Check if can break soft slab (this now handles user input override)
		const canBreakSoft = contact.hasSoft && this._canBreakSoftSlab();
		if (canBreakSoft) {
			this._pendingBounce = false;
			this._pendingBounceSpeed = 0;
			this._squashTimer = 0.08;
			this._lastContactResolveAt = now;
			import('./GameManager.js').then((m) => {
				m.GameManager.instance?.onSoftHit(contact.softUserData);
			});
			return;
		}

		this._queueBounce(this._computeLimitedBounceSpeed(this.body.position.y));
		this._squashTimer = Math.max(this._squashTimer, 0.18);
		this._lastContactResolveAt = now;
	}

	update(dt) {
		// Lock ball to pole axis — never drifts sideways
		this.body.position.x = 0;
		this.body.position.z = 0;
		this.body.velocity.x = 0;
		this.body.velocity.z = 0;
		this.body.angularVelocity.set(0, 0, 0);

		// Sync mesh to physics body
		this.mesh.position.x = 0;
		this.mesh.position.z = this._visualZOffset;
		// Do NOT copy quaternion — ball should not spin/rotate visually

		if (this.body.position.y > 4.0) {
			this.body.position.y = 4.0;
			if (this.body.velocity.y > 0) this.body.velocity.y = 0;
		}

		if (Math.abs(this.body.velocity.y) < 0.5 && this.body.position.y > 0.8) {
			this.body.velocity.y -= 2.8 * dt;
		}

		this._resolveStuckContact();

		const smoothT = THREE.MathUtils.clamp(dt * 14, 0, 1);
		this._visualY = THREE.MathUtils.lerp(this._visualY, this.body.position.y, smoothT);
		this.mesh.position.y = this._visualY;
		this._fallHeight = Math.max(0, this._lastContactY - this.body.position.y);

		this._shadow.position.set(
			this.body.position.x,
			this.body.position.y - BALL_RADIUS - 0.05,
			this.body.position.z
		);
		const shadowScale = Math.max(0, Math.min(1, 1 - (this._fallHeight || 0) * 0.05));
		this._shadow.scale.setScalar(shadowScale);

		this._updateAnimation(dt);

		if (this._landingTintTimer > 0) {
			this._landingTintTimer -= dt;
			const t = Math.max(0, this._landingTintTimer / 0.22);
			this.mesh.material.color.copy(this._baseSpriteColor).lerp(this._landingTintColor, t * 0.9);
		} else {
			this.mesh.material.color.copy(this._baseSpriteColor);
		}

		this._lastVelY = this.body.velocity.y;
		this._smoothedVelY = THREE.MathUtils.lerp(this._smoothedVelY, this.body.velocity.y, 0.22);
	}

	_updateAnimation(dt) {
		const velY = this._smoothedVelY;
		this._fallSpeed = velY;
		this._stateTimer += dt;
		this._idlePhase += dt * (2.1 + Math.min(6, Math.abs(velY)) * 0.12);
		this.mesh.material.rotation += dt * (0.95 + Math.min(8, Math.abs(velY)) * 0.08);
		if (this.mesh.material.rotation > Math.PI * 2) {
			this.mesh.material.rotation -= Math.PI * 2;
		}

		if (this._squashTimer > 0) {
			this._squashTimer -= dt;
			const t = 1.0 - (this._squashTimer / 0.25);
			const ease = Math.sin(t * Math.PI);
			const scaleXZ = 1 + 0.55 * ease;
			const scaleY = 1 - 0.45 * ease;
			this._applyScale(scaleXZ, scaleY);
			this.mesh.position.y = this._visualY;
			this._state = 'squash';
			return;
		}

		if (velY < -9) {
			const stretch = Math.min((-velY - 9) / 12, 1.0);
			const scaleXZ = 1 - stretch * 0.22;
			const scaleY = 1 + stretch * 0.4;
			this._applyScale(scaleXZ, scaleY);
			this.mesh.position.y = this._visualY;
			this._state = 'falling';
			this._spawnTrailParticle();
			return;
		}

		if (velY > 4) {
			const stretch = Math.min((velY - 4) / 10, 1.0);
			const scaleXZ = 1 - stretch * 0.1;
			const scaleY = 1 + stretch * 0.2;
			this._applyScale(scaleXZ, scaleY);
			this.mesh.position.y = this._visualY + Math.sin(this._idlePhase * 0.8) * 0.01;
			this._state = 'bounce';
			return;
		}

		const pulse = 1 + Math.sin(Date.now() * 0.003) * 0.025;
		this._applyScale(pulse, pulse);
		this.mesh.position.y = this._visualY + Math.sin(this._idlePhase) * 0.018;
		this._state = 'idle';
	}

	_spawnTrailParticle() {
		const now = Date.now();
		if (now - (this._lastTrail || 0) < 30) return;
		this._lastTrail = now;

		const size = 0.06 + Math.random() * 0.08;
		const geo = new THREE.SphereGeometry(size, 6, 6);
		const colors = [0xffffff, 0xb3e5fc, 0x4fc3f7, 0x81d4fa];
		const color = colors[Math.floor(Math.random() * colors.length)];

		const mat = new THREE.MeshBasicMaterial({
			color,
			transparent: true,
			opacity: 0.75
		});
		const spark = new THREE.Mesh(geo, mat);

		const offsetY = this._BALL_RADIUS + 0.1 + Math.random() * 0.3;
		spark.position.set(
			this.mesh.position.x + (Math.random() - 0.5) * 0.15,
			this.mesh.position.y + offsetY,
			this.mesh.position.z + (Math.random() - 0.5) * 0.15
		);
		this._scene.add(spark);

		const startTime = now;
		const duration = 140 + Math.random() * 80;
		const startY = spark.position.y;

		const animate = () => {
			const elapsed = Date.now() - startTime;
			if (elapsed >= duration) {
				this._scene.remove(spark);
				geo.dispose();
				mat.dispose();
				return;
			}
			const t = elapsed / duration;
			spark.position.y = startY + t * 0.4;
			spark.material.opacity = 0.75 * (1 - t);
			spark.scale.setScalar(1 - t * 0.5);
			requestAnimationFrame(animate);
		};
		requestAnimationFrame(animate);
	}

	die() {
		if (!this.isAlive) return;

		this.isAlive = false;
		this.body.velocity.set(0, 0, 0);
		this.body.angularVelocity.set(0, 0, 0);
		this.body.type = CANNON.Body.STATIC;
		this.body.updateMassProperties();

		const duration = 250;
		const start = performance.now();

		if (this._dieAnimId) {
			cancelAnimationFrame(this._dieAnimId);
		}

		const step = (now) => {
			const t = Math.min(1, (now - start) / duration);
			const k = Math.max(0, 1 - t);
			this._applyScale(k, k);

			if (t < 1) {
				this._dieAnimId = requestAnimationFrame(step);
			} else {
				this._dieAnimId = null;
			}
		};

		this._dieAnimId = requestAnimationFrame(step);
	}

	reset(levelNumber) {
		void levelNumber;

		this.body.position.set(0, BALL_START_Y, 0);
		this.body.velocity.set(0, 0, 0);
		this.body.angularVelocity.set(0, 0, 0);
		this.body.type = CANNON.Body.DYNAMIC;
		this.body.updateMassProperties();
		this.body.wakeUp();

		if (this._dieAnimId) {
			cancelAnimationFrame(this._dieAnimId);
			this._dieAnimId = null;
		}

		this.mesh.position.set(0, BALL_START_Y, this._visualZOffset);
		this._applyScale(1, 1);
		this._shadow.position.set(0, BALL_START_Y - BALL_RADIUS - 0.05, 0);
		this._shadow.scale.setScalar(1);

		this.isAlive = true;
		this._state = 'idle';
		this._stateTimer = 0;
		this._squashTimer = 0;
		this._fallSpeed = 0;
		this._fallHeight = 0;
		this._lastContactY = BALL_START_Y;
		this._visualY = BALL_START_Y;
		this._smoothedVelY = 0;
		this._lastVelY = 0;
		this._pendingBounce = false;
		this._pendingBounceSpeed = 0;
		this._hardContactLockUntil = 0;
		this._lastBounceAt = 0;
		this._lastLandingType = '';
		this._lastLandingHintAt = 0;
		this._lastContactResolveAt = 0;
		this._idlePhase = Math.random() * Math.PI * 2;
		this._landingTintTimer = 0;
		this.mesh.material.color.copy(this._baseSpriteColor);
		this.mesh.material.rotation = 0;
	}

	dispose(scene, world) {
		if (this._dieAnimId) {
			cancelAnimationFrame(this._dieAnimId);
			this._dieAnimId = null;
		}

		this.body.removeEventListener('collide', this._onCollide);
		scene.remove(this.mesh);
		scene.remove(this._shadow);

		if (world && this.body) world.removeBody(this.body);
		if (this._postStepHandler) {
			world?.removeEventListener?.('postStep', this._postStepHandler);
		}

		if (this.mesh.material.map) this.mesh.material.map.dispose();
		this.mesh.material.dispose();
		this._shadow.geometry.dispose();
		this._shadow.material.dispose();
	}
}

export { BALL_RADIUS };
export { Ball };
export default Ball;
