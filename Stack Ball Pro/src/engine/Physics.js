import * as CANNON from 'cannon-es';

class Physics {
	constructor() {
		this._world = new CANNON.World({
			gravity: new CANNON.Vec3(0, -35, 0)
		});
		this._world.broadphase = new CANNON.SAPBroadphase(this._world);
		this._world.allowSleep = false;
		this._world.solver.iterations = 20;

		this.ballMaterial = new CANNON.Material('ball');
		this.softSlabMaterial = new CANNON.Material('softSlab');
		this.hardSlabMaterial = new CANNON.Material('hardSlab');
		this.poleMaterial = new CANNON.Material('pole');
		this._world.poleMaterial = this.poleMaterial;

		const ballSoftContact = new CANNON.ContactMaterial(this.ballMaterial, this.softSlabMaterial, {
			friction: 0.0,
			restitution: 0.0
		});
		this._world.addContactMaterial(ballSoftContact);

		const ballHardContact = new CANNON.ContactMaterial(this.ballMaterial, this.hardSlabMaterial, {
			friction: 0.0,
			restitution: 0.0
		});
		this._world.addContactMaterial(ballHardContact);

		this._world.addContactMaterial(
			new CANNON.ContactMaterial(this.ballMaterial, this.poleMaterial, {
				friction: 0.0,
				restitution: 0.0
			})
		);
	}

	step(dt) {
		this._world.step(1 / 120, dt, 8);
	}

	createBallBody(radius, position) {
		const body = new CANNON.Body({
			mass: 1.0,
			shape: new CANNON.Sphere(radius),
			material: this.ballMaterial
		});

		body.position.set(position.x, position.y, position.z);
		body.linearDamping = 0.0;
		body.angularDamping = 1.0;
		body.allowSleep = false;
		this._world.addBody(body);
		return body;
	}

	createSlabBody(halfW, halfH, halfD, position, quaternion) {
		const body = new CANNON.Body({
			mass: 0,
			shape: new CANNON.Box(new CANNON.Vec3(halfW, halfH, halfD))
		});

		body.position.set(position.x, position.y, position.z);
		if (quaternion) {
			body.quaternion.set(quaternion.x, quaternion.y, quaternion.z, quaternion.w);
		}

		this._world.addBody(body);
		return body;
	}

	createPoleBody(radius, height) {
		const halfHeight = height * 0.5;
		const body = new CANNON.Body({
			mass: 0,
			material: this.poleMaterial
		});

		const cylinder = new CANNON.Cylinder(radius, radius, height, 16);
		const rotation = new CANNON.Quaternion();
		rotation.setFromEuler(0, 0, Math.PI / 2);
		body.addShape(cylinder, new CANNON.Vec3(0, 0, 0), rotation);
		body.addShape(new CANNON.Sphere(radius), new CANNON.Vec3(0, halfHeight, 0));
		body.addShape(new CANNON.Sphere(radius), new CANNON.Vec3(0, -halfHeight, 0));

		this._world.addBody(body);
		return body;
	}

	removeBody(body) {
		if (body) {
			this._world.removeBody(body);
		}
	}

	get world() {
		return this._world;
	}
}

export { Physics };
export default Physics;
