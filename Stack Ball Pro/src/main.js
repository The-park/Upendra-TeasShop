import * as THREE from 'three';
import { Renderer } from './engine/Renderer.js';
import { Physics } from './engine/Physics.js';
import { InputManager } from './engine/InputManager.js';
import { Ball } from './game/Ball.js';
import Tower from './game/Tower.js';
import { Pole } from './game/Pole.js';
import { GameManager, GameState, getLevelConfig } from './game/GameManager.js';
import { ParticleSystem } from './game/ParticleSystem.js';
import { HUD } from './ui/HUD.js';
import { AudioManager } from './audio/AudioManager.js';

console.log('%c✨ STACK BALL PRO v4.2 - VICTORY SEQUENCE FIX ✨', 'color: #FF6B9D; font-weight: bold; font-size: 20px; text-shadow: 0 2px 8px rgba(255,107,157,0.5);');
console.log('%c🎯 Fixed: Victory sequence hanging after level 3', 'color: #4CAF50; font-weight: bold;');
console.log('%c🎨 Soft Sunset Theme - Easy on Eyes', 'color: #FEC260; font-weight: bold;');
console.log('%c💎 Glass Morphism UI - Modern Design', 'color: #FF8DB3;');

function ensurePerformanceMarksApi() {
	const perf = globalThis?.performance;
	if (!perf) return;

	const noOp = () => {};
	const fallbacks = ['mark', 'measure', 'clearMarks', 'clearMeasures'];
	for (const name of fallbacks) {
		if (typeof perf[name] === 'function') continue;
		try {
			Object.defineProperty(perf, name, {
				value: noOp,
				writable: true,
				configurable: true
			});
		} catch {
			try {
				perf[name] = noOp;
			} catch {
				// Ignore non-writable environments; app logic does not depend on these methods.
			}
		}
	}

	const maybeUgt = globalThis?.ugt;
	if (maybeUgt && typeof maybeUgt === 'object' && typeof maybeUgt.clearMarks !== 'function') {
		try {
			maybeUgt.clearMarks = noOp;
		} catch {
			// External injected globals may be frozen; ignore safely.
		}
	}
}

async function init() {
	ensurePerformanceMarksApi();

	const appDiv = document.getElementById('app');
	const uiDiv = document.getElementById('ui');

	const renderer = new Renderer(appDiv);
	const physics = new Physics();
	const input = new InputManager(renderer.renderer.domElement);

	const audio = new AudioManager();
	const particles = new ParticleSystem(renderer.scene3D);
	const pole = new Pole(renderer.scene3D, physics);
	const tower = new Tower(renderer.scene3D, physics.world, physics);
	const ball = new Ball(renderer.scene3D, physics, 1);
	const hud = new HUD(uiDiv);
	tower.particleSystem = particles;

	tower.buildLevel(getLevelConfig(1));

	const gm = new GameManager(ball, tower, pole, hud, audio, particles);
	window.__gm = gm;
	ball.setBreakInputSource(() => gm.state === GameState.PLAYING && input.isPressing);

	gm.renderer = renderer;

	renderer.setupCamera(ball.mesh);

	window.addEventListener('game:restart', () => gm.restart());
	window.addEventListener('game:next', () => gm.nextLevel());

	hud.showStartScreen();

	const startTargets = [renderer.renderer.domElement, window];
	const startEvents = ['pointerup', 'mouseup', 'touchend'];
	const startOnce = () => {
		if (gm.state === GameState.IDLE) {
			gm.start();
			input.cancelPress?.();
			audio.startBGM();
			for (const target of startTargets) {
				for (const eventName of startEvents) {
					target.removeEventListener(eventName, startOnce);
				}
			}
		}
	};
	for (const target of startTargets) {
		for (const eventName of startEvents) {
			target.addEventListener(eventName, startOnce);
		}
	}

	const clock = new THREE.Clock();
	function loop() {
		requestAnimationFrame(loop);
		const dt = Math.min(clock.getDelta(), 0.05);

		input.update();
		hud.setBreakMode?.(gm.state === GameState.PLAYING && input.isPressing);

		if (gm.state === GameState.PLAYING) {
			physics.step(dt);
			ball.update(dt);
			tower.update(dt, input.rotation);
		} else if (gm.state === GameState.WIN) {
			// Continue animating debris and tower during victory sequence
			tower.update(dt, 0);
		}

		particles.update(dt);
		renderer.updateCamera(dt);
		renderer.render();
	}
	loop();
}

init().catch(console.error);
