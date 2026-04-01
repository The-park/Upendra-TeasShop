class HUD {
	constructor(uiLayer) {
		this.uiLayer = uiLayer;
		this.root = uiLayer;
		this._injectStyles();

		this.root.innerHTML = `
  <div id="sbp-bar-wrap" class="sbp-bar-wrap">
    <div id="sbp-lv-left" class="sbp-level-pill">1</div>
    <div class="sbp-progress-shell"><div id="sbp-bar" class="sbp-progress-fill"></div></div>
    <div id="sbp-lv-right" class="sbp-level-pill">2</div>
  </div>

  <div id="sbp-landing-hint" class="sbp-landing-hint">SOFT SPOT</div>
  <div id="sbp-break-mode" class="sbp-break-mode">HOLD TO BREAK</div>

  <div id="sbp-combo-wrap" class="sbp-combo-wrap">
    <div class="sbp-combo-label">COMBO</div>
    <div id="sbp-combo-value" class="sbp-combo-value">x1</div>
  </div>

  <div id="sbp-combo-toast" class="sbp-combo-toast">+3</div>

  <div id="sbp-score-wrap" class="sbp-score-wrap">
    <div class="sbp-score-caption">SCORE</div>
    <div id="sbp-score" class="sbp-score-value">0</div>
  </div>

  <div id="sbp-overlay" class="sbp-overlay"></div>
`;

		this._lvLeft = document.getElementById('sbp-lv-left');
		this._lvRight = document.getElementById('sbp-lv-right');
		this._bar = document.getElementById('sbp-bar');
		this._score = document.getElementById('sbp-score');
		this._overlay = document.getElementById('sbp-overlay');
    this._landingHint = document.getElementById('sbp-landing-hint');
    this._breakMode = document.getElementById('sbp-break-mode');
    this._comboWrap = document.getElementById('sbp-combo-wrap');
    this._comboValue = document.getElementById('sbp-combo-value');
    this._comboToast = document.getElementById('sbp-combo-toast');
    this._landingHintTimer = null;
		this._comboTimer = null;
		this._comboToastTimer = null;
	}

	_injectStyles() {
		if (document.getElementById('sbp-hud-style')) return;

		const style = document.createElement('style');
		style.id = 'sbp-hud-style';
		style.textContent = `
      .sbp-bar-wrap{
        position:absolute;
        top:20px;
        left:50%;
        transform:translateX(-50%);
        display:flex;
        align-items:center;
        gap:12px;
        pointer-events:none;
        z-index:20;
        padding:10px 16px;
        border-radius:999px;
        border:2px solid rgba(255,255,255,0.6);
        background:rgba(255,255,255,0.85);
        box-shadow:0 8px 32px rgba(196,69,105,0.18), 0 4px 16px rgba(255,107,157,0.12);
        backdrop-filter:blur(16px);
        -webkit-backdrop-filter:blur(16px);
        transition:all 0.3s cubic-bezier(0.4,0,0.2,1);
      }

      .sbp-level-pill{
        width:44px;
        height:44px;
        border-radius:50%;
        background:linear-gradient(135deg,#FF6B9D 0%,#FF8DB3 100%);
        color:#FFFFFF;
        display:flex;
        align-items:center;
        justify-content:center;
        font-size:19px;
        font-weight:800;
        letter-spacing:0.5px;
        text-shadow:0 2px 4px rgba(196,69,105,0.3);
        box-shadow:inset 0 2px 4px rgba(255,255,255,0.4), 0 6px 20px rgba(255,107,157,0.35);
        transition:transform 0.2s ease;
      }
      
      .sbp-level-pill:hover{
        transform:scale(1.05);
      }

      .sbp-progress-shell{
        width:200px;
        height:14px;
        border-radius:999px;
        overflow:hidden;
        background:rgba(255,182,193,0.2);
        border:1.5px solid rgba(255,255,255,0.5);
        box-shadow:inset 0 2px 6px rgba(196,69,105,0.1);
      }

      .sbp-progress-fill{
        width:0%;
        height:100%;
        border-radius:999px;
        background:linear-gradient(90deg,#FF6B9D 0%,#FEC260 50%,#FFD700 100%);
        box-shadow:0 0 12px rgba(255,107,157,0.5);
        transition:width 0.4s cubic-bezier(0.4,0,0.2,1);
        position:relative;
      }
      
      .sbp-progress-fill::after{
        content:'';
        position:absolute;
        top:0;
        left:0;
        right:0;
        bottom:0;
        background:linear-gradient(90deg,rgba(255,255,255,0.3),rgba(255,255,255,0));
        border-radius:999px;
        animation:shimmer 2s infinite;
      }
      
      @keyframes shimmer{
        0%{transform:translateX(-100%);}
        100%{transform:translateX(100%);}
      }

      .sbp-score-wrap{
        position:absolute;
        left:50%;
        top:50%;
        transform:translate(-50%,-52%);
        display:flex;
        flex-direction:column;
        align-items:center;
        pointer-events:none;
        z-index:12;
      }

      .sbp-score-caption{
        color:rgba(238,248,255,0.58);
        font-size:12px;
        font-weight:700;
        letter-spacing:3px;
        margin-bottom:5px;
      }

      .sbp-score-value{
        color:rgba(255,255,255,0.24);
        font-size:clamp(64px,13vw,124px);
        font-weight:800;
        letter-spacing:-4px;
        line-height:0.9;
        text-shadow:0 10px 24px rgba(12,24,66,0.22);
        transition:transform 0.12s ease-out;
      }

      .sbp-landing-hint{
        position:absolute;
    		top:84px;
        left:50%;
        transform:translateX(-50%) scale(0.92);
        min-width:132px;
    		padding:8px 18px;
        border-radius:999px;
        border:1px solid rgba(255,255,255,0.3);
        background:rgba(14,22,50,0.42);
        color:#e9f3ff;
        text-align:center;
    		font-size:13px;
        font-weight:800;
        letter-spacing:1.2px;
        opacity:0;
        pointer-events:none;
        z-index:22;
        box-shadow:0 10px 20px rgba(13,24,60,0.35);
        transition:opacity 0.14s ease, transform 0.14s ease, background 0.14s ease, border-color 0.14s ease;
      }

      .sbp-break-mode{
        position:absolute;
        top:124px;
        left:50%;
        transform:translateX(-50%);
        padding:7px 16px;
        border-radius:999px;
        border:1px solid rgba(203,224,255,0.45);
        background:rgba(18,30,62,0.2);
        color:rgba(240,248,255,0.92);
        font-size:11px;
        font-weight:800;
        letter-spacing:1.4px;
        opacity:0.72;
        transition:opacity 0.14s ease, transform 0.14s ease, background 0.14s ease, border-color 0.14s ease;
      }

      .sbp-break-mode.is-active{
        opacity:1;
        transform:translateX(-50%) scale(1.03);
        background:linear-gradient(135deg, rgba(121,245,219,0.34), rgba(118,191,255,0.26));
        border-color:rgba(167,241,226,0.86);
      }

      .sbp-combo-wrap{
        position:absolute;
        right:20px;
        top:20px;
        width:90px;
        border-radius:18px;
        border:2px solid rgba(255,255,255,0.6);
        background:rgba(255,255,255,0.85);
        backdrop-filter:blur(16px);
        box-shadow:0 8px 24px rgba(196,69,105,0.15);
        padding:12px 10px;
        pointer-events:none;
        z-index:20;
        opacity:0.95;
        transition:all 0.3s ease;
      }
      
      .sbp-combo-wrap:hover{
        transform:scale(1.05);
      }

      .sbp-combo-label{
        color:#C44569;
        font-size:11px;
        font-weight:800;
        letter-spacing:1.8px;
        text-align:center;
        text-shadow:0 1px 3px rgba(255,255,255,0.8);
      }

      .sbp-combo-value{
        margin-top:4px;
        color:#FF6B9D;
        font-size:28px;
        font-weight:900;
        line-height:1;
        text-align:center;
        text-shadow:0 4px 12px rgba(255,107,157,0.3);
        transition:transform 0.15s cubic-bezier(0.4,0,0.2,1), color 0.2s ease;
      }

      .sbp-combo-toast{
        position:absolute;
        top:50%;
        left:50%;
        transform:translate(-50%,-82%) scale(0.92);
        padding:10px 18px;
        border-radius:999px;
        border:2px solid rgba(255,215,0,0.7);
        background:linear-gradient(135deg,rgba(255,107,157,0.95),rgba(254,194,96,0.95));
        color:#FFFFFF;
        font-size:18px;
        font-weight:900;
        letter-spacing:1.2px;
        opacity:0;
        pointer-events:none;
        z-index:21;
        box-shadow:0 8px 28px rgba(255,107,157,0.4), 0 0 20px rgba(255,215,0,0.3);
        transition:opacity 0.2s ease, transform 0.2s ease;
      }

      .sbp-overlay{
        position:absolute;
        inset:0;
        display:flex;
        align-items:center;
        justify-content:center;
        pointer-events:none;
        z-index:25;
        background:rgba(255,245,247,0.4);
        backdrop-filter:blur(8px);
        opacity:0;
        transition:opacity 0.4s ease;
      }
      
      .sbp-overlay.show{
        opacity:1;
      }

      .sbp-card{
        width:min(88vw,460px);
        border-radius:28px;
        border:3px solid rgba(255,255,255,0.8);
        background:rgba(255,255,255,0.95);
        box-shadow:0 20px 60px rgba(196,69,105,0.25), 0 8px 32px rgba(255,107,157,0.15);
        backdrop-filter:blur(12px);
        padding:22px 22px 20px;
        color:#f4f8ff;
        text-align:center;
        animation:sbpFloatIn 320ms cubic-bezier(.2,.8,.2,1);
      }

      @keyframes sbpFloatIn{
        0%{opacity:0; transform:translateY(14px) scale(0.98);}
        100%{opacity:1; transform:translateY(0) scale(1);}
      }

      .sbp-title{
        font-family:"Space Grotesk","Segoe UI",sans-serif;
        font-weight:700;
        letter-spacing:1.2px;
        text-transform:uppercase;
      }

      .sbp-chip-row{
        margin-top:16px;
        display:flex;
        justify-content:center;
        gap:10px;
      }

      .sbp-chip{
        padding:7px 12px;
        border-radius:999px;
        border:1px solid rgba(255,255,255,0.25);
        background:rgba(7,12,38,0.22);
        font-size:12px;
        font-weight:700;
        letter-spacing:0.8px;
      }

      .sbp-primary-btn{
        margin-top:16px;
        border:none;
        border-radius:999px;
        padding:12px 24px;
        cursor:pointer;
        color:#072041;
        font-size:15px;
        font-weight:800;
        letter-spacing:1px;
        background:linear-gradient(135deg,#80f0dd,#69c4ff);
        box-shadow:0 8px 18px rgba(27,112,173,0.35);
      }

      @media (max-width:640px){
        .sbp-bar-wrap{top:12px; padding:6px 10px; gap:8px;}
        .sbp-level-pill{width:38px; height:38px; font-size:16px;}
        .sbp-progress-shell{width:156px;}
		.sbp-landing-hint{top:72px; font-size:11px; padding:7px 14px;}
		.sbp-break-mode{top:106px; font-size:10px; padding:6px 13px;}
		.sbp-combo-wrap{top:12px; right:12px; width:78px; padding:7px 7px 6px;}
		.sbp-combo-value{font-size:23px;}
        .sbp-card{width:min(92vw,420px); border-radius:20px; padding:20px 16px 18px;}
      }
    `;

		document.head.appendChild(style);
	}

	showPlayingUI(score, level, total) {
		void total;
		this._lvLeft.textContent = level;
		this._lvRight.textContent = level + 1;
		this._bar.style.width = '0%';
		this._score.textContent = score;
    this.updateCombo(0, 1, 0);
    this.setBreakMode(false);
    if (this._landingHint) {
      this._landingHint.style.opacity = '0';
      this._landingHint.style.transform = 'translateX(-50%) scale(0.92)';
    }
		this._overlay.innerHTML = '';
		this._overlay.style.background = 'transparent';
    this._overlay.style.pointerEvents = 'none';
	}

  showLandingHint(type) {
    if (!this._landingHint) return;

    const isSoft = type === 'soft';
    this._landingHint.textContent = isSoft ? 'SOFT SPOT' : 'HARD SPOT';
    this._landingHint.style.background = isSoft
      ? 'linear-gradient(130deg, rgba(86,242,207,0.32), rgba(88,173,255,0.2))'
      : 'linear-gradient(130deg, rgba(255,199,132,0.3), rgba(68,78,108,0.3))';
    this._landingHint.style.borderColor = isSoft
      ? 'rgba(126,246,225,0.62)'
      : 'rgba(255,214,154,0.64)';
    this._landingHint.style.opacity = '1';
    this._landingHint.style.transform = 'translateX(-50%) scale(1)';

    if (this._landingHintTimer) {
      clearTimeout(this._landingHintTimer);
    }
    this._landingHintTimer = setTimeout(() => {
      this._landingHint.style.opacity = '0';
      this._landingHint.style.transform = 'translateX(-50%) scale(0.94)';
    }, 900);
  }

  setBreakMode(isActive) {
    if (!this._breakMode) return;
    this._breakMode.classList.toggle('is-active', !!isActive);
  }

  updateCombo(count, multiplier = 1, gainedPoints = 0) {
    if (!this._comboWrap || !this._comboValue) return;

    const nextCount = Math.max(0, count | 0);
    const nextMultiplier = Math.max(1, multiplier | 0);
    const active = nextCount > 1;

    this._comboWrap.style.opacity = active ? '1' : '0.84';
    this._comboValue.textContent = `x${nextMultiplier}`;
    this._comboValue.style.color = nextMultiplier >= 3 ? '#fff0c7' : '#ffffff';
    this._comboValue.style.transform = active ? 'scale(1.08)' : 'scale(1)';

    if (this._comboTimer) {
      clearTimeout(this._comboTimer);
    }
    this._comboTimer = setTimeout(() => {
      this._comboValue.style.transform = 'scale(1)';
    }, 140);

    if (gainedPoints > 0 && this._comboToast) {
      this._comboToast.textContent = `+${gainedPoints}`;
      this._comboToast.style.opacity = '1';
      this._comboToast.style.transform = 'translate(-50%,-96%) scale(1)';
      if (this._comboToastTimer) {
        clearTimeout(this._comboToastTimer);
      }
      this._comboToastTimer = setTimeout(() => {
        this._comboToast.style.opacity = '0';
        this._comboToast.style.transform = 'translate(-50%,-82%) scale(0.92)';
      }, 340);
    }
  }

	updateProgress(broken, total, score) {
		const pct = total > 0 ? (broken / total) * 100 : 0;
		this._bar.style.width = pct + '%';
		this._score.textContent = score;
		this._score.style.transform = 'scale(1.08)';
		setTimeout(() => {
			this._score.style.transform = 'scale(1)';
		}, 120);
	}

	showGameOver(score) {
    this._overlay.style.pointerEvents = 'auto';
		this._overlay.style.background = 'rgba(7,11,28,0.34)';
		this._overlay.innerHTML = `
      <div class="sbp-card">
        <div class="sbp-title" style="font-size:40px;color:#ffe5dd;">Level Failed</div>
        <div style="margin-top:10px;font-size:17px;opacity:0.9;">Score</div>
        <div style="font-size:42px;font-weight:800;line-height:1;margin-top:4px;">${score}</div>
        <button id="sbp-retry-btn" class="sbp-primary-btn">Retry</button>
      </div>`;

		const retryBtn = this._overlay.querySelector('#sbp-retry-btn');
		retryBtn?.addEventListener('click', () => {
			window.dispatchEvent(new CustomEvent('game:restart'));
		});
	}

	showLevelComplete(score, level, totalLevels, multiplier = 1) {
    this._overlay.style.pointerEvents = 'auto';
		this._overlay.style.background = 'rgba(7,11,28,0.26)';
		this._overlay.innerHTML = `
      <div class="sbp-card">
        <div class="sbp-title" style="font-size:42px;">Complete</div>
        <div style="margin-top:8px;font-size:17px;font-weight:700;opacity:0.96;">x${multiplier} bonus</div>
        <div style="margin-top:8px;font-size:26px;font-weight:800;">${level}/${totalLevels}</div>
        <div style="margin-top:10px;font-size:24px;font-weight:800;">Score ${score}</div>
        <div style="margin-top:16px;font-size:13px;letter-spacing:2.3px;opacity:0.84;">TAP TO CONTINUE</div>
      </div>`;

		const continueOnce = () => {
			window.dispatchEvent(new CustomEvent('game:next'));
			this._overlay.removeEventListener('pointerdown', continueOnce);
		};
		this._overlay.addEventListener('pointerdown', continueOnce);
	}

	showStartScreen() {
    this._overlay.style.pointerEvents = 'auto';
		this._overlay.style.background = 'rgba(9,14,32,0.24)';
		this._overlay.innerHTML = `
      <div class="sbp-card">
        <div class="sbp-title" style="font-size:52px;line-height:0.92;">Stack Ball</div>
        <div style="margin-top:10px;font-size:14px;letter-spacing:3px;opacity:0.86;">SOFT FLOW . FAST DROP</div>
        <div class="sbp-chip-row">
          <div class="sbp-chip">DRAG TO ROTATE</div>
          <div class="sbp-chip">HOLD TO BREAK</div>
          <div class="sbp-chip">BUILD COMBO</div>
        </div>
        <div style="margin-top:14px;font-size:12px;letter-spacing:2.1px;opacity:0.75;">TAP ANYWHERE TO PLAY</div>
      </div>`;
	}

	flashDanger() {
		const flash = document.createElement('div');
		flash.style.cssText = `
      position:absolute;
      inset:0;
      background:rgba(255,201,130,0.24);
      pointer-events:none;
      opacity:1;
      transition:opacity 0.35s ease-out;
      z-index:30;
    `;
		this.root.appendChild(flash);
		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				flash.style.opacity = '0';
			});
		});
		setTimeout(() => flash.remove(), 450);
	}
}

export { HUD };
export default HUD;
