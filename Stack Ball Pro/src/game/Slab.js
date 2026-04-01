import * as THREE from 'three';
import * as CANNON from 'cannon-es';

// Modern Soft Pastel Colors - Easy on Eyes & Aesthetic
const SOFT_COLORS = [
  0xFFB3BA,  // Soft Pink
  0xFFDFBA,  // Soft Peach
  0xFFFFBA,  // Soft Yellow
  0xBAFFC9,  // Soft Mint
  0xBAE1FF,  // Soft Sky
  0xE7BAFF,  // Soft Lavender
  0xFFBAF3,  // Soft Rose
  0xFFC4D6,  // Soft Coral
];

const HARD_COLOR = 0x2D2D3A;  // Softer dark (not pure black)
const PENTAGON_SIDES = 5;
const THICKNESS = 0.28;
const OUTER_R = 2.8;

function createPentagonVertices(radius, rotationOffset) {
  const verts = [];
  for (let i = 0; i < PENTAGON_SIDES; i++) {
    const a = rotationOffset + (i / PENTAGON_SIDES) * Math.PI * 2 - Math.PI / 2;
    verts.push(new THREE.Vector2(Math.cos(a) * radius, Math.sin(a) * radius));
  }
  return verts;
}

function lerp2(a, b, t) {
  return new THREE.Vector2(
    THREE.MathUtils.lerp(a.x, b.x, t),
    THREE.MathUtils.lerp(a.y, b.y, t)
  );
}

function buildSpotMesh(oA, oB, iB, iA, color) {
  const h = THICKNESS * 0.5;
  const vertices = [
    [oA.x, h, oA.y],
    [oB.x, h, oB.y],
    [iB.x, h, iB.y],
    [iA.x, h, iA.y],
    [oA.x, -h, oA.y],
    [oB.x, -h, oB.y],
    [iB.x, -h, iB.y],
    [iA.x, -h, iA.y],
  ];

  const positions = [];
  for (const v of vertices) positions.push(v[0], v[1], v[2]);

  const indices = [
    // top
    0, 1, 2,
    0, 2, 3,
    // bottom
    4, 6, 5,
    4, 7, 6,
    // sides
    0, 4, 5,
    0, 5, 1,
    1, 5, 6,
    1, 6, 2,
    2, 6, 7,
    2, 7, 3,
    3, 7, 4,
    3, 4, 0,
  ];

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geo.setIndex(indices);
  geo.computeVertexNormals();

  const isHard = color === HARD_COLOR;
  const colorObj = new THREE.Color(color);
  const mat = new THREE.MeshStandardMaterial({
    color,
    roughness: isHard ? 0.9 : 0.24,
    metalness: isHard ? 0.02 : 0.05,
    emissive: isHard ? 0x06080d : colorObj.clone().multiplyScalar(0.34),
    emissiveIntensity: isHard ? 0.02 : 0.34,
    flatShading: true,
  });

  return new THREE.Mesh(geo, mat);
}

function createSoftMask(totalSpots, runCount, minRun, maxRun) {
  const mask = new Array(totalSpots).fill(false);
  const safeRunCount = Math.max(1, Math.min(runCount, totalSpots));

  for (let r = 0; r < safeRunCount; r++) {
    const start = Math.floor(Math.random() * totalSpots);
    const runLen = Math.max(minRun, Math.min(maxRun, Math.floor(minRun + Math.random() * (maxRun - minRun + 1))));

    for (let j = 0; j < runLen; j++) {
      mask[(start + j) % totalSpots] = true;
    }
  }

  if (!mask.some(Boolean)) {
    const forced = Math.min(3, totalSpots);
    for (let i = 0; i < forced; i++) mask[i] = true;
  }

  return mask;
}

export default class Slab {
  constructor(scene, world, physics, yPosition, colorIndex, config, towerGroup) {
    this.scene = scene;
    this.world = world;
    this.physics = physics;
    this.yPosition = yPosition;
    this.towerGroup = towerGroup;

    this.isBroken = false;
    this.debris = [];
    this.pieces = [];

    this.softColor = SOFT_COLORS[colorIndex % SOFT_COLORS.length];

    const spotsPerSide = Math.max(3, config?.spotsPerSide ?? 4);
    const poleRadius = Math.max(0.05, config?.poleRadius ?? 0.22);
    const poleGap = Math.max(0.08, config?.poleGap ?? 0.34);
    const innerRadius = Math.max(0.66, poleRadius + poleGap);
    const totalSpots = PENTAGON_SIDES * spotsPerSide;
    const softRunCount = Math.max(1, config?.softRunCount ?? 2);
    const softRunMin = Math.max(1, config?.softRunMin ?? 2);
    const softRunMax = Math.max(softRunMin, config?.softRunMax ?? 4);

    const softMask = createSoftMask(totalSpots, softRunCount, softRunMin, softRunMax);
    const rotationOffset = Math.random() * Math.PI * 2;

    const outerVerts = createPentagonVertices(OUTER_R, rotationOffset);
    const innerVerts = createPentagonVertices(innerRadius, rotationOffset);

    let spotIndex = 0;
    for (let side = 0; side < PENTAGON_SIDES; side++) {
      const next = (side + 1) % PENTAGON_SIDES;
      const oA = outerVerts[side];
      const oB = outerVerts[next];
      const iA = innerVerts[side];
      const iB = innerVerts[next];

      for (let s = 0; s < spotsPerSide; s++) {
        const t0 = s / spotsPerSide;
        const t1 = (s + 1) / spotsPerSide;

        const soA = lerp2(oA, oB, t0);
        const soB = lerp2(oA, oB, t1);
        const siA = lerp2(iA, iB, t0);
        const siB = lerp2(iA, iB, t1);

        const isSoft = softMask[spotIndex];
        const color = isSoft ? this.softColor : HARD_COLOR;
        const material = isSoft ? this.physics.softSlabMaterial : this.physics.hardSlabMaterial;

        const mesh = buildSpotMesh(soA, soB, siB, siA, color);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        mesh.position.y = yPosition;
        this.towerGroup.add(mesh);

        const body = this._buildSpotBody(soA, soB, siA, siB, material);
        body.userData = {
          type: isSoft ? 'soft_slab' : 'hard_slab',
          slab: this,
          yPosition,
          spotIndex,
        };
        this.world.addBody(body);

        this.pieces.push({ mesh, body, color });
        spotIndex++;
      }
    }
  }

  _buildSpotBody(outerA, outerB, innerA, innerB, material) {
    const outerMid = lerp2(outerA, outerB, 0.5);
    const innerMid = lerp2(innerA, innerB, 0.5);
    const center = lerp2(outerMid, innerMid, 0.5);

    const tangent = outerB.clone().sub(outerA);
    const segLen = tangent.length();
    tangent.normalize();

    const radialDepth = outerMid.distanceTo(innerMid);

    const body = new CANNON.Body({ mass: 0, material });
    const halfLen = Math.max(0.05, segLen * 0.43);
    const halfHeight = THICKNESS * 0.5;
    const halfDepth = Math.max(0.05, radialDepth * 0.44);
    const shape = new CANNON.Box(
      new CANNON.Vec3(
        halfLen,
        halfHeight,
        halfDepth
      )
    );
    body.addShape(shape);

    body.position.set(center.x, this.yPosition, center.y);
    const yaw = Math.atan2(tangent.y, tangent.x);
    body.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), yaw);
    return body;
  }

  syncBodiesToTower() {
    if (this.isBroken) return;
    for (const p of this.pieces) {
      if (!p.body || !p.mesh) continue;
      this._syncBody(p.body, p.mesh);
    }
  }

  _syncBody(body, mesh) {
    const wp = new THREE.Vector3();
    const wq = new THREE.Quaternion();
    mesh.getWorldPosition(wp);
    mesh.getWorldQuaternion(wq);
    body.position.set(wp.x, wp.y, wp.z);
    body.quaternion.set(wq.x, wq.y, wq.z, wq.w);
    body.wakeUp();
  }

  breakWholeSlab(particleSystem) {
    if (this.isBroken) return;
    this.isBroken = true;

    for (const p of this.pieces) {
      if (p.body) {
        this.world.removeBody(p.body);
        p.body = null;
      }
    }

    for (const p of this.pieces) {
      if (!p.mesh) continue;

      const worldPos = new THREE.Vector3();
      p.mesh.getWorldPosition(worldPos);

      if (Math.random() < 0.9) {
        const geo = new THREE.BoxGeometry(
          0.36 + Math.random() * 0.24,
          THICKNESS,
          0.22 + Math.random() * 0.18
        );
        const mat = new THREE.MeshPhongMaterial({ color: p.color, flatShading: true });
        const debrisMesh = new THREE.Mesh(geo, mat);
        debrisMesh.position.copy(worldPos);
        debrisMesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
        this.scene.add(debrisMesh);

        const a = Math.atan2(worldPos.z, worldPos.x) + (Math.random() - 0.5) * 0.4;
        const speed = 4 + Math.random() * 4;
        this.debris.push({
          mesh: debrisMesh,
          vx: Math.cos(a) * speed,
          vy: 1.6 + Math.random() * 2.8,
          vz: Math.sin(a) * speed,
          rotX: (Math.random() - 0.5) * 10,
          rotZ: (Math.random() - 0.5) * 10,
          life: 0.8 + Math.random() * 0.5,
        });
      }

      this.towerGroup.remove(p.mesh);
      p.mesh.geometry.dispose();
      p.mesh.material.dispose();
      p.mesh = null;
    }

    if (particleSystem) {
      const burstPos = new THREE.Vector3(0, this.yPosition, 0);
      particleSystem.burst(burstPos, new THREE.Color(this.softColor), 25);
    }
  }

  animateDebris(dt) {
    for (let i = this.debris.length - 1; i >= 0; i--) {
      const d = this.debris[i];
      d.mesh.position.x += d.vx * dt;
      d.mesh.position.y += d.vy * dt;
      d.mesh.position.z += d.vz * dt;
      d.vy -= 20 * dt;
      d.mesh.rotation.x += d.rotX * dt;
      d.mesh.rotation.z += d.rotZ * dt;
      d.life -= dt;

      if (d.life < 0.3) {
        d.mesh.material.opacity = d.life / 0.3;
        d.mesh.material.transparent = true;
      }

      if (d.life <= 0) {
        this.scene.remove(d.mesh);
        d.mesh.geometry.dispose();
        d.mesh.material.dispose();
        this.debris.splice(i, 1);
      }
    }
  }

  dispose() {
    for (const p of this.pieces) {
      if (p.body) this.world.removeBody(p.body);
      if (p.mesh) {
        this.towerGroup.remove(p.mesh);
        p.mesh.geometry.dispose();
        p.mesh.material.dispose();
      }
    }
    this.pieces = [];

    for (const d of this.debris) {
      this.scene.remove(d.mesh);
      d.mesh.geometry.dispose();
      d.mesh.material.dispose();
    }
    this.debris = [];
  }
}
