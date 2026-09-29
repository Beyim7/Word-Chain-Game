const App = {
  save: null,
  level: null,
  currentIndex: 1,
  hintCounts: {},
  hintsUsed: 0,
  elapsed: 0,
  timerHandle: null,
  startedAt: 0,
  accepting: false,
  lastWarnSecond: null,
  toastTimer: null,
  typed: "",
  busy: false,

  init() {
    this.save = Storage.load();
    Sounds.init();
    Sounds.setEnabled(this.save.sound);
    this.bind();
    this.bindViewportFix();
    this.updateCoins();
    this.showScreen("menu");
    this.syncSoundToggle();
  },

  /**
   * Keeps --app-height locked to the real visible viewport (visualViewport
   * when available) instead of the static layout viewport, so the game
   * container shrinks to fit above the Android keyboard rather than the
   * whole page being scrolled/panned upward. 100dvh in CSS already covers
   * modern WebViews; this is the fallback/robustness layer for others.
   */
  bindViewportFix() {
    const root = document.documentElement;
    const setHeight = () => {
      const vv = window.visualViewport;
      const h = vv ? vv.height : window.innerHeight;
      root.style.setProperty("--app-height", h + "px");
    };
    setHeight();
    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", setHeight);
      window.visualViewport.addEventListener("scroll", setHeight);
    } else {
      window.addEventListener("resize", setHeight);
    }
    window.addEventListener("orientationchange", () => setTimeout(setHeight, 200));
  },

  bind() {
    document.addEventListener("click", () => Sounds.unlock(), { once: true });
    document.addEventListener("touchstart", () => Sounds.unlock(), { once: true });

    document.querySelectorAll("[data-screen]").forEach((btn) => {
      btn.addEventListener("click", () => {
        Sounds.play("click");
        this.showScreen(btn.getAttribute("data-screen"));
      });
    });

    document.getElementById("btn-play").addEventListener("click", () => {
      Sounds.play("click");
      this.startLevel(this.continueLevelId());
    });

    document.getElementById("btn-hint").addEventListener("click", () => { this.useHint(); this.focusKeys(); });
    this.bindKeys();

    document.getElementById("btn-next-level").addEventListener("click", () => {
      Sounds.play("click");
      const next = getNextLevelId(this.level.id);
      this.hideModals();
      if (next) this.startLevel(next);
      else this.showScreen("levels");
    });

    document.getElementById("btn-complete-menu").addEventListener("click", () => {
      Sounds.play("click");
      this.hideModals();
      this.showScreen("menu");
    });

    document.getElementById("btn-complete-levels").addEventListener("click", () => {
      Sounds.play("click");
      this.hideModals();
      this.showScreen("levels");
    });

    document.getElementById("btn-quit-level").addEventListener("click", () => {
      Sounds.play("click");
      this.stopTimer();
      this.hideModals();
      this.showScreen("menu");
    });

    document.getElementById("sound-toggle").addEventListener("change", (e) => {
      this.save = Storage.load();
      this.save.sound = e.target.checked;
      Storage.save(this.save);
      Sounds.setEnabled(this.save.sound);
      Sounds.play("click");
    });

    document.getElementById("btn-redeem").addEventListener("click", () => {
      Sounds.play("click");
      this.redeemCode();
    });

    document.getElementById("redeem-input").addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        Sounds.play("click");
        this.redeemCode();
      }
    });

    document.getElementById("btn-reset").addEventListener("click", () => {
      Sounds.play("click");
      document.getElementById("reset-modal").classList.add("open");
    });

    document.getElementById("btn-reset-no").addEventListener("click", () => {
      Sounds.play("click");
      document.getElementById("reset-modal").classList.remove("open");
    });

    document.getElementById("btn-reset-yes").addEventListener("click", () => {
      Sounds.play("click");
      this.save = Storage.reset();
      document.getElementById("reset-modal").classList.remove("open");
      this.updateCoins();
      this.syncSoundToggle();
      this.renderLevels();
      this.toast("Progress reset.");
    });
  },

  continueLevelId() {
    this.save = Storage.load();
    const levels = getAllLevels();
    const unfinished = levels.find(
      (lv) => lv.id <= this.save.unlocked && !this.save.completed[lv.id]
    );
    if (unfinished) return unfinished.id;
    const lastUnlocked = levels.filter((lv) => lv.id <= this.save.unlocked).pop();
    return lastUnlocked ? lastUnlocked.id : levels[0].id;
  },

  showScreen(name) {
    this.stopTimer();
    document.querySelectorAll(".screen").forEach((el) => el.classList.remove("active"));
    const screen = document.getElementById("screen-" + name);
    if (screen) screen.classList.add("active");
    this.updateCoins();
    if (name === "levels") this.renderLevels();
    if (name === "menu") this.updateMenuStats();
    if (name === "settings") this.syncSoundToggle();
  },

  syncSoundToggle() {
    this.save = Storage.load();
    document.getElementById("sound-toggle").checked = !!this.save.sound;
  },

  updateCoins() {
    this.save = Storage.load();
    document.querySelectorAll("[data-coins]").forEach((el) => {
      el.textContent = String(this.save.coins);
    });
  },

  updateMenuStats() {
    this.save = Storage.load();
    const done = Object.keys(this.save.completed).filter((id) => this.save.completed[id]).length;
    document.getElementById("menu-progress").textContent =
      done + " / " + getAllLevels().length + " cleared";
    document.getElementById("play-caption").textContent = "Continue level " + this.pad(this.continueLevelId());
  },

  pad(n) {
    return String(n).padStart(2, "0");
  },

  renderLevels() {
    this.save = Storage.load();
    const grid = document.getElementById("level-grid");
    grid.innerHTML = "";
    getAllLevels().forEach((lv) => {
      const unlocked = lv.id <= this.save.unlocked;
      const completed = !!this.save.completed[lv.id];
      const stars = Number(this.save.stars[lv.id] || 0);
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "level-btn" + (unlocked ? "" : " locked") + (completed ? " done" : "");
      const best = this.save.bestTimes[lv.id];
      btn.innerHTML =
        '<span class="level-num">' + this.pad(lv.id) + "</span>" +
        '<span class="level-status">' +
        (completed ? this.starText(stars) : unlocked ? "OPEN" : "LOCKED") +
        "</span>" +
        (completed && typeof best === "number" ? '<span class="level-best">' + this.formatTime(best) + "</span>" : "");
      if (unlocked) {
        btn.addEventListener("click", () => {
          Sounds.play("click");
          this.startLevel(lv.id);
        });
      } else {
        btn.addEventListener("click", () => {
          Sounds.play("wrong");
          this.toast("Finish earlier levels first.");
        });
      }
      grid.appendChild(btn);
    });
  },

  starText(n) {
    return "★".repeat(n) + "☆".repeat(Math.max(0, 3 - n));
  },

  startLevel(id) {
    const level = getLevelById(id);
    if (!level) {
      this.toast("That level does not exist.");
      return;
    }
    this.save = Storage.load();
    if (level.id > this.save.unlocked) {
      this.toast("This level is locked.");
      this.showScreen("levels");
      return;
    }

    this.level = level;
    this.currentIndex = 1;
    this.hintCounts = {};
    this.hintsUsed = 0;
    this.accepting = true;
    this.elapsed = 0;
    this.save.lastPlayed = level.id;
    Storage.save(this.save);

    this.hideModals();
    this.showScreen("game");
    document.getElementById("game-level").textContent = "LEVEL " + this.pad(level.id);
    this.typed = "";
    this.busy = false;
    this.renderChain();
    this.updateHud();
    this.stopTimer();
    this.startedAt = Date.now();
    this.timerHandle = setInterval(() => this.tick(), 250);
    this.focusKeys();
  },

  tick() {
    if (!this.accepting) return;
    this.elapsed = (Date.now() - this.startedAt) / 1000;
    this.updateHud();
  },

  stopTimer() {
    if (this.timerHandle) {
      clearInterval(this.timerHandle);
      this.timerHandle = null;
    }
  },

  formatTime(totalSeconds) {
    const s = Math.max(0, Math.floor(totalSeconds));
    const m = Math.floor(s / 60);
    const r = s % 60;
    return this.pad(m) + ":" + this.pad(r);
  },

  updateHud() {
    document.getElementById("timer-value").textContent = this.formatTime(this.elapsed);
    document.getElementById("hint-cost").textContent = String(CONFIG.HINT_COST);
    this.updateCoins();
  },

  locked() {
    return 1 + (this.hintCounts[this.currentIndex] || 0);
  },

  renderChain() {
    const list = document.getElementById("chain-list");
    list.innerHTML = "";
    this.level.words.forEach((word, index) => {
      const row = document.createElement("div");
      const cur = index === this.currentIndex && this.accepting;
      const solved = index < this.currentIndex;
      row.className = "chain-row" + (cur ? " current" : "") + (solved ? " solved" : "") + (index === 0 ? " start" : "") + (!cur && !solved && index > 0 ? " future" : "");
      row.dataset.i = index;
      row.style.animationDelay = index * 45 + "ms";
      let html = "";
      const hints = this.hintCounts[index] || 0;
      for (let k = 0; k < word.length; k++) {
        let ch = "";
        let cls = "ch";
        if (index === 0 || solved) ch = word[k];
        else if (k <= hints) { ch = word[k]; cls += " given"; }
        else if (cur && k < this.typed.length + 1 + hints) { ch = this.typed[k - 1 - hints]; cls += " typed"; }
        else cls += " blank";
        if (cur && k === hints + 1 + this.typed.length) cls += " caret";
        html += '<span class="' + cls + '">' + (ch ? this.escape(ch) : "_") + "</span>";
      }
      row.innerHTML = '<span class="idx">' + (index === 0 ? "START" : solved ? "✓" : this.pad(index)) + '</span><div class="word">' + html + "</div>";
      list.appendChild(row);
    });
    const c = list.querySelector(".current");
    if (c && c.scrollIntoView) c.scrollIntoView({ block: "center", behavior: "smooth" });
  },

  refreshCurrent(popIndex) {
    const row = document.querySelector('.chain-row[data-i="' + this.currentIndex + '"]');
    if (!row) return;
    const word = this.level.words[this.currentIndex];
    const hints = this.hintCounts[this.currentIndex] || 0;
    const chs = row.querySelectorAll(".ch");
    chs.forEach((el, k) => {
      el.classList.remove("caret");
      if (k > hints) {
        const t = this.typed[k - 1 - hints];
        const had = el.classList.contains("typed");
        el.textContent = t || "_";
        el.classList.toggle("typed", !!t);
        el.classList.toggle("blank", !t);
        if (t && !had) { el.classList.remove("bump"); void el.offsetWidth; el.classList.add("bump"); }
      }
      if (k === hints + 1 + this.typed.length) el.classList.add("caret");
    });
  },

  focusKeys() {
    const el = document.getElementById("key-catcher");
    el.value = "~";
    try { el.focus({ preventScroll: true }); } catch (e) { el.focus(); }
  },

  bindKeys() {
    const el = document.getElementById("key-catcher");
    const active = () => document.getElementById("screen-game").classList.contains("active") && this.accepting && !this.busy;
    document.addEventListener("keydown", (e) => {
      if (!active() || e.ctrlKey || e.metaKey || e.altKey) return;
      if (e.key === "Backspace" || e.key === "Delete") { e.preventDefault(); this.backspace(); }
      else if (e.key === "Enter") { e.preventDefault(); this.check(); }
      else if (/^[a-zA-Z]$/.test(e.key)) { e.preventDefault(); this.addLetter(e.key); }
    });
    el.addEventListener("input", () => {
      const v = el.value;
      el.value = "~";
      if (!active()) return;
      if (v.length === 0) { this.backspace(); return; }
      v.replace(/[^a-zA-Z]/g, "").split("").forEach((ch) => this.addLetter(ch));
    });
    document.getElementById("chain-list").addEventListener("click", () => this.focusKeys());
    document.getElementById("screen-game").addEventListener("click", (e) => {
      if (!e.target.closest("button")) this.focusKeys();
    });
  },

  addLetter(ch) {
    const word = this.level.words[this.currentIndex];
    const room = word.length - this.locked();
    if (this.typed.length >= room) return;
    this.typed += ch.toUpperCase();
    this.refreshCurrent();
    if (this.typed.length === room) {
      this.busy = true;
      setTimeout(() => this.check(), 140);
    }
  },

  backspace() {
    if (!this.typed.length) return;
    this.typed = this.typed.slice(0, -1);
    this.refreshCurrent();
  },

  check() {
    if (!this.accepting || !this.level) return;
    const word = this.level.words[this.currentIndex];
    const room = word.length - this.locked();
    if (this.typed.length !== room) return;
    const guess = word.slice(0, this.locked()) + this.typed;
    if (this.normalize(guess) === this.normalize(word)) this.onCorrect();
    else this.onWrong();
  },

  normalize(value) {
    return String(value || "").trim().replace(/\s+/g, "").toUpperCase();
  },

  onCorrect() {
    Sounds.play("correct");
    const row = document.querySelector('.chain-row[data-i="' + this.currentIndex + '"]');
    if (row) {
      row.querySelectorAll(".ch").forEach((c, k) => { c.textContent = this.level.words[this.currentIndex][k]; });
      row.classList.add("pop");
      this.confetti(row);
    }
    this.typed = "";
    this.currentIndex += 1;
    const done = this.currentIndex >= this.level.words.length;
    setTimeout(() => {
      this.busy = false;
      if (!this.accepting) return;
      this.renderChain();
      this.updateHud();
      if (done) this.onComplete();
    }, done ? 420 : 380);
  },

  onWrong() {
    Sounds.play("wrong");
    const row = document.querySelector('.chain-row[data-i="' + this.currentIndex + '"]');
    if (row) row.classList.add("wrong", "shake");
    setTimeout(() => {
      this.typed = "";
      this.busy = false;
      this.renderChain();
    }, 420);
  },

  confetti(row) {
    const r = row.getBoundingClientRect();
    const host = document.querySelector(".app");
    const colors = ["#7c5cff", "#38e0a5", "#ffd166", "#ff6b8a", "#ffffff"];
    for (let n = 0; n < 16; n++) {
      const p = document.createElement("i");
      p.className = "confetti";
      const a = Math.random() * Math.PI * 2;
      const d = 40 + Math.random() * 70;
      p.style.left = r.left + r.width / 2 + "px";
      p.style.top = r.top + r.height / 2 + "px";
      p.style.background = colors[n % colors.length];
      p.style.setProperty("--x", Math.cos(a) * d + "px");
      p.style.setProperty("--y", Math.sin(a) * d - 20 + "px");
      document.body.appendChild(p);
      setTimeout(() => p.remove(), 750);
    }
  },

  useHint() {
    if (!this.accepting || !this.level) return;
    this.save = Storage.load();
    const word = this.level.words[this.currentIndex];
    const used = this.hintCounts[this.currentIndex] || 0;
    const maxHints = Math.max(0, word.length - 1);
    if (used >= maxHints) {
      this.toast("No more letters to reveal on this word.");
      return;
    }
    if (this.save.coins < CONFIG.HINT_COST) {
      Sounds.play("wrong");
      this.toast("Not enough coins for a hint.");
      return;
    }
    this.save.coins -= CONFIG.HINT_COST;
    Storage.save(this.save);
    this.hintCounts[this.currentIndex] = used + 1;
    this.hintsUsed += 1;
    Sounds.play("hint");
    this.typed = this.typed.slice(0, Math.max(0, word.length - this.locked()));
    this.renderChain();
    const hr = document.querySelector(".chain-row.current");
    if (hr) { hr.classList.add("hinted"); setTimeout(() => hr.classList.remove("hinted"), 500); }
    this.updateHud();
  },

  computeStars() {
    if (this.hintsUsed === 0) return 3;
    if (this.hintsUsed <= CONFIG.STAR2_MAX_HINTS) return 2;
    return 1;
  },

  computeScore() {
    const solved = this.level.words.length - 1;
    const raw = solved * CONFIG.POINTS_PER_WORD - this.hintsUsed * CONFIG.HINT_PENALTY;
    return Math.max(0, raw);
  },

  onComplete() {
    this.accepting = false;
    this.stopTimer();
    const stars = this.computeStars();
    const score = this.computeScore();
    const finalTime = this.elapsed;
    this.save = Storage.load();
    const id = this.level.id;
    const prevStars = Number(this.save.stars[id] || 0);
    const prevScore = Number(this.save.scores[id] || 0);
    const prevBest = this.save.bestTimes[id];
    const isNewBest = typeof prevBest !== "number" || finalTime < prevBest;
    const firstClear = !this.save.completed[id];
    this.save.completed[id] = true;
    this.save.stars[id] = Math.max(prevStars, stars);
    this.save.scores[id] = Math.max(prevScore, score);
    if (isNewBest) this.save.bestTimes[id] = finalTime;
    const next = getNextLevelId(id);
    if (next && this.save.unlocked < next) this.save.unlocked = next;
    if (firstClear) {
      this.save.coins += CONFIG.COINS_PER_LEVEL + stars * CONFIG.COINS_PER_STAR;
    }
    Storage.save(this.save);
    this.updateCoins();
    Sounds.play("complete");

    document.getElementById("complete-stars").textContent = this.starText(stars);
    document.getElementById("complete-score").textContent = String(score);
    document.getElementById("complete-hints").textContent = String(this.hintsUsed);
    document.getElementById("complete-time").textContent = this.formatTime(finalTime);
    document.getElementById("complete-best").textContent = isNewBest ? "NEW BEST TIME! 🎉" : "Best: " + this.formatTime(prevBest);
    document.getElementById("complete-best").classList.toggle("new-best", isNewBest);
    const links = this.level.links || [];
    document.getElementById("complete-links").innerHTML = links
      .map((link, i) => {
        const a = this.level.words[i];
        const b = this.level.words[i + 1];
        return "<li><strong>" + this.escape(a) + "</strong> + <strong>" + this.escape(b) + "</strong> → " + this.escape(link) + "</li>";
      })
      .join("");

    const nextBtn = document.getElementById("btn-next-level");
    if (next) {
      nextBtn.hidden = false;
      nextBtn.textContent = "Next level";
    } else {
      nextBtn.hidden = true;
    }
    document.getElementById("complete-modal").classList.add("open");
    document.getElementById("complete-modal").classList.add("celebrate");
  },

  redeemMessage(text, kind) {
    const el = document.getElementById("redeem-message");
    el.textContent = text;
    el.classList.remove("ok", "bad");
    if (kind) el.classList.add(kind);
  },

  redeemCode() {
    const input = document.getElementById("redeem-input");
    const raw = input.value;
    const entry = findRedeemCode(raw);
    this.save = Storage.load();
    if (!entry) {
      Sounds.play("wrong");
      this.redeemMessage("Invalid Redeem Code", "bad");
      return;
    }
    const normalized = normalizeRedeemCode(raw);
    const already = this.save.redeemedCodes.some((c) => normalizeRedeemCode(c) === normalized);
    if (already) {
      Sounds.play("wrong");
      this.redeemMessage("Code Already Redeemed", "bad");
      return;
    }
    this.save.redeemedCodes.push(normalized);
    this.save.coins += entry.reward;
    Storage.save(this.save);
    this.updateCoins();
    Sounds.play("complete");
    this.redeemMessage("🎉 Code Redeemed! +" + entry.reward + " Coins", "ok");
    input.value = "";
  },

  hideModals() {
    document.querySelectorAll(".modal").forEach((m) => m.classList.remove("open", "celebrate"));
  },

  toast(message) {
    const el = document.getElementById("toast");
    el.textContent = message;
    el.classList.add("show");
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => el.classList.remove("show"), 1800);
  },

  escape(text) {
    return String(text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }
};

document.addEventListener("DOMContentLoaded", () => App.init());
