import { Howl, Howler } from 'howler';

class AudioManager {
	constructor() {
		this.sounds = {};
		this._bgmStarted = false;
		this._unlocked = false;

		this._loadSound('break', '/sounds/break.mp3', { volume: 0.5 });
		this._loadSound('bounce', '/sounds/bounce.mp3', { volume: 0.45 });
		this._loadSound('death', '/sounds/death.mp3', { volume: 0.65 });
		this._loadSound('win', '/sounds/win.mp3', { volume: 0.55 });
		this._loadSound('bgm', '/sounds/bgm.mp3', { loop: true, volume: 0.25 });

		this._unlockAudio = this._unlockAudio.bind(this);
		window.addEventListener('touchstart', this._unlockAudio, { once: true, passive: true });
		window.addEventListener('pointerdown', this._unlockAudio, { once: true, passive: true });
	}

	_loadSound(name, src, opts = {}) {
		try {
			const sound = new Howl({
				src: [src],
				preload: true,
				onloaderror: () => {
					this.sounds[name] = null;
				},
				onplayerror: () => {
					this.sounds[name] = null;
				},
				...opts
			});
			this.sounds[name] = sound;
		} catch (err) {
			this.sounds[name] = null;
		}
	}

	_unlockAudio() {
		if (this._unlocked) {
			return;
		}

		this._unlocked = true;
		Howler.autoUnlock = true;
		const sfx = this.sounds.break;
		if (sfx) {
			const id = sfx.play();
			sfx.volume(0, id);
			sfx.once('play', () => {
				sfx.stop(id);
				sfx.volume(0.5, id);
			});
		}
	}

	play(name) {
		const sound = this.sounds[name];
		if (!sound) {
			return;
		}
		sound.play();
	}

	startBGM() {
		if (this._bgmStarted) {
			return;
		}

		const bgm = this.sounds.bgm;
		if (!bgm) {
			return;
		}

		this._bgmStarted = true;
		bgm.play();
	}

	stopBGM() {
		const bgm = this.sounds.bgm;
		if (!bgm) {
			return;
		}
		bgm.stop();
		this._bgmStarted = false;
	}
}

export { AudioManager };
export default AudioManager;
