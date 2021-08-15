const fs = require("fs");
const uglifyjs = require("uglify-js");
const uglifycss = require("uglifycss");
const admzip = require("adm-zip");

if (!fs.existsSync("game_min")) {
  fs.mkdirSync("game_min");
}

if (!fs.existsSync("game_min/img")) {
    fs.mkdirSync("game_min/img");
}

fs.copyFileSync("game/index.html", "game_min/index.html");
fs.copyFileSync("game/img/car.png", "game_min/img/car.png");
fs.copyFileSync("game/img/oldcar.png", "game_min/img/oldcar.png");
fs.copyFileSync("game/img/road.png", "game_min/img/road.png");
fs.copyFileSync("game/img/van.png", "game_min/img/van.png");

let code = fs.readFileSync("game/main.js", "utf8");
let minifiedCode = uglifyjs.minify(code, { mangle: { toplevel: true } }).code;
fs.writeFileSync("game_min/main.js", minifiedCode, "utf8");
console.log(`Original JS Source: ${code.length}`);
console.log(`Minified JS Source: ${minifiedCode.length}`);

let css = fs.readFileSync("game/style.css", "utf8");
let minifiedCSS = uglifycss.processString(css, {});
fs.writeFileSync("game_min/style.css", minifiedCSS, "utf8");
console.log(`Original CSS Source: ${css.length}`);
console.log(`Minified CSS Source: ${minifiedCSS.length}`);

let zipFile = new admzip();
zipFile.addLocalFolder("game_min");
zipFile.writeZip("game.zip");

// fs.rmdirSync("game_min", { recursive: true });
