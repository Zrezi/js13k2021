const fs = require('fs');
const uglifyjs = require('uglify-js');
const uglifycss = require('uglifycss');
const admzip = require('adm-zip');

if (!fs.existsSync("game_min")) {
    fs.mkdirSync("game_min");
}

fs.copyFileSync("game/index.html", "game_min/index.html");

let code = fs.readFileSync("game/main.js", "utf8");
let minifiedCode = uglifyjs.minify(code, { mangle: { toplevel: true } }).code;
fs.writeFileSync("game_min/main.js", minifiedCode, "utf8");

let css = fs.readFileSync("game/style.css", "utf8");
let minifiedCSS = uglifycss.processString(css, {});
fs.writeFileSync("game_min/style.css", minifiedCSS, "utf8");

let zipFile = new admzip();
zipFile.addLocalFolder("game_min");
zipFile.writeZip("game.zip");

fs.rmdirSync("game_min", { recursive: true });