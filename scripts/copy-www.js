const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const www = path.join(root, "www");

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const from = path.join(src, entry.name);
    const to = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(from, to);
    else fs.copyFileSync(from, to);
  }
}

if (fs.existsSync(www)) fs.rmSync(www, { recursive: true, force: true });
fs.mkdirSync(www);

fs.copyFileSync(path.join(root, "index.html"), path.join(www, "index.html"));
fs.copyFileSync(path.join(root, "style.css"), path.join(www, "style.css"));
copyDir(path.join(root, "js"), path.join(www, "js"));
copyDir(path.join(root, "assets"), path.join(www, "assets"));

console.log("Copied game files into the www folder for Capacitor.");
