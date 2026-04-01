import * as THREE from 'three';

class Renderer {
	constructor(mountEl) {
		this.scene = new THREE.Scene();
		this.scene.background = null;
		this.scene.fog = new THREE.FogExp2('#5f7fa0', 0.014);

		const aspect = window.innerWidth / window.innerHeight;
		this.camera = new THREE.PerspectiveCamera(47, aspect, 0.1, 300);
		this.camera.position.set(0, 5.2, 13.5);
		this.camera.lookAt(0, 0, 0);

		this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
		this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		this.renderer.setClearColor(0x000000, 0);
		this.renderer.outputColorSpace = THREE.SRGBColorSpace;
		this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
		this.renderer.toneMappingExposure = 1.08;
		this.renderer.shadowMap.enabled = true;
		this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

		const app = mountEl || document.getElementById('app') || document.body;
		app.appendChild(this.renderer.domElement);

		this._ballMesh = null;
		this._lookY = 0;
		this.shakeIntensity = 0;

		this._setupLights();

		this._onResize = this._onResize.bind(this);
		window.addEventListener('resize', this._onResize);
	}

	_setupLights() {
		const ambient = new THREE.AmbientLight(0xf6f7ff, 0.5);
		this.scene.add(ambient);

		const directional = new THREE.DirectionalLight(0xfff3e5, 1.05);
		directional.position.set(8, 22, 10);
		directional.castShadow = true;
		directional.shadow.mapSize.set(2048, 2048);
		directional.shadow.camera.left = -15;
		directional.shadow.camera.right = 15;
		directional.shadow.camera.top = 15;
		directional.shadow.camera.bottom = -15;
		directional.shadow.normalBias = 0.02;
		this.scene.add(directional);

		const hemisphere = new THREE.HemisphereLight(0x9edcff, 0x27354a, 0.6);
		this.scene.add(hemisphere);

		const rim = new THREE.DirectionalLight(0x89dac8, 0.32);
		rim.position.set(-10, 11, -9);
		this.scene.add(rim);

		const bounce = new THREE.PointLight(0xffc9a7, 0.18, 36, 2);
		bounce.position.set(0, -7, 2);
		this.scene.add(bounce);
	}

	setupCamera(ballMesh) {
		this._ballMesh = ballMesh;
		this.camera.position.set(0, 5.2, 13.5);
		this.camera.lookAt(0, 0, 0);
	}

	updateCamera(dt) {
		if (!this._ballMesh) {
			return;
		}

		const targetY = this._ballMesh.position.y + 4.2;
		const lookY = this._ballMesh.position.y - 1.05;

		this.camera.position.y += (targetY - this.camera.position.y) * 0.07;
		this.camera.position.x = 0;
		this.camera.position.z = 13.5;

		this._lookY = this._lookY ?? 0;
		this._lookY += (lookY - this._lookY) * 0.075;
		this.camera.lookAt(0, this._lookY, 0);
	}

	triggerShake(intensity) {
		this.shakeIntensity = Math.max(this.shakeIntensity, intensity);
	}

	render() {
		if (this.shakeIntensity > 0.0001) {
			const amount = this.shakeIntensity;
			const offsetX = (Math.random() - 0.5) * amount;
			const offsetY = (Math.random() - 0.5) * amount;
			this.camera.position.x += offsetX;
			this.camera.position.y += offsetY;
			this.shakeIntensity *= 0.88;
		} else {
			this.shakeIntensity = 0;
		}

		this.renderer.render(this.scene, this.camera);
	}

	_onResize() {
		this.camera.aspect = window.innerWidth / window.innerHeight;
		this.camera.updateProjectionMatrix();
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
	}

	get scene3D() {
		return this.scene;
	}

	get cam() {
		return this.camera;
	}
}

export { Renderer };
export default Renderer;
