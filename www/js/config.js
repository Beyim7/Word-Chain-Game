/**
 * Easy-to-change game settings.
 * Edit the numbers in this file, save, then refresh the game.
 */
const CONFIG = {
  STARTING_COINS: 80,
  HINT_COST: 15,
  COINS_PER_LEVEL: 20,
  COINS_PER_STAR: 10,

  /** Score = (solved words * this) - (hints * HINT_PENALTY). No time limit — time is only recorded as a best time. */
  POINTS_PER_WORD: 100,
  HINT_PENALTY: 25,

  /** Star rules based on hints used: 3 = no hints, 2 = at most this many hints, else 1. */
  STAR2_MAX_HINTS: 2,

  STORAGE_KEY: "wordchain-save-v1",
  DEFAULT_SOUND: true
};

