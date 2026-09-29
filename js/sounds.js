/**
 * Plays optional files from assets/sounds/.
 * If a file is missing, a short generated beep is used instead.
 * The game never requires the internet or sound files.
 */
const Sounds = {
  files: {
    click: "assets/sounds/click.mp3",
    correct: "assets/sounds/correct.mp3",
    wrong: "assets/sounds/wrong.mp3",
    hint: "assets/sounds/hint.mp3",
    complete: "assets/sounds/complete.mp3",
    warning: "assets/sounds/warning.mp3"
  },
  audio: {},
  ready: {},
  ctx: null,
  warnedTimer: false,

  init() {
    Object.keys(this.files).forEach((name) => {
      const el = new Audio();
      el.preload = "auto";
      el.src = this.files[name];
      el.addEventListener("canplaythrough", () => {
        this.ready[name] = true;
      });
      el.addEventListener("error", () => {
        this.ready[name] = false;
      });
      this.audio[name] = el;
    });
  },

  setEnabled(on) {
    if (!on) {
      this.stopAll();
    }
  },

  stopAll() {
    Object.keys(this.audio).forEach((name) => {
      try {
        this.audio[name].pause();
        this.audio[name].currentTime = 0;
      } catch (err) {}
    });
  },

  unlock() {
    try {
      if (!this.ctx) {
        const AC = window.AudioContext || window.webkitAudioContext;
        if (AC) this.ctx = new AC();
      }
      if (this.ctx && this.ctx.state === "suspended") {
        this.ctx.resume();
      }
    } catch (err) {}
  },

  play(name) {
    const save = Storage.load();
    if (!save.sound) return;
    this.unlock();
    if (this.ready[name] && this.audio[name]) {
      try {
        const el = this.audio[name];
        el.currentTime = 0;
        const p = el.play();
        if (p && typeof p.catch === "function") p.catch(() => this.beep(name));
        return;
      } catch (err) {
        this.beep(name);
        return;
      }
    }
    this.beep(name);
  },

  beep(name) {
    if (!this.ctx) return;
    const map = {
      click: [420, 0.05, "square", 0.04],
      correct: [660, 0.12, "sine", 0.07],
      wrong: [180, 0.16, "sawtooth", 0.06],
      hint: [520, 0.1, "triangle", 0.05],
      complete: [784, 0.28, "sine", 0.08],
      warning: [240, 0.18, "square", 0.06]
    };
    const spec = map[name] || map.click;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = spec[2];
      osc.frequency.value = spec[0];
      gain.gain.value = spec[3];
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + spec[1]);
      osc.stop(this.ctx.currentTime + spec[1] + 0.02);
      if (name === "complete") {
        setTimeout(() => this.tone(988, 0.18, "sine", 0.07), 120);
      }
    } catch (err) {}
  },

  tone(freq, dur, type, vol) {
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.value = freq;
      gain.gain.value = vol;
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + dur);
      osc.stop(this.ctx.currentTime + dur + 0.02);
    } catch (err) {}
  }
};
