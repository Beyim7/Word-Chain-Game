/**
 * Redeem codes for bonus coins.
 * Add new codes here — each is redeemable once per device.
 */
const REDEEM_CODES = [
  { code: "WC100-A7K9", reward: 100 },
  { code: "WC100-B4M2", reward: 100 },
  { code: "WC100-C8P5", reward: 100 },
  { code: "WC100-D3R7", reward: 100 },
  { code: "WC100-E9T4", reward: 100 },
  { code: "WC100-F2X8", reward: 100 },
  { code: "WC100-G6L3", reward: 100 },
  { code: "WC100-H5Q9", reward: 100 },
  { code: "WC100-J8N4", reward: 100 },
  { code: "WC100-K3V7", reward: 100 },
  { code: "WC100-L9B2", reward: 100 },
  { code: "WC100-M4D8", reward: 100 },
  { code: "WC100-N7F5", reward: 100 },
  { code: "WC100-P2H6", reward: 100 },
  { code: "WC100-Q8J3", reward: 100 },
  { code: "WC100-R5K9", reward: 100 },
  { code: "WC100-S3M7", reward: 100 },
  { code: "WC100-T6P4", reward: 100 },
  { code: "WC100-U9R2", reward: 100 },
  { code: "WC100-V4X8", reward: 100 },
  { code: "WC100-W7C5", reward: 100 },
  { code: "WC100-X2D9", reward: 100 },
  { code: "WC100-Y8F3", reward: 100 },
  { code: "WC100-Z5G7", reward: 100 },
  { code: "CHAIN-7K4P", reward: 100 },
  { code: "CHAIN-9M2R", reward: 100 },
  { code: "CHAIN-4T8V", reward: 100 },
  { code: "CHAIN-6B3X", reward: 100 },
  { code: "CHAIN-8D5N", reward: 100 },
  { code: "CHAIN-2F9Q", reward: 100 },
  { code: "CHAIN-5H7K", reward: 100 },
  { code: "CHAIN-3J8M", reward: 100 },
  { code: "CHAIN-9L4P", reward: 100 },
  { code: "CHAIN-6N2T", reward: 100 },
  { code: "PUZZLE-7R5X", reward: 100 },
  { code: "PUZZLE-4K9M", reward: 100 },
  { code: "PUZZLE-8B3Q", reward: 100 },
  { code: "PUZZLE-2D6T", reward: 100 },
  { code: "PUZZLE-5F7V", reward: 100 },
  { code: "PUZZLE-9H4X", reward: 100 },
  { code: "PUZZLE-3J8K", reward: 100 },
  { code: "PUZZLE-6M2R", reward: 100 },
  { code: "PUZZLE-4N7P", reward: 100 },
  { code: "PUZZLE-8Q5T", reward: 100 },
  { code: "BONUS-7C3M", reward: 100 },
  { code: "BONUS-9F2K", reward: 100 },
  { code: "BONUS-4H8R", reward: 100 },
  { code: "BONUS-6J5P", reward: 100 },
  { code: "BONUS-2L7X", reward: 100 },
  { code: "BEYIM-6ER6", reward: 100000 }
];

function normalizeRedeemCode(value) {
  return String(value || "").trim().toUpperCase();
}

function findRedeemCode(value) {
  const normalized = normalizeRedeemCode(value);
  return REDEEM_CODES.find((entry) => entry.code.toUpperCase() === normalized) || null;
}
