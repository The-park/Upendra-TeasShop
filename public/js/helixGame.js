/*
  Simple helix-like mini-game placeholder.
  - Shows a stack of colored rings
  - Clicking/tapping removes the top visible ring with a small animation
  - Auto-starts when invoked via HelixGame.show() and HelixGame.start()
  This is intentionally lightweight and self-contained.
*/
(function (global) {
    const HelixGame = {
        overlay: null,
        canvas: null,
        ctx: null,
        width: 0,
        height: 0,
        layers: [],
        animId: null,
        running: false,
        score: 0,

        show() {
            if (this.overlay) return;
            this.overlay = document.createElement('div');
            this.overlay.id = 'helix-overlay';
            this.overlay.innerHTML = `
                <div id="helix-container">
                    <canvas id="helix-canvas"></canvas>
                    <div id="helix-hud">
                        <div id="helix-score">0</div>
                        <button id="helix-close">Close</button>
                    </div>
                    <div id="helix-instruction">Tap to smash</div>
                </div>
            `;
            document.body.appendChild(this.overlay);

            this.canvas = document.getElementById('helix-canvas');
            this.ctx = this.canvas.getContext('2d');
            this.resize();

            window.addEventListener('resize', () => this.resize());

            document.getElementById('helix-close').addEventListener('click', () => this.hide());
            this.overlay.addEventListener('click', (e) => {
                // prevent clicks on close button
                if (e.target && e.target.id === 'helix-close') return;
                this.smashTop();
            });
        },

        hide() {
            this.running = false;
            cancelAnimationFrame(this.animId);
            if (this.overlay && this.overlay.parentNode) this.overlay.parentNode.removeChild(this.overlay);
            this.overlay = null;
            this.canvas = null;
            this.ctx = null;
        },

        resize() {
            if (!this.canvas) return;
            this.width = Math.min(window.innerWidth, 420);
            this.height = Math.min(window.innerHeight * 0.75, 800);
            this.canvas.width = this.width * devicePixelRatio;
            this.canvas.height = this.height * devicePixelRatio;
            this.canvas.style.width = this.width + 'px';
            this.canvas.style.height = this.height + 'px';
            this.ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
        },

        start() {
            // build simple layers resembling the helix blocks
            const layerCount = 18;
            this.layers = [];
            const colors = ['#ffcc00','#00cc66','#00aaff','#ff5c5c','#b3ff66','#9966ff'];
            for (let i = 0; i < layerCount; i++) {
                this.layers.push({
                    id: i,
                    color: colors[i % colors.length],
                    removed: false,
                    angle: Math.random() * Math.PI * 2
                });
            }
            this.score = 0;
            this.running = true;
            this.loop();
            this.updateScore();
        },

        smashTop() {
            // find top-most non-removed layer (highest index)
            for (let i = 0; i < this.layers.length; i++) {
                const layer = this.layers[i];
                if (!layer.removed) {
                    layer.removed = true;
                    this.score += 10;
                    this.updateScore();
                    // small pop animation: store a temp property
                    layer.pop = 1.6;
                    // if all removed, win
                    if (this.layers.every(l => l.removed)) {
                        this.finish(true);
                    }
                    break;
                }
            }
        },

        updateScore() {
            const el = document.getElementById('helix-score');
            if (el) el.textContent = this.score;
        },

        finish(won) {
            this.running = false;
            cancelAnimationFrame(this.animId);
            const instr = document.getElementById('helix-instruction');
            if (instr) instr.textContent = won ? 'Level Completed!' : 'Game Over';
            setTimeout(() => {
                // auto-hide after short delay
                this.hide();
            }, 1400);
        },

        loop() {
            if (!this.running) return;
            const ctx = this.ctx;
            const w = this.width;
            const h = this.height;
            ctx.clearRect(0,0,w,h);

            // draw stack from bottom to top
            const baseY = h * 0.85;
            const layerHeight = Math.min(28, h / 24);
            for (let i = this.layers.length - 1; i >= 0; i--) {
                const layer = this.layers[i];
                const y = baseY - (i * (layerHeight + 6));
                // rotation for visual effect
                layer.angle += ( (i % 2 === 0) ? 0.01 : -0.012 );

                // if removed, animate pop
                let scale = 1;
                if (layer.pop) {
                    scale = layer.pop;
                    layer.pop -= 0.08;
                    if (layer.pop <= 1) layer.pop = 0;
                }

                ctx.save();
                ctx.translate(w/2, y);
                ctx.rotate(layer.angle);
                ctx.scale(scale, scale);

                if (!layer.removed) {
                    // draw ring as rounded rect long bar
                    ctx.fillStyle = layer.color;
                    ctx.beginPath();
                    const lw = Math.max(160, w * 0.7);
                    const lh = layerHeight;
                    const rx = -lw/2;
                    const ry = -lh/2;
                    this.roundRect(ctx, rx, ry, lw, lh, 8);
                    ctx.fill();
                    // draw small gap as black rectangle to mimic break spots
                    ctx.fillStyle = '#111';
                    ctx.fillRect(lw*0.12, -lh/2, lw*0.12, lh);
                } else {
                    // faded piece flying off
                    ctx.fillStyle = 'rgba(0,0,0,0.08)';
                    ctx.beginPath();
                    const lw = Math.max(160, w * 0.7);
                    const lh = layerHeight;
                    this.roundRect(ctx, -lw/2, -lh/2, lw, lh, 8);
                    ctx.fill();
                }

                ctx.restore();
            }

            // Draw the ball at center-top area
            const ballX = w/2;
            const ballY = h*0.28;
            ctx.beginPath();
            ctx.fillStyle = '#1ea7ff';
            ctx.arc(ballX, ballY, 14, 0, Math.PI*2);
            ctx.fill();

            // simple particle sparks when score increases (omitted)

            this.animId = requestAnimationFrame(() => this.loop());
        },

        roundRect(ctx, x, y, width, height, radius) {
            ctx.moveTo(x + radius, y);
            ctx.arcTo(x + width, y, x + width, y + height, radius);
            ctx.arcTo(x + width, y + height, x, y + height, radius);
            ctx.arcTo(x, y + height, x, y, radius);
            ctx.arcTo(x, y, x + width, y, radius);
            ctx.closePath();
        }
    };

    global.HelixGame = HelixGame;
})(window);
