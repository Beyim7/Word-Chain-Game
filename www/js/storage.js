const Storage = {
  defaultSave() {
    return {
      unlocked: 1,
      completed: {},
      stars: {},
      scores: {},
      bestTimes: {},
      redeemedCodes: [],
      coins: CONFIG.STARTING_COINS,
      sound: CONFIG.DEFAULT_SOUND,
      lastPlayed: 1
    };
  },

  load() {
    try {
      const raw = localStorage.getItem(CONFIG.STORAGE_KEY);
      if (!raw) {
        const fresh = this.defaultSave();
        this.save(fresh);
        return fresh;
      }
      const data = JSON.parse(raw);
      const base = this.defaultSave();
      return {
        unlocked: Number(data.unlocked) || 1,
        completed: data.completed && typeof data.completed === "object" ? data.completed : {},
        stars: data.stars && typeof data.stars === "object" ? data.stars : {},
        scores: data.scores && typeof data.scores === "object" ? data.scores : {},
        bestTimes: data.bestTimes && typeof data.bestTimes === "object" ? data.bestTimes : {},
        redeemedCodes: Array.isArray(data.redeemedCodes) ? data.redeemedCodes : [],
        coins: typeof data.coins === "number" ? data.coins : CONFIG.STARTING_COINS,
        sound: typeof data.sound === "boolean" ? data.sound : CONFIG.DEFAULT_SOUND,
        lastPlayed: Number(data.lastPlayed) || 1
      };
    } catch (err) {
      return this.defaultSave();
    }
  },

  save(data) {
    try {
      localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(data));
    } catch (err) {
      /* Private mode / blocked storage: game still runs for this session. */
    }
  },

  reset() {
    const fresh = this.defaultSave();
    this.save(fresh);
    return fresh;
  }
};
