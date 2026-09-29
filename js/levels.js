/**
 * All puzzle levels live here.
 * To add a level, copy a block and increase the id.
 * Every pair of neighboring words must form a real phrase or compound.
 *
 * Example:
 *   { id: 51, words: ["WORD1", "WORD2", "WORD3", "WORD4", "WORD5"],
 *     links: ["word1 word2", "word2 word3", "word3 word4", "word4 word5"] }
 */
const LEVELS = [
  {
    id: 1,
    words: ["BIRTHDAY", "PARTY", "TIME", "MACHINE", "GUN"],
    links: ["birthday party", "party time", "time machine", "machine gun"]
  },
  {
    id: 2,
    words: ["SCHOOL", "BUS", "STOP", "SIGN", "BOARD"],
    links: ["school bus", "bus stop", "stop sign", "signboard"]
  },
  {
    id: 3,
    words: ["HOME", "WORK", "BOOK", "STORE", "ROOM"],
    links: ["homework", "workbook", "bookstore", "storeroom"]
  },
  {
    id: 4,
    words: ["FOOT", "BALL", "GAME", "OVER", "TIME"],
    links: ["football", "ball game", "game over", "overtime"]
  },
  {
    id: 5,
    words: ["HOME", "PHONE", "CALL", "CENTER", "POINT"],
    links: ["home phone", "phone call", "call center", "center point"]
  },
  {
    id: 6,
    words: ["TEA", "CUP", "CAKE", "SHOP", "OWNER"],
    links: ["tea cup", "cupcake", "cake shop", "shop owner"]
  },
  {
    id: 7,
    words: ["HEAVY", "RAIN", "WATER", "BOTTLE", "CAP"],
    links: ["heavy rain", "rainwater", "water bottle", "bottle cap"]
  },
  {
    id: 8,
    words: ["HELPING", "HAND", "WASH", "ROOM", "MATE"],
    links: ["helping hand", "hand wash", "washroom", "roommate"]
  },
  {
    id: 9,
    words: ["FAMILY", "TREE", "HOUSE", "WORK", "PLACE"],
    links: ["family tree", "treehouse", "housework", "workplace"]
  },
  {
    id: 10,
    words: ["MUSIC", "VIDEO", "CALL", "BACK", "PACK"],
    links: ["music video", "video call", "call back", "backpack"]
  },
  {
    id: 11,
    words: ["WATER", "MELON", "JUICE", "SHOP", "KEEPER"],
    links: ["watermelon", "melon juice", "juice shop", "shopkeeper"]
  },
  {
    id: 12,
    words: ["CAR", "WASH", "ROOM", "SERVICE", "CHARGE"],
    links: ["car wash", "washroom", "room service", "service charge"]
  },
  {
    id: 13,
    words: ["TRAIN", "STATION", "MASTER", "KEY", "CHAIN"],
    links: ["train station", "station master", "master key", "key chain"]
  },
  {
    id: 14,
    words: ["PIZZA", "BOX", "OFFICE", "WORK", "BOOK"],
    links: ["pizza box", "box office", "office work", "workbook"]
  },
  {
    id: 15,
    words: ["HORROR", "MOVIE", "TICKET", "PRICE", "TAG"],
    links: ["horror movie", "movie ticket", "ticket price", "price tag"]
  },
  {
    id: 16,
    words: ["NOTE", "BOOK", "CASE", "STUDY", "GROUP", "PHOTO"],
    links: ["notebook", "book case", "case study", "study group", "group photo"]
  },
  {
    id: 17,
    words: ["TRAFFIC", "LIGHT", "HOUSE", "KEY", "RING"],
    links: ["traffic light", "lighthouse", "house key", "key ring"]
  },
  {
    id: 18,
    words: ["SUN", "ROOF", "TOP", "FLOOR", "PLAN"],
    links: ["sunroof", "rooftop", "top floor", "floor plan"]
  },
  {
    id: 19,
    words: ["CAMP", "FIRE", "ALARM", "CLOCK", "TOWER"],
    links: ["campfire", "fire alarm", "alarm clock", "clock tower"]
  },
  {
    id: 20,
    words: ["NEWS", "PAPER", "PLANE", "TICKET", "OFFICE", "HOURS"],
    links: ["newspaper", "paper plane", "plane ticket", "ticket office", "office hours"]
  },
  {
    id: 21,
    words: ["SCHOOL", "LIFE", "LINE", "UP", "DATE", "SHEET"],
    links: ["school life", "lifeline", "line up", "update", "date sheet"]
  },
  {
    id: 22,
    words: ["CRICKET", "SCORE", "BOARD", "GAME", "SHOW", "ROOM"],
    links: ["cricket score", "scoreboard", "board game", "game show", "showroom"]
  },
  {
    id: 23,
    words: ["HOT", "CHOCOLATE", "MILK", "TEA", "POT", "HOLE"],
    links: ["hot chocolate", "chocolate milk", "milk tea", "teapot", "pothole"]
  },
  {
    id: 24,
    words: ["MOBILE", "INTERNET", "SPEED", "TEST", "MATCH", "POINT"],
    links: ["mobile internet", "internet speed", "speed test", "test match", "match point"]
  },
  {
    id: 25,
    words: ["LUNCH", "BREAK", "FAST", "FOOD", "COURT", "ORDER"],
    links: ["lunch break", "breakfast", "fast food", "food court", "court order"]
  },
  {
    id: 26,
    words: ["COME", "BACK", "HOME", "PAGE", "NUMBER", "PLATE"],
    links: ["come back", "back home", "home page", "page number", "number plate"]
  },
  {
    id: 27,
    words: ["SUMMER", "HOLIDAY", "HOME", "TOWN", "HALL", "WAY"],
    links: ["summer holiday", "holiday home", "hometown", "town hall", "hallway"]
  },
  {
    id: 28,
    words: ["FRUIT", "BASKET", "BALL", "PEN", "DRIVE", "WAY"],
    links: ["fruit basket", "basketball", "ball pen", "pen drive", "driveway"]
  },
  {
    id: 29,
    words: ["ONLINE", "SHOPPING", "MALL", "ROAD", "SIDE", "WALK"],
    links: ["online shopping", "shopping mall", "mall road", "roadside", "sidewalk"]
  },
  {
    id: 30,
    words: ["STREET", "FOOD", "TRUCK", "STOP", "LIGHT", "HOUSE"],
    links: ["street food", "food truck", "truck stop", "stoplight", "lighthouse"]
  },
  {
    id: 31,
    words: ["WRIST", "WATCH", "MAN", "POWER", "BANK", "ACCOUNT", "NUMBER"],
    links: ["wristwatch", "watchman", "manpower", "power bank", "bank account", "account number"]
  },
  {
    id: 32,
    words: ["ANSWER", "KEY", "WORD", "GAME", "SHOW", "TIME", "TABLE"],
    links: ["answer key", "keyword", "word game", "game show", "showtime", "timetable"]
  },
  {
    id: 33,
    words: ["BED", "TIME", "TABLE", "TENNIS", "BALL", "PEN", "NAME"],
    links: ["bedtime", "timetable", "table tennis", "tennis ball", "ball pen", "pen name"]
  },
  {
    id: 34,
    words: ["RAIN", "WATER", "TANK", "TOP", "SECRET", "SERVICE", "STATION"],
    links: ["rainwater", "water tank", "tank top", "top secret", "secret service", "service station"]
  },
  {
    id: 35,
    words: ["ICE", "CREAM", "CHEESE", "BURGER", "KING", "SIZE", "CHART"],
    links: ["ice cream", "cream cheese", "cheeseburger", "burger king", "king size", "size chart"]
  },
  {
    id: 36,
    words: ["GREEN", "TEA", "CUP", "BOARD", "MEETING", "PLACE", "MAT"],
    links: ["green tea", "tea cup", "cupboard", "board meeting", "meeting place", "placemat"]
  },
  {
    id: 37,
    words: ["SPORTS", "CAR", "PARKING", "TICKET", "OFFICE", "WORK", "LOAD"],
    links: ["sports car", "car parking", "parking ticket", "ticket office", "office work", "workload"]
  },
  {
    id: 38,
    words: ["WEATHER", "REPORT", "CARD", "GAME", "NIGHT", "TIME", "ZONE"],
    links: ["weather report", "report card", "card game", "game night", "nighttime", "time zone"]
  },
  {
    id: 39,
    words: ["PAY", "DAY", "LIGHT", "SWITCH", "BOARD", "MEMBER", "SHIP"],
    links: ["payday", "daylight", "light switch", "switchboard", "board member", "membership"]
  },
  {
    id: 40,
    words: ["SWEET", "POTATO", "SALAD", "BAR", "CODE", "WORD", "COUNT"],
    links: ["sweet potato", "potato salad", "salad bar", "barcode", "code word", "word count"]
  },
  {
    id: 41,
    words: ["CITY", "BUS", "STOP", "WATCH", "DOG", "FOOD", "COURT", "YARD"],
    links: ["city bus", "bus stop", "stopwatch", "watchdog", "dog food", "food court", "courtyard"]
  },
  {
    id: 42,
    words: ["SEMI", "FINAL", "EXAM", "PAPER", "WORK", "SHOP", "FLOOR", "PLAN"],
    links: ["semifinal", "final exam", "exam paper", "paperwork", "workshop", "shop floor", "floor plan"]
  },
  {
    id: 43,
    words: ["REAL", "WORLD", "CUP", "FINAL", "MATCH", "BOX", "OFFICE", "BOY"],
    links: ["real world", "world cup", "cup final", "final match", "matchbox", "box office", "office boy"]
  },
  {
    id: 44,
    words: ["GOOD", "MORNING", "NEWS", "PAPER", "CUP", "CAKE", "SHOP", "BOY"],
    links: ["good morning", "morning news", "newspaper", "paper cup", "cupcake", "cake shop", "shop boy"]
  },
  {
    id: 45,
    words: ["PASSPORT", "PHOTO", "COPY", "BOOK", "SHOP", "WINDOW", "SEAT", "BELT"],
    links: ["passport photo", "photocopy", "copybook", "bookshop", "shop window", "window seat", "seat belt"]
  },
  {
    id: 46,
    words: ["OLD", "LADY", "FINGER", "PRINT", "OUT", "SIDE", "WALK", "WAY"],
    links: ["old lady", "lady finger", "fingerprint", "printout", "outside", "sidewalk", "walkway"]
  },
  {
    id: 47,
    words: ["TEXT", "BOOK", "FAIR", "PLAY", "GROUND", "WATER", "BOTTLE", "NECK", "TIE"],
    links: ["textbook", "book fair", "fair play", "playground", "ground water", "water bottle", "bottleneck", "necktie"]
  },
  {
    id: 48,
    words: ["MID", "DAY", "DREAM", "TEAM", "WORK", "OUT", "LINE", "UP", "LOAD"],
    links: ["midday", "daydream", "dream team", "teamwork", "workout", "outline", "line up", "upload"]
  },
  {
    id: 49,
    words: ["SUN", "LIGHT", "HOUSE", "KEY", "BOARD", "GAME", "SHOW", "TIME", "LINE", "MAN"],
    links: ["sunlight", "lighthouse", "house key", "keyboard", "board game", "game show", "showtime", "timeline", "lineman"]
  },
  {
    id: 50,
    words: ["ELECTRIC", "MOTOR", "BIKE", "RACE", "TRACK", "SUIT", "CASE", "STUDY", "ROOM", "SERVICE"],
    links: ["electric motor", "motor bike", "bike race", "race track", "tracksuit", "suitcase", "case study", "study room", "room service"]
  }
];

function getAllLevels() {
  return LEVELS.slice().sort((a, b) => a.id - b.id);
}

function getLevelById(id) {
  return LEVELS.find((level) => level.id === Number(id));
}

function getNextLevelId(id) {
  const sorted = getAllLevels();
  const index = sorted.findIndex((level) => level.id === Number(id));
  if (index === -1 || index === sorted.length - 1) return null;
  return sorted[index + 1].id;
}
