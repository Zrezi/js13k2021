// Constants
const windowWidth = 640;
const windowHeight = 480;

// Function shortcuts
const getElementById = document.getElementById.bind(document);
const getContext = (c)=>c.getContext('2d');

// Canvas Elements
const canvas_ui = getElementById("ui");
const canvas_fg = getElementById("fg");
const canvas_bg = getElementById("bg");
[canvas_ui, canvas_fg, canvas_bg].forEach(c => { c.width = windowWidth; c.height = windowHeight });

// Context variables
const ctx_ui = getContext(canvas_ui);
const ctx_fg = getContext(canvas_fg);
const ctx_bg = getContext(canvas_bg);

