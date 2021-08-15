// Constants
const windowWidth = 640;
const windowHeight = 480;
const scale = 4;
const scaledWidth = windowWidth / scale;
const scaledHeight = windowHeight / scale;

// Function shortcuts
const getElementById = document.getElementById.bind(document);
const getContext = (c) => c.getContext("2d");

// Canvas Elements
const canvas_ui = getElementById("ui");
const canvas_fg = getElementById("fg");
const canvas_bg = getElementById("bg");
[canvas_ui, canvas_fg, canvas_bg].forEach((c) => {
  c.width = windowWidth;
  c.height = windowHeight;
});

// Context variables
const ctx_ui = getContext(canvas_ui);
const ctx_fg = getContext(canvas_fg);
const ctx_bg = getContext(canvas_bg);
[ctx_ui, ctx_fg, ctx_bg].forEach((ctx) => {
    ctx.imageSmoothingEnabled = false;
    ctx.scale(scale, scale);
});

// Image Elements
const img_car = getElementById("car");
const img_oldcar = getElementById("oldcar");
const img_van = getElementById("van");
const img_road = getElementById("road");

const Point = (x, y) => {
  let point = {};
  point.x = x || 0;
  point.y = y || 0;

  return point;
};

const Rectangle = (pos, width, height) => {
  let rect = {};
  rect.p = pos || new Point(0, 0);
  rect.w = width || 0;
  rect.h = height || 0;
  rect.hw = rect.w / 2;
  rect.hh = rect.h / 2;

  // Update borders
  rect.ub = () => {
    rect.l = rect.p.x - rect.hw;
    rect.r = rect.l + rect.w;
    rect.t = rect.p.y - rect.hh;
    rect.b = rect.t + rect.h;
  };

  // Overlaps
  rect.ol = (other) => {
    return (
      rect.l < other.r &&
      other.l < rect.r &&
      rect.t < other.b &&
      other.t < rect.b
    );
  };

  // Move
  rect.mv = (point) => {
    rect.p = point;
    rect.ub();
  };

  rect.ub();

  return rect;
};


const Scene_Intro = (leftCar, rightCar) => {
    let x = 0;
    ctx_bg.clearRect(0, 0, scaledWidth, scaledHeight);
    ctx_bg.drawImage(img_road, 0, 0);
    const anim = () => {
        ctx_fg.clearRect(0, 0, scaledWidth, scaledHeight);
        ctx_fg.save();
        ctx_fg.scale(-scale, -scale);
        ctx_fg.drawImage(leftCar, scaledWidth, -scaledHeight);
        ctx_fg.restore();
        ctx_fg.drawImage(rightCar, scaledWidth - x, 0);
        x += 2;
        if (x < scaledWidth) {
            requestAnimationFrame(anim);
        }
    }
    requestAnimationFrame(anim);
}

Scene_Intro(img_oldcar, img_oldcar);