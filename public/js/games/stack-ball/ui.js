// Stack Ball Game - UI
// HUD manipulation, overlays, score display

const scoreEl = document.getElementById('stackball-score');
const barFill = document.getElementById('stackball-bar-fill');
const lvlFrom = document.getElementById('stackball-lvl-from');
const lvlTo = document.getElementById('stackball-lvl-to');
const overlay = document.getElementById('stackball-overlay');
const gameoverEl = document.getElementById('stackball-gameover');
const goScore = document.getElementById('stackball-go-score');

let popTimeout;

export function setScore(n) {
  if (!scoreEl) return;
  scoreEl.textContent = n;
  // Restart pop animation
  scoreEl.classList.remove('pop');
  void scoreEl.offsetWidth;          // force reflow
  scoreEl.classList.add('pop');
  clearTimeout(popTimeout);
  popTimeout = setTimeout(() => scoreEl.classList.remove('pop'), 150);
}

export function setProgress(pct) {
  if (!barFill) return;
  barFill.style.width = Math.min(pct, 100) + '%';
}

export function setLevel(n) {
  if (!lvlFrom || !lvlTo) return;
  lvlFrom.textContent = n;
  lvlTo.textContent = n + 1;
}

export function setTheme(hex) {
  document.documentElement.style.setProperty('--stackball-theme', hex);
}

export function showStart() {
  if (!overlay || !gameoverEl) return;
  overlay.classList.remove('hidden');
  overlay.classList.add('show');
  gameoverEl.classList.remove('show');
  gameoverEl.classList.add('hidden');
}

export function showGameOver(finalScore) {
  if (!goScore || !gameoverEl || !overlay) return;
  goScore.textContent = finalScore;
  gameoverEl.classList.remove('hidden');
  gameoverEl.classList.add('show');
  overlay.classList.remove('show');
  overlay.classList.add('hidden');
}

export function hideAll() {
  if (!overlay || !gameoverEl) return;
  overlay.classList.remove('show');
  overlay.classList.add('hidden');
  gameoverEl.classList.remove('show');
  gameoverEl.classList.add('hidden');
}

export function flashMultiplier(value) {
  let el = document.getElementById('stackball-multiplier-toast');
  if (!el) {
    el = document.createElement('div');
    el.id = 'stackball-multiplier-toast';
    document.body.appendChild(el);
  }
  el.textContent = `×${value}`;
  el.classList.remove('show');
  void el.offsetWidth;
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 900);
}
