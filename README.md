# Word Chain

An offline mobile puzzle game. You are given a starting word. Each next word must form a **real phrase or compound** with the word before it.

Example:

`BIRTHDAY → PARTY → TIME → MACHINE → GUN`

- birthday party
- party time
- time machine
- machine gun

The game runs in a browser on Windows. You can later wrap the same files into an Android APK with Capacitor. No internet is required to play.

## Folder structure

```
WordChainGame/
├── index.html
├── style.css
├── js/
│   ├── config.js      timer, coins, scoring (easy to edit)
│   ├── levels.js      all 50 word chains
│   ├── storage.js     save / load progress
│   ├── sounds.js      optional sound files + beep fallback
│   └── game.js        game screens and rules
├── assets/
│   ├── images/
│   └── sounds/
├── scripts/
│   └── copy-www.js    copies the game into www/ for Android
├── capacitor.config.json
├── package.json
└── README.md
```

## How to play on Windows 11

### 1. Required software (for playing in a browser)

- [VS Code](https://code.visualstudio.com/)
- A browser (Chrome, Edge, or Firefox)

You do **not** need Node.js only to play in the browser.

### 2. Open the project in VS Code

1. Install VS Code if it is not installed.
2. Open VS Code.
3. Choose **File → Open Folder**.
4. Select this folder: `C:\Users\kshah\WordChainGame`
5. Open `index.html`.

### 3. Run the game

**Easiest method**

1. In VS Code, install the extension **Live Server** (by Ritwick Dey).
2. Right-click `index.html`.
3. Choose **Open with Live Server**.
4. The game opens in your browser.

**Other method**

Double-click `index.html`. If progress does not save, use Live Server instead. Some browsers restrict saving on `file://` pages.

### 4. How to test

Check these in order:

1. **Main menu** — Play, Levels, Settings, About all open the right screen.
2. **Play** — starts the first unlocked unfinished level.
3. **Level 1** — start word is BIRTHDAY. Type `party` (any capitalization). It should accept it.
4. Wrong word — the box shakes and does not reveal the answer.
5. You cannot skip ahead to later words.
6. Hint — reveals one extra letter and subtracts coins.
7. Timer — counts down. At 0 you see Time’s Up and Retry.
8. Finish the chain — stars, score, and the phrase list appear. Level 2 unlocks.
9. Close the tab, open the game again — coins, unlocks, and stars are still there.
10. Settings → sound off — no beeps. Reset progress — back to Level 1.

Resize the browser to phone width (about 390px) to preview the mobile layout.

## Adding more levels

Open `js/levels.js` and add another object. Do not skip the phrase check.

```javascript
{
  id: 51,
  words: ["WORD1", "WORD2", "WORD3", "WORD4", "WORD5"],
  links: ["word1 word2", "word2 word3", "word3 word4", "word4 word5"]
}
```

Save the file and refresh the browser. The new level appears automatically. It stays locked until the previous level is cleared.

**Rule:** Word 1 + Word 2 must be a real phrase, Word 2 + Word 3 must be a real phrase, and so on.

## Changing timer, hints, and score

Edit `js/config.js` and refresh.

- `TIMER_SECONDS` — time for levels 1–10, 11–20, 21–30, 31–40, 41–50
- `HINT_COST` — coins spent per extra letter
- `STARTING_COINS`
- `POINTS_PER_WORD`, `TIME_BONUS`, `HINT_PENALTY`
- star thresholds: `STAR3_TIME_FRACTION`, `STAR2_MAX_HINTS`, `STAR2_TIME_FRACTION`

## Optional sound files

Place MP3 files in `assets/sounds/` with these names:

- `click.mp3`
- `correct.mp3`
- `wrong.mp3`
- `hint.mp3`
- `complete.mp3`
- `warning.mp3`

If a file is missing, the game uses a short beep instead.

## Android APK (Windows 11)

Follow these steps in order the first time. After that you only repeat the build steps.

### 5. Required software for APK builds

Install these:

1. [Node.js LTS](https://nodejs.org/) (includes npm)
2. [JDK 17](https://adoptium.net/) (Temurin 17)
3. [Android Studio](https://developer.android.com/studio)
4. VS Code (already used above)

During Android Studio setup, install:

- Android SDK
- Android SDK Platform-Tools
- Android SDK Build-Tools
- At least one Android platform (for example Android 14 / API 34)
- Android Emulator (optional)

### 6. Installation checks

Open **Windows PowerShell** and run:

```powershell
node -v
npm -v
java -version
```

You should see version numbers, not an error.

If `java` is not found, install JDK 17 and set `JAVA_HOME`:

1. Search Windows for **Environment Variables**.
2. Under System variables, add `JAVA_HOME` pointing to the JDK folder, for example:
   `C:\Program Files\Eclipse Adoptium\jdk-17...`
3. Edit `Path` and add `%JAVA_HOME%\bin`.
4. Close and reopen PowerShell, then run `java -version` again.

### 7. VS Code setup for Android

1. Open the `WordChainGame` folder.
2. Open the built-in Terminal: **Terminal → New Terminal**.
3. Use that terminal for the commands below.

### 8. Project setup for Capacitor

In the VS Code terminal:

```powershell
cd C:\Users\kshah\WordChainGame
npm install @capacitor/core @capacitor/cli @capacitor/android
npm run cap:sync
```

The first `cap:sync` copies the game into `www` and prepares Android files.

If Android has not been added yet, run:

```powershell
npx cap add android
npm run cap:sync
```

### 9. Configure Capacitor

The file `capacitor.config.json` is already set:

- App id: `com.wordchain.puzzle`
- App name: `Word Chain`
- Web folder: `www`

Change the app id only if you need a different package name. Then run `npx cap sync android` again.

### 10. Open Android Studio and install the SDK if needed

```powershell
npx cap open android
```

Android Studio opens this project. The first time it may download Gradle and SDK pieces. Wait until it finishes.

If it asks to install missing SDK platforms, click **Install**.

### 11. How to build the APK

In Android Studio:

1. Wait until the bottom status bar finishes Gradle sync.
2. Menu: **Build → Build Bundle(s) / APK(s) → Build APK(s)**.
3. When it says the APK is ready, click **locate**.

You can also use the command line from the project folder:

```powershell
cd android
.\gradlew assembleDebug
```

### 12. Where the APK is generated

Debug APK:

`C:\Users\kshah\WordChainGame\android\app\build\outputs\apk\debug\app-debug.apk`

That file is what you copy to your phone.

### 13. Transfer it to an Android phone

Pick one:

- USB cable: copy `app-debug.apk` into the phone’s Download folder.
- Email or messaging: send the APK to yourself and open it on the phone.
- Google Drive / USB stick.

### 14. Install it

On the phone:

1. Open **Settings → Security** (wording varies) and allow **Install unknown apps** for Files, Chrome, or Drive.
2. Tap `app-debug.apk`.
3. Tap **Install**.
4. Open **Word Chain**.

### 15. Play completely offline

After install:

1. Turn on Airplane mode.
2. Open the app.
3. Play any unlocked level.

Levels, timer, hints, coins, and saves all live on the device. There is no login and no server.

---

After you change HTML, CSS, JS, or levels, rebuild like this:

```powershell
cd C:\Users\kshah\WordChainGame
npm run cap:sync
```

Then in Android Studio: **Build → Build APK(s)** again.

## Release APK (optional, for sharing more widely)

In Android Studio:

1. **Build → Generate Signed App Bundle or APK**.
2. Choose APK.
3. Create a new keystore if you do not have one. Store the password somewhere safe.
4. Choose **release**.
5. The signed APK appears under:

`android\app\build\outputs\apk\release\`

## Troubleshooting

- **Progress did not save in the browser:** use Live Server, not a double-clicked file.
- **`npx cap add android` fails:** install Node.js LTS and JDK 17, then retry.
- **Gradle / SDK errors:** open the project with `npx cap open android` and install the components Android Studio requests.
- **Phone blocks the APK:** allow installs from that app (Files / Chrome) and use the debug APK above.
- **Sound is silent:** turn sound on in Settings. Files in `assets/sounds/` are optional.

## Credits

Word chains use common English compounds and phrases. Add new levels in `js/levels.js` using the same adjacent-phrase rule.
