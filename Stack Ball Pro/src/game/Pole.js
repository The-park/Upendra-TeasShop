import * as THREE from 'three';

class Pole {
	constructor(scene) {
		this.scene = scene;
		const poleRadius = 0.22;

		const geometry = new THREE.CylinderGeometry(poleRadius, poleRadius, 200, 16);
		const material = new THREE.MeshPhongMaterial({
			color: 0xeaf3ff,
			emissive: 0x12223a,
			emissiveIntensity: 0.12,
			shininess: 140
		});
		material.fog = false;

		this.mesh = new THREE.Mesh(geometry, material);
		this.mesh.castShadow = false;
		this.mesh.receiveShadow = false;
		this.mesh.position.set(0, -90, 0);
		this.scene.add(this.mesh);
	}
}

export { Pole };
export default Pole;
