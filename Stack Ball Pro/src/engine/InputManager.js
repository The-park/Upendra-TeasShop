class InputManager {
	constructor(canvas) {
		this.canvas = canvas;
		this.isPointerDown = false;
		this.isDragging = false;
		this.activePointerId = null;
		this.lastX = 0;
		this._deltaX = 0;
		this.sensitivity = 0.005;
		this.inertia = 0;
		this.inertiaDamping = 0.88;
		this._indicatorHideTimer = null;

		this.rotationIndicator = document.createElement('div');
		this.rotationIndicator.style.cssText = `
			position:fixed;
			left:50%;
			top:58%;
			transform:translate(-50%,-50%) scale(0.9);
			width:70px;
			height:70px;
			border:3px solid rgba(244,67,54,0.9);
			border-radius:50%;
			display:flex;
			align-items:center;
			justify-content:center;
			color:rgba(244,67,54,0.95);
			font-size:30px;
			font-weight:900;
			opacity:0;
			pointer-events:none;
			z-index:40;
			transition:opacity 0.15s ease, transform 0.15s ease;
		`;
		this.rotationIndicator.textContent = '↻';
		document.body.appendChild(this.rotationIndicator);

		this._onPointerDown = this._onPointerDown.bind(this);
		this._onPointerMove = this._onPointerMove.bind(this);
		this._onPointerUp = this._onPointerUp.bind(this);
		this._onPointerCancel = this._onPointerCancel.bind(this);
		this._onKeyDown = this._onKeyDown.bind(this);
		this._onWindowBlur = this._onWindowBlur.bind(this);

		window.addEventListener('pointerdown', this._onPointerDown, { passive: true });
		window.addEventListener('pointermove', this._onPointerMove, { passive: false });
		window.addEventListener('pointerup', this._onPointerUp);
		window.addEventListener('pointercancel', this._onPointerCancel);

		window.addEventListener('keydown', this._onKeyDown);
		window.addEventListener('blur', this._onWindowBlur);
	}

	_onPointerDown(event) {
		if (event.pointerType === 'mouse' && event.button !== 0) {
			return;
		}

		if (!this._isFromCanvasEvent(event)) {
			return;
		}

		this.activePointerId = event.pointerId ?? null;
		this.isPointerDown = true;
		this.isDragging = true;
		this.lastX = event.clientX;
		this.inertia = 0;
	}

	_onPointerMove(event) {
		if (this.activePointerId !== null && event.pointerId !== this.activePointerId) {
			return;
		}

		if (event.pointerType === 'mouse' && this.isDragging && (event.buttons & 1) === 0) {
			this._clearPointerState();
			return;
		}

		if (!this.isDragging) {
			return;
		}

		const raw = (event.clientX - this.lastX) * this.sensitivity;
		this._deltaX = raw;
		this.inertia = raw;
		this.lastX = event.clientX;
		if (Math.abs(raw) > 0.0001) {
			this._showRotationIndicator(raw > 0 ? 1 : -1);
		}
	}

	_onPointerUp(event) {
		if (event.pointerType === 'mouse' && event.button !== 0) {
			return;
		}

		if (this.activePointerId !== null && event.pointerId !== this.activePointerId) {
			return;
		}

		this._clearPointerState();
	}

	_onPointerCancel() {
		this._clearPointerState();
	}

	_onKeyDown(event) {
		if (event.key === 'ArrowLeft') {
			this.inertia = -0.05;
			this._showRotationIndicator(-1);
		}

		if (event.key === 'ArrowRight') {
			this.inertia = 0.05;
			this._showRotationIndicator(1);
		}
	}

	_onWindowBlur() {
		this._clearPointerState();
	}

	_isFromCanvasEvent(event) {
		if (!this.canvas || !event) {
			return true;
		}

		const clientX = typeof event.clientX === 'number' ? event.clientX : null;
		const clientY = typeof event.clientY === 'number' ? event.clientY : null;
		if (typeof clientX === 'number' && typeof clientY === 'number') {
			const rect = this.canvas.getBoundingClientRect();
			return (
				clientX >= rect.left &&
				clientX <= rect.right &&
				clientY >= rect.top &&
				clientY <= rect.bottom
			);
		}

		return true;
	}

	_clearPointerState() {
		this.isPointerDown = false;
		this.isDragging = false;
		this.activePointerId = null;
		this._deltaX = 0;
	}

	cancelPress() {
		this._clearPointerState();
	}

	_showRotationIndicator(direction) {
		if (!this.rotationIndicator) return;
		this.rotationIndicator.textContent = direction > 0 ? '↻' : '↺';
		this.rotationIndicator.style.opacity = '1';
		this.rotationIndicator.style.transform = 'translate(-50%,-50%) scale(1)';
		if (this._indicatorHideTimer) {
			clearTimeout(this._indicatorHideTimer);
		}
		this._indicatorHideTimer = setTimeout(() => {
			this.rotationIndicator.style.opacity = '0';
			this.rotationIndicator.style.transform = 'translate(-50%,-50%) scale(0.9)';
		}, 180);
	}

	update() {
		if (!this.isDragging) {
			this.inertia *= this.inertiaDamping;
		}

		if (Math.abs(this.inertia) < 0.0001) {
			this.inertia = 0;
		}

		this._deltaX = this.isDragging ? this._deltaX : this.inertia;
	}

	get rotation() {
		return this._deltaX;
	}

	get isPressing() {
		return this.isPointerDown;
	}
}

export { InputManager };
export default InputManager;
