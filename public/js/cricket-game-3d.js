/**
 * ═══════════════════════════════════════════════════════════════════
 *  TeaShop — 3D BOX CRICKET  ("Tea-Time Box Cricket")
 *  Real physics-based 3D WebGL cricket game using Three.js
 *  Bat must physically collide with ball to score runs.
 *  1 Batsman · 1 Bowler · 4 Fielders · Box Cricket Ground
 * ═══════════════════════════════════════════════════════════════════
 */

(function () {
    'use strict';

    /* ══════════ CONFIG ══════════ */
    var TOTAL_BALLS  = 12;
    var MAX_WICKETS  = 3;
    var GROUND_W     = 30;
    var GROUND_L     = 50;
    var WALL_H       = 3.5;
    var PITCH_W      = 3;
    var PITCH_L      = 18;

    /* Collision / Physics tuning */
    var HIT_RADIUS       = 0.7;    // bat-ball collision distance
    var CATCH_RADIUS     = 2.5;    // fielder catch zone
    var CATCH_HEIGHT_MAX = 3.0;    // max height for a catch
    var CATCH_PROB       = 0.55;   // base catch probability
    var BOUNDARY_X       = GROUND_W / 2 - 0.5;
    var BOUNDARY_Z_FAR   = -GROUND_L / 2 + 0.5;
    var BOUNDARY_Z_NEAR  = GROUND_L / 2 - 0.5;

    /* ══════════ STATE ══════════ */
    var container, renderer, scene, camera;
    var score = 0, balls = 0, wickets = 0;
    var bestScore    = parseInt(localStorage.getItem('cricket3d_best') || '0', 10);
    var gamePhase    = 'intro';
    var resultTimer  = 0;

    /* 3D objects */
    var ballMesh, batsmanGroup, bowlerGroup, batMesh;
    var fielders     = [];
    var stumpsGroup;
    var floodLights  = [];

    /* Ball physics */
    var ballVel = { x: 0, y: 0, z: 0 };
    var ballActive = false;
    var bowlProgress = 0;

    /* Bat swing */
    var batSwingAngle   = 0;
    var batSwinging     = false;
    var hasSwung        = false;
    var ballHit         = false;    // true once bat physically contacts ball
    var batPivot;
    var batsmanBaseRotY = Math.PI / 2;

    /* Bat collision markers */
    var batTip, batMid, batBase;
    var _tmpVec  = new THREE.Vector3();
    var _tmpVec2 = new THREE.Vector3();
    var _tmpVec3 = new THREE.Vector3();

    /* Flight tracking */
    var hitOrigin = new THREE.Vector3();
    var boundaryReached = false;
    var caughtChecked   = false;

    /* Timing */
    var clock;
    var BOWL_DURATION = 1.3;

    /* UI */
    var overlayEl, scoreEl, resultEl, instructEl;

    /* ══════════ INIT ══════════ */
    function init(containerId) {
        container = document.getElementById(containerId);
        if (!container) return;

        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 0.9;
        resizeRenderer();
        container.appendChild(renderer.domElement);

        scene = new THREE.Scene();
        scene.background = new THREE.Color(0x0a0e1a);
        scene.fog = new THREE.FogExp2(0x0a0e1a, 0.008);

        camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 200);
        camera.position.set(0, 2.2, 14);
        camera.lookAt(0, 0.8, -8);

        clock = new THREE.Clock();

        buildLighting();
        buildGround();
        buildWalls();
        buildPitch();
        buildStumps();
        buildFloodLights();
        buildPlayers();
        buildBall();
        buildUI();

        container.addEventListener('click', onInteract);
        container.addEventListener('touchstart', function (e) { e.preventDefault(); onInteract(); }, { passive: false });
        window.addEventListener('resize', onResize);

        animate();
    }

    window.BoxCricket3D = { init: init };

    /* ══════════ RESIZE ══════════ */
    function resizeRenderer() {
        var w = container.clientWidth;
        var h = Math.min(w * 0.75, 560);
        renderer.setSize(w, h);
        container.style.height = h + 'px';
    }
    function onResize() {
        resizeRenderer();
        camera.aspect = container.clientWidth / parseFloat(container.style.height);
        camera.updateProjectionMatrix();
    }

    /* ══════════ LIGHTING ══════════ */
    function buildLighting() {
        scene.add(new THREE.AmbientLight(0x223344, 0.6));
        scene.add(new THREE.HemisphereLight(0x1a1a40, 0x0d200d, 0.4));
    }

    /* ══════════ GROUND ══════════ */
    function buildGround() {
        var ground = new THREE.Mesh(
            new THREE.PlaneGeometry(GROUND_W, GROUND_L),
            new THREE.MeshStandardMaterial({ color: 0x2d8c2d, roughness: 0.85 })
        );
        ground.rotation.x = -Math.PI / 2;
        ground.receiveShadow = true;
        scene.add(ground);

        var outer = new THREE.Mesh(
            new THREE.PlaneGeometry(120, 120),
            new THREE.MeshStandardMaterial({ color: 0x1a3a1a, roughness: 1 })
        );
        outer.rotation.x = -Math.PI / 2;
        outer.position.y = -0.02;
        outer.receiveShadow = true;
        scene.add(outer);
    }

    /* ══════════ BOUNDARY WALLS ══════════ */
    function buildWalls() {
        var wallMat = new THREE.MeshStandardMaterial({ color: 0xdddddd, roughness: 0.6 });
        var adColors = [0xf1c40f, 0xe74c3c, 0x3498db, 0x2ecc71, 0xe67e22, 0x9b59b6, 0x1abc9c, 0xf39c12];

        function makeWall(w, h, d, px, py, pz, ry) {
            var m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), wallMat.clone());
            m.position.set(px, py, pz);
            m.rotation.y = ry || 0;
            m.castShadow = true;
            m.receiveShadow = true;
            scene.add(m);
            var panelCount = Math.floor(w / 4);
            for (var i = 0; i < panelCount; i++) {
                var pw = (w / panelCount) - 0.2;
                var pm = new THREE.Mesh(
                    new THREE.BoxGeometry(pw, h * 0.6, 0.05),
                    new THREE.MeshStandardMaterial({ color: adColors[(i + Math.floor(pz)) % adColors.length], roughness: 0.4, metalness: 0.1 })
                );
                pm.position.set(-w / 2 + (w / panelCount) * i + (w / panelCount) / 2, 0, d / 2 + 0.03);
                m.add(pm);
            }
            return m;
        }

        makeWall(GROUND_L, WALL_H, 0.4, -GROUND_W / 2, WALL_H / 2, 0, 0).rotation.y = Math.PI / 2;
        makeWall(GROUND_L, WALL_H, 0.4, GROUND_W / 2, WALL_H / 2, 0, 0).rotation.y = -Math.PI / 2;
        makeWall(GROUND_W, WALL_H, 0.4, 0, WALL_H / 2, -GROUND_L / 2, 0);
        makeWall(GROUND_W, WALL_H * 0.7, 0.4, 0, WALL_H * 0.35, GROUND_L / 2, Math.PI);
    }

    /* ══════════ PITCH ══════════ */
    function buildPitch() {
        var pitch = new THREE.Mesh(
            new THREE.PlaneGeometry(PITCH_W, PITCH_L),
            new THREE.MeshStandardMaterial({ color: 0xc8a96e, roughness: 0.9 })
        );
        pitch.rotation.x = -Math.PI / 2;
        pitch.position.y = 0.01;
        pitch.receiveShadow = true;
        scene.add(pitch);

        var lineMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
        [PITCH_L / 2 - 1.5, -PITCH_L / 2 + 1.5].forEach(function (z) {
            var lm = new THREE.Mesh(new THREE.PlaneGeometry(3.5, 0.08), lineMat);
            lm.rotation.x = -Math.PI / 2;
            lm.position.set(0, 0.02, z);
            scene.add(lm);
        });
    }

    /* ══════════ STUMPS ══════════ */
    function buildStumps() {
        function makeStumps(z) {
            var g = new THREE.Group();
            var stumpMat = new THREE.MeshStandardMaterial({ color: 0xf5deb3, roughness: 0.5 });
            var bailMat = new THREE.MeshStandardMaterial({ color: 0xdaa520, roughness: 0.4 });
            for (var i = -1; i <= 1; i++) {
                var s = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.8, 8), stumpMat);
                s.position.set(i * 0.15, 0.4, 0);
                s.castShadow = true;
                g.add(s);
            }
            for (var j = 0; j < 2; j++) {
                var b = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.18, 6), bailMat);
                b.rotation.z = Math.PI / 2;
                b.position.set(j === 0 ? -0.07 : 0.07, 0.82, 0);
                b.name = 'bail';
                g.add(b);
            }
            g.position.z = z;
            scene.add(g);
            return g;
        }
        stumpsGroup = makeStumps(PITCH_L / 2 - 1.5);
        makeStumps(-PITCH_L / 2 + 1.5);
    }

    /* ══════════ FLOODLIGHTS ══════════ */
    function buildFloodLights() {
        var positions = [
            [-GROUND_W / 2 - 1, 0, -GROUND_L / 4],
            [GROUND_W / 2 + 1, 0, -GROUND_L / 4],
            [-GROUND_W / 2 - 1, 0, GROUND_L / 4],
            [GROUND_W / 2 + 1, 0, GROUND_L / 4],
            [-GROUND_W / 2 - 1, 0, 0],
            [GROUND_W / 2 + 1, 0, 0],
        ];
        var poleMat = new THREE.MeshStandardMaterial({ color: 0x888888, metalness: 0.8, roughness: 0.3 });
        var lightMat = new THREE.MeshStandardMaterial({ color: 0xffffcc, emissive: 0xffffaa, emissiveIntensity: 2 });

        positions.forEach(function (p) {
            var pole = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.15, 14, 8), poleMat);
            pole.position.set(p[0], 7, p[2]);
            pole.castShadow = true;
            scene.add(pole);

            var housing = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.3, 0.6), lightMat);
            housing.position.set(p[0], 14.2, p[2]);
            scene.add(housing);

            var spot = new THREE.SpotLight(0xffeedd, 40, 60, Math.PI / 3.5, 0.6, 1.5);
            spot.position.set(p[0], 14, p[2]);
            spot.target.position.set(p[0] > 0 ? p[0] - 4 : p[0] + 4, 0, p[2]);
            spot.castShadow = true;
            spot.shadow.mapSize.set(512, 512);
            scene.add(spot);
            scene.add(spot.target);
            floodLights.push(spot);
        });
    }

    /* ══════════ PLAYER BUILDER ══════════ */
    function buildPlayerFigure(shirtColor, pantsColor) {
        var group = new THREE.Group();
        var skinMat = new THREE.MeshStandardMaterial({ color: 0xe8b88a, roughness: 0.7 });
        var shirtMat = new THREE.MeshStandardMaterial({ color: shirtColor, roughness: 0.6 });
        var pantsMat = new THREE.MeshStandardMaterial({ color: pantsColor, roughness: 0.7 });
        var shoeMat = new THREE.MeshStandardMaterial({ color: 0x333333, roughness: 0.8 });
        var helmMat = new THREE.MeshStandardMaterial({ color: 0x1a3a6a, roughness: 0.4, metalness: 0.3 });

        var torso = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.9, 0.4), shirtMat);
        torso.position.y = 1.45; torso.castShadow = true; group.add(torso);

        var head = new THREE.Mesh(new THREE.SphereGeometry(0.25, 12, 10), skinMat);
        head.position.y = 2.15; head.castShadow = true; group.add(head);

        var helmet = new THREE.Mesh(new THREE.SphereGeometry(0.28, 12, 10, 0, Math.PI * 2, 0, Math.PI / 2), helmMat);
        helmet.position.y = 2.2; helmet.castShadow = true; group.add(helmet);

        for (var side = -1; side <= 1; side += 2) {
            var arm = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.07, 0.7, 8), shirtMat);
            arm.position.set(side * 0.5, 1.4, 0);
            arm.rotation.z = side * 0.15;
            arm.castShadow = true;
            arm.name = side === -1 ? 'leftArm' : 'rightArm';
            group.add(arm);

            var hand = new THREE.Mesh(new THREE.SphereGeometry(0.07, 8, 6), skinMat);
            hand.position.set(side * 0.55, 1.0, 0);
            group.add(hand);
        }

        for (var s = -1; s <= 1; s += 2) {
            var leg = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.09, 0.85, 8), pantsMat);
            leg.position.set(s * 0.18, 0.55, 0);
            leg.castShadow = true; group.add(leg);

            var shoe = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.1, 0.3), shoeMat);
            shoe.position.set(s * 0.18, 0.08, 0.05);
            shoe.castShadow = true; group.add(shoe);
        }

        group.castShadow = true;
        return group;
    }

    /* ══════════ PLAYERS ══════════ */
    function buildPlayers() {
        // ── BATSMAN ──
        batsmanGroup = buildPlayerFigure(0xffffff, 0xeeeeee);
        batsmanGroup.position.set(-0.6, 0, PITCH_L / 2 - 1.5);
        batsmanGroup.rotation.y = batsmanBaseRotY;
        scene.add(batsmanGroup);

        // Bat pivot at hand level
        batPivot = new THREE.Group();
        batPivot.position.set(0.55, 1.05, 0.15);
        batsmanGroup.add(batPivot);

        // Bat blade
        batMesh = new THREE.Mesh(
            new THREE.BoxGeometry(0.15, 0.8, 0.08),
            new THREE.MeshStandardMaterial({ color: 0xdeb887, roughness: 0.5 })
        );
        batMesh.position.set(0, -0.35, 0.05);

        var handle = new THREE.Mesh(
            new THREE.CylinderGeometry(0.03, 0.03, 0.35, 8),
            new THREE.MeshStandardMaterial({ color: 0x8b4513, roughness: 0.6 })
        );
        handle.position.y = 0.55;
        batMesh.add(handle);

        var grip = new THREE.Mesh(
            new THREE.CylinderGeometry(0.04, 0.04, 0.15, 8),
            new THREE.MeshStandardMaterial({ color: 0x222222 })
        );
        grip.position.y = 0.7;
        batMesh.add(grip);
        batPivot.add(batMesh);

        // ── Collision markers along the bat blade ──
        batTip = new THREE.Object3D();
        batTip.position.set(0, -0.75, 0);     // toe of bat
        batMesh.add(batTip);

        batMid = new THREE.Object3D();
        batMid.position.set(0, -0.35, 0);     // sweet spot
        batMesh.add(batMid);

        batBase = new THREE.Object3D();
        batBase.position.set(0, 0.0, 0);      // near splice/handle
        batMesh.add(batBase);

        // ── BOWLER ──
        bowlerGroup = buildPlayerFigure(0x2266bb, 0x1a1a2e);
        bowlerGroup.position.set(0, 0, -PITCH_L / 2 + 3);
        bowlerGroup.rotation.y = Math.PI;
        scene.add(bowlerGroup);

        // ── FIELDERS ──
        var fielderPositions = [
            { x: -8, z: -4, ry: 0.6 },
            { x: 8, z: -4, ry: -0.6 },
            { x: -10, z: 8, ry: 1.2 },
            { x: 10, z: 8, ry: -1.2 },
        ];
        fielderPositions.forEach(function (fp) {
            var f = buildPlayerFigure(0x2266bb, 0x1a1a2e);
            f.position.set(fp.x, 0, fp.z);
            f.rotation.y = fp.ry;
            scene.add(f);
            fielders.push(f);
        });
    }

    /* ══════════ BALL ══════════ */
    function buildBall() {
        ballMesh = new THREE.Mesh(
            new THREE.SphereGeometry(0.14, 16, 12),
            new THREE.MeshStandardMaterial({ color: 0xcc2200, roughness: 0.35, metalness: 0.1 })
        );
        ballMesh.castShadow = true;
        var seam = new THREE.Mesh(
            new THREE.TorusGeometry(0.13, 0.015, 8, 24),
            new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.5 })
        );
        seam.rotation.x = Math.PI / 2;
        ballMesh.add(seam);
        ballMesh.visible = false;
        scene.add(ballMesh);
    }

    /* ══════════ UI ══════════ */
    function buildUI() {
        overlayEl = document.createElement('div');
        overlayEl.className = 'cricket3d-overlay';
        overlayEl.innerHTML =
            '<div class="c3d-scoreboard" id="c3dScore"></div>' +
            '<div class="c3d-result" id="c3dResult"></div>' +
            '<div class="c3d-instruct" id="c3dInstruct"></div>';
        container.style.position = 'relative';
        container.appendChild(overlayEl);

        scoreEl = document.getElementById('c3dScore');
        resultEl = document.getElementById('c3dResult');
        instructEl = document.getElementById('c3dInstruct');

        updateScoreboard();
        showInstruction('🏏 Tap to Start');
    }

    function updateScoreboard() {
        scoreEl.innerHTML =
            '<span class="c3d-runs">' + score + '/' + wickets + '</span>' +
            '<span class="c3d-balls">Balls: ' + balls + '/' + TOTAL_BALLS + '</span>' +
            '<span class="c3d-best">Best: ' + bestScore + '</span>';
    }

    function showResult(text, color) {
        resultEl.textContent = text;
        resultEl.style.color = color || '#fff';
        resultEl.style.opacity = '1';
        resultEl.style.transform = 'translate(-50%, -50%) scale(1)';
    }
    function hideResult() {
        resultEl.style.opacity = '0';
        resultEl.style.transform = 'translate(-50%, -50%) scale(0.5)';
    }
    function showInstruction(text) {
        instructEl.textContent = text;
        instructEl.style.opacity = '1';
    }
    function hideInstruction() {
        instructEl.style.opacity = '0';
    }

    /* ══════════ INTERACTION ══════════ */
    function onInteract() {
        switch (gamePhase) {
            case 'intro':    startGame(); break;
            case 'ready':    break;
            case 'bowling':  triggerSwing(); break;
            case 'swing':    break;
            case 'flight':   break;
            case 'result':   break;
            case 'gameover': startGame(); break;
        }
    }

    /* ══════════ GAME FLOW ══════════ */
    function startGame() {
        score = 0; balls = 0; wickets = 0;
        gamePhase = 'ready';
        hideInstruction();
        hideResult();
        updateScoreboard();
        resetBowler();
        resetBatsman();
        setTimeout(startBowling, 800);
    }

    function startBowling() {
        if (gamePhase !== 'ready') return;
        gamePhase = 'bowling';
        bowlProgress = 0;
        ballMesh.visible = true;
        ballMesh.position.set(0, 1.8, -PITCH_L / 2 + 3);
        ballVel = { x: 0, y: 0, z: 0 };
        batSwinging = false;
        hasSwung = false;
        ballHit = false;
        batSwingAngle = 0;
        boundaryReached = false;
        caughtChecked = false;
        showInstruction('⚡ TAP to swing!');
    }

    function triggerSwing() {
        if (gamePhase !== 'bowling') return;
        gamePhase = 'swing';
        batSwinging = true;
        hasSwung = true;
        batSwingAngle = 0;
        hideInstruction();
        // No random scoring — everything is determined by real collision
    }

    /* ═══════════════════════════════════════════════════
     *  BAT-BALL COLLISION DETECTION
     *  Checks 3 points along the bat blade each frame.
     *  Only scores if bat physically touches ball.
     * ═══════════════════════════════════════════════════ */
    function checkBatBallCollision() {
        if (!batSwinging || ballHit || !ballMesh.visible) return false;

        var ballPos = ballMesh.position;

        // Get world positions of bat collision markers
        batTip.getWorldPosition(_tmpVec);
        batMid.getWorldPosition(_tmpVec2);
        batBase.getWorldPosition(_tmpVec3);

        var distTip  = _tmpVec.distanceTo(ballPos);
        var distMid  = _tmpVec2.distanceTo(ballPos);
        var distBase = _tmpVec3.distanceTo(ballPos);

        var minDist = Math.min(distTip, distMid, distBase);

        if (minDist < HIT_RADIUS) {
            // ═══ HIT! Bat physically touched ball ═══
            ballHit = true;

            // Hit quality depends on which part of bat
            var hitQuality;
            if (minDist === distMid) {
                hitQuality = 1.0;    // sweet spot (middle)
            } else if (minDist === distTip) {
                hitQuality = 0.6;    // toe — decent power, less control
            } else {
                hitQuality = 0.35;   // splice/handle — inside edge, weak
            }

            // Swing progress at contact (0-1)
            var swingFrac = Math.min(batSwingAngle / 130, 1);

            // Best contact when 30-70% through the swing arc
            var timingBonus = 1.0;
            if (swingFrac >= 0.3 && swingFrac <= 0.7) {
                timingBonus = 1.2;
            } else if (swingFrac < 0.15 || swingFrac > 0.85) {
                timingBonus = 0.5;
            }

            var power = hitQuality * timingBonus;

            // Shot direction from bat angle at impact
            var shotAngle;
            if (swingFrac < 0.35) {
                shotAngle = -0.3 + Math.random() * 0.6;   // cover drive area
            } else if (swingFrac < 0.65) {
                shotAngle = -0.8 + Math.random() * 1.6;   // straight/wide
            } else {
                shotAngle = 0.5 + Math.random() * 0.8;    // leg side
            }

            // Power → speed & height
            var speed   = 8 + power * 22;
            var launchY = 1 + power * 10;
            var launchZ = -Math.cos(shotAngle) * speed;
            var launchX = Math.sin(shotAngle) * speed;

            // Slight randomness
            launchX += (Math.random() - 0.5) * 3;
            launchZ += (Math.random() - 0.5) * 2;

            ballVel.x = launchX;
            ballVel.y = launchY;
            ballVel.z = launchZ;
            ballActive = true;

            hitOrigin.copy(ballPos);
            gamePhase = 'flight';

            return true;
        }

        return false;
    }

    /* ═══════════════════════════════════════════════════
     *  FLIGHT: boundary / catch / run checks
     * ═══════════════════════════════════════════════════ */
    function checkBoundary() {
        if (boundaryReached) return;
        var bx = ballMesh.position.x;
        var bz = ballMesh.position.z;
        var by = ballMesh.position.y;

        if (Math.abs(bx) >= BOUNDARY_X || bz <= BOUNDARY_Z_FAR || bz >= BOUNDARY_Z_NEAR) {
            boundaryReached = true;
            if (by > WALL_H) {
                awardRuns(6, 'SIX! 🚀', '#ffc107');
            } else {
                awardRuns(4, 'FOUR! 🏏', '#28a745');
            }
        }
    }

    function checkCatch() {
        if (caughtChecked || boundaryReached) return;
        var ballPos = ballMesh.position;
        var by = ballPos.y;

        if (by > 0.3 && by < CATCH_HEIGHT_MAX) {
            for (var i = 0; i < fielders.length; i++) {
                var fp = fielders[i].position;
                var dx = ballPos.x - fp.x;
                var dz = ballPos.z - fp.z;
                var dist2D = Math.sqrt(dx * dx + dz * dz);

                if (dist2D < CATCH_RADIUS) {
                    caughtChecked = true;
                    var totalSpeed = Math.abs(ballVel.x) + Math.abs(ballVel.y) + Math.abs(ballVel.z);
                    var catchChance = CATCH_PROB * (1 - dist2D / CATCH_RADIUS) * (totalSpeed < 15 ? 1.0 : 0.6);

                    if (Math.random() < catchChance) {
                        ballActive = false;
                        ballVel = { x: 0, y: 0, z: 0 };
                        doWicket('CAUGHT! 🖐️');
                        return;
                    }
                    break;
                }
            }
        }
    }

    function onBallStopped() {
        if (boundaryReached) return;

        var dx = ballMesh.position.x - hitOrigin.x;
        var dz = ballMesh.position.z - hitOrigin.z;
        var distance = Math.sqrt(dx * dx + dz * dz);

        if (distance < 3) {
            awardRuns(0, 'DOT BALL', '#aaa');
        } else if (distance < 7) {
            awardRuns(1, 'SINGLE', '#17a2b8');
        } else if (distance < 14) {
            awardRuns(2, 'TWO RUNS', '#17a2b8');
        } else {
            awardRuns(3, 'THREE RUNS!', '#17a2b8');
        }
    }

    function awardRuns(runs, text, color) {
        balls++;
        score += runs;
        gamePhase = 'result';
        showResult(text, color);
        updateScoreboard();
        resultTimer = runs >= 4 ? 2000 : 1500;
    }

    /* Ball missed bat entirely */
    function onBallMissed() {
        balls++;

        // Check if ball would hit stumps
        var bx = ballMesh.position.x;
        var by = ballMesh.position.y;

        if (Math.abs(bx) < 0.25 && by < 0.85 && by > 0.05) {
            doWicket('BOWLED! 💥');
        } else if (hasSwung) {
            gamePhase = 'result';
            showResult('MISS!', '#e67e22');
            resultTimer = 1200;
            ballMesh.visible = false;
            updateScoreboard();
        } else {
            gamePhase = 'result';
            showResult('DOT BALL', '#aaa');
            resultTimer = 1200;
            ballMesh.visible = false;
            updateScoreboard();
        }
    }

    function doWicket(text) {
        wickets++;
        gamePhase = 'result';
        stumpsGroup.children.forEach(function (c) {
            if (c.name === 'bail') {
                c.position.y += 0.5;
                c.rotation.x = Math.random() * 2;
            }
        });
        showResult(text, '#dc3545');
        resultTimer = 2000;
        ballMesh.visible = false;
        updateScoreboard();
    }

    function afterResult() {
        hideResult();
        resetBatsman();
        resetBowler();
        resetStumps();
        ballMesh.visible = false;
        ballActive = false;

        if (balls >= TOTAL_BALLS || wickets >= MAX_WICKETS) {
            endGame();
        } else {
            gamePhase = 'ready';
            setTimeout(startBowling, 600);
        }
    }

    function endGame() {
        gamePhase = 'gameover';
        if (score > bestScore) {
            bestScore = score;
            localStorage.setItem('cricket3d_best', String(bestScore));
        }
        updateScoreboard();
        showResult('INNINGS OVER! Score: ' + score, '#fff');
        showInstruction('Tap to play again');
    }

    /* ══════════ RESETS ══════════ */
    function resetBowler() {
        bowlerGroup.position.set(0, 0, -PITCH_L / 2 + 3);
        bowlerGroup.children.forEach(function (c) {
            if (c.name === 'rightArm') c.rotation.x = 0;
        });
    }
    function resetBatsman() {
        batSwinging = false;
        hasSwung = false;
        ballHit = false;
        batSwingAngle = 0;
        if (batPivot) batPivot.rotation.set(0, 0, 0);
        if (batsmanGroup) batsmanGroup.rotation.y = batsmanBaseRotY;
    }
    function resetStumps() {
        stumpsGroup.children.forEach(function (c) {
            if (c.name === 'bail') {
                c.position.y = 0.82;
                c.rotation.x = 0;
            }
        });
    }

    /* ══════════ ANIMATION LOOP ══════════ */
    function animate() {
        requestAnimationFrame(animate);
        var dt = Math.min(clock.getDelta(), 0.05);
        updateGame(dt);
        renderer.render(scene, camera);
    }

    function updateGame(dt) {

        /* ── Bowling: ball travels toward batsman ── */
        if (gamePhase === 'bowling' || (gamePhase === 'swing' && !ballHit)) {
            bowlProgress += dt / BOWL_DURATION;
            var startZ = -PITCH_L / 2 + 3;
            var endZ   = PITCH_L / 2 - 1.5;
            var t      = Math.min(bowlProgress, 1);

            ballMesh.position.z = startZ + (endZ - startZ) * t;
            ballMesh.position.y = 1.8 - t * 0.6 + Math.sin(t * Math.PI) * 0.6;
            ballMesh.position.x = Math.sin(t * 3) * 0.15;

            // Bowler run-up
            if (t < 0.3) {
                bowlerGroup.position.z = (-PITCH_L / 2 + 3) + t * 6;
                bowlerGroup.children.forEach(function (c) {
                    if (c.name === 'rightArm') {
                        c.rotation.x = Math.sin(t * Math.PI * 6) * 0.8;
                    }
                });
            }

            /* ── REAL COLLISION CHECK every frame ── */
            if (gamePhase === 'swing') {
                checkBatBallCollision();
            }

            // Ball reached batsman end without being hit
            if (t >= 1 && !ballHit) {
                onBallMissed();
            }
        }

        /* ── Bat swing animation ── */
        if (batSwinging) {
            batSwingAngle += dt * 500;
            var swingFrac = Math.min(batSwingAngle / 130, 1);

            if (batPivot) {
                var eased = swingFrac < 0.5
                    ? 2 * swingFrac * swingFrac
                    : 1 - Math.pow(-2 * swingFrac + 2, 2) / 2;
                batPivot.rotation.z = eased * (Math.PI * 0.75);
                batPivot.rotation.x = eased * -0.3;
            }

            if (batsmanGroup) {
                batsmanGroup.rotation.y = batsmanBaseRotY - swingFrac * 1.2;
            }

            if (batSwingAngle > 130) {
                batSwinging = false;
            }
        }

        /* ── Ball flight after real collision ── */
        if (ballActive && gamePhase === 'flight') {
            ballMesh.position.x += ballVel.x * dt;
            ballMesh.position.y += ballVel.y * dt;
            ballMesh.position.z += ballVel.z * dt;
            ballVel.y -= 18 * dt;

            // Ground bounce
            if (ballMesh.position.y < 0.14) {
                ballMesh.position.y = 0.14;
                ballVel.y *= -0.3;
                ballVel.x *= 0.7;
                ballVel.z *= 0.7;
            }

            // Ball spin
            ballMesh.rotation.x += dt * 12;
            ballMesh.rotation.z += dt * 8;

            // Check boundary
            checkBoundary();

            // Check catch
            if (!boundaryReached) {
                checkCatch();
            }

            // Ball stopped?
            var totalVel = Math.abs(ballVel.x) + Math.abs(ballVel.y) + Math.abs(ballVel.z);
            if (totalVel < 0.5 || Math.abs(ballMesh.position.x) > 50 || Math.abs(ballMesh.position.z) > 50) {
                ballActive = false;
                if (gamePhase === 'flight' && !boundaryReached) {
                    onBallStopped();
                }
            }
        }

        /* ── Result timer ── */
        if (resultTimer > 0 && gamePhase === 'result') {
            resultTimer -= dt * 1000;
            if (resultTimer <= 0) {
                afterResult();
            }
        }

        /* ── Fielder idle animation ── */
        var elapsed = clock.elapsedTime;
        fielders.forEach(function (f, i) {
            f.position.y = Math.sin(elapsed * 1.5 + i * 1.2) * 0.04;
            f.rotation.y += Math.sin(elapsed * 0.5 + i) * 0.001;
        });

        /* ── Camera sway ── */
        camera.position.x = Math.sin(elapsed * 0.3) * 0.25;
        camera.position.y = 2.2 + Math.sin(elapsed * 0.2) * 0.1;
    }

})();
