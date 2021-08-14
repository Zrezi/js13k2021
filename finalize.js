const fs = require('fs');
const uglify = require('uglify-js');

let code = fs.readFileSync("main.js", "utf8");
let minifiedCode = uglify.minify(code, { mangle: { toplevel: true } }).code;

fs.writeFileSync("main_min.js", minifiedCode, "utf8");