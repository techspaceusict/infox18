var PRNG = (function(exports) {
  function setSeed(seed) {
    // Create a length 624 array to store the state of the generator
    exports.MT = new Uint32Array(624);
    exports.index = 0;
    exports.MT[0] = seed;
    for (var i = 1; i < 624; i++) {
      exports.MT[i] =
        1812433253 * (exports.MT[i - 1] ^ ((exports.MT[i - 1] >> 30) + i));
    }
  }
  function extractNumber() {
    if (exports.index == 0) {
      exports.generateNumbers();
    }

    var y = exports.MT[exports.index];
    y = y ^ (y >> 11);
    y = y ^ ((y << 7) & 2636928640);
    y = y ^ ((y << 15) & 4022730752);
    y = y ^ (y >> 18);

    exports.index = (exports.index + 1) % 624;
    return y;
  }

  function generateNumbers() {
    for (var i = 0; i < 624; i++) {
      var y =
        (exports.MT[i] & 0x80000000) + (exports.MT[(i + 1) % 624] & 0x7fffffff);
      exports.MT[i] = exports.MT[(i + 397) % 624] ^ (y >> 1);
      if (y % 2 != 0) {
        exports.MT[i] = exports.MT[i] ^ 2567483615;
      }
    }
  }
  exports.generateNumbers = generateNumbers;
  exports.extractNumber = extractNumber;
  function random() {
    return exports.extractNumber() / 0x7fffffff;
  }
  exports.setSeed = setSeed;
  exports.random = random;
  setSeed(0);
  return exports;
})({});

function squareDistance(v1, v2) {
  var dx = v2[0] - v1[0];
  var dy = v2[1] - v1[1];
  return dx * dx + dy * dy;
}
function norm(t, a, b) {
  return (t - a) / (b - a);
}

//////////////////////////////////////////

var size = 1024;
var canvas = document.createElement("canvas");
canvas.style.position = "absolute";
canvas.style.top = "0";
canvas.style.left = "0";
canvas.style.zIndex = "-5";
canvas.width = canvas.height = size;
ctx = canvas.getContext("2d");
document.body.appendChild(canvas);

var vertices;
function update() {
  PRNG.setSeed(3);

  var r, a, v, o;
  var count = 20;
  var spawn = 40;
  var offset = 100;
  vertices = [];
  for (var i = 0; i < count; i++) {
    r = ((PRNG.random() - 0.5) * window.innerWidth) / 2;
    a =
      (i % 2 == 0 ? 1 : -1) * Date.now() * 0.0001 + PRNG.random() * Math.PI * 2;
    v = [Math.cos(a) * r, Math.sin(a) * r];
    vertices.unshift(v);

    for (var j = 0; j < spawn * (0.5 + PRNG.random()); j++) {
      r = PRNG.random() * offset;
      a =
        (j % 2 == 0 ? 1 : -1) * Date.now() * 0.0002 +
        PRNG.random() * Math.PI * 2;
      o = vertices[0];
      v = [o[0] + Math.cos(a % r) * r, o[1] + Math.sin((a % r) * 2) * r];
      vertices.push(v);
    }
  }

  ctx.restore();
  ctx.save();

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  ctx.globalAlpha = 1;
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.translate(canvas.width / 2, canvas.height / 2);

  ctx.strokeStyle = "#F00";
  var m = size / 8;
  for (i = 8; i <= m; i *= 2) {
    ctx.globalAlpha = (1 - i / m) * 0.1;
    yolo(vertices, i, size, size);
  }
  requestAnimationFrame(update);
}

function yolo(vertices, size, _w, _h) {
  //measures of an equalateral triangle
  var sides = 3;
  var l = 2 * Math.sin(Math.PI / sides); //side length
  var a = l / (2 * Math.tan(Math.PI / sides)); //apothem
  var h = 1 + a; //radius + apothem

  size = size || 1;
  l *= size;
  h *= size;

  var mx = 2 * Math.ceil(_w / l);
  var my = Math.ceil(_h / h);

  var fills = [];
  ctx.beginPath();
  vertices.forEach(function(v) {
    var cell_x = Math.round(norm(v[0], 0, _w) * mx);
    var cell_y = Math.round(norm(v[1], 0, _h) * my);

    var md = Number.POSITIVE_INFINITY,
      d,
      x,
      y,
      ix,
      iy,
      ps = [];
    for (var i = cell_x - 2; i < cell_x + 2; i++) {
      for (var j = cell_y - 2; j < cell_y + 2; j++) {
        if (
          (Math.abs(i) % 2 == 1 && Math.abs(j) % 2 == 0) ||
          (Math.abs(i) % 2 == 0 && Math.abs(j) % 2 == 1)
        ) {
          ix = (i * l) / 2;
          iy = j * h;

          d = squareDistance([ix, iy], v);
          if (d < md) {
            md = d;
            x = (i * l) / 2;
            y = j * h;
            ps.unshift(x, y);
          }
        }
      }
    }

    if (PRNG.random() > 0.5) {
      ctx.moveTo(v[0], v[1]);
      ctx.lineTo(ps[0], ps[1]);
    } else {
      ctx.moveTo(ps[0], ps[1]);
      ctx.lineTo(ps[2], ps[3]);
      if (PRNG.random() > 0.95) {
        fills.push(ps);
      }
    }
  });
  ctx.stroke();

  ctx.beginPath();
  ctx.fillStyle = "#F00";
  fills.forEach(function(ps) {
    ctx.moveTo(ps[0], ps[1]);
    ctx.lineTo(ps[2], ps[3]);
    ctx.lineTo(ps[4], ps[5]);
    ctx.lineTo(ps[0], ps[1]);
  });
  ctx.fill();
}

update();
// Splitting();

/**
 * Declaring particles targets:
 * Here we have 2 models, 2 images, and a MultiTarget collection
 * of the same models and images again.
 */
var targets = [
  // {
  //     type: ParticleSaga.ModelTarget,
  //     url: './models/helmet.json',
  //     options: {
  //         color: {
  //             r: 0.8,
  //             g: 1,
  //             b: 1
  //         },
  //         scale: 110,
  //         size: 3,
  //         respondsToMouse: true
  //     }
  // },
  {
    type: ParticleSaga.ImageTarget,
    url: "./img/logo23.png",
    options: {
      respondsToMouse: true,
      size: 2
    }
  },
  //  {
  //     type: ParticleSaga.ModelTarget,
  //     url: './models/gryphon.json',
  //     options: {
  //         color: {
  //             r: 0.8,
  //             g: 1,
  //             b: 0.2
  //         },
  //         size: 3,
  //         scale: 120,
  //         respondsToMouse: true,
  //         initialMatrices: [
  //             new THREE.Matrix4().makeTranslation(0, -2, 0),
  //             new THREE.Matrix4().makeRotationY(Math.PI / 2)
  //         ]
  //     }
  // },

  {
    type: ParticleSaga.ImageTarget,
    url: "./img/logo1.png",
    options: {
      respondsToMouse: true,
      size: 2
    }
  }
  // {
  //   type: ParticleSaga.ImageTarget,
  //   url: "./img/tsFinal.png",
  //   options: {
  //     respondsToMouse: true,
  //     size: 2
  //   }
  // }
  // {
  //   type: ParticleSaga.ImageTarget,
  //   url: "./img/ts-14.png",
  //   options: {
  //     respondsToMouse: true,
  //     size: 2
  //   }
  // }
  // {
  //     type: ParticleSaga.MultiTarget,
  //     container: document.getElementById('multitarget-references'),
  //     options: {
  //         size: 3,
  //         respondsToMouse: true
  //     },
  //     targets: [
  //         {
  //             type: ParticleSaga.ModelTarget,
  //             url: './models/helmet.json',
  //             container: document.getElementById('multitarget-reference-1'),
  //             options: {
  //                 scale: 40,
  //                 color: {
  //                     r: 0.8,
  //                     g: 1,
  //                     b: 1
  //                 },
  //                 initialMatrices: [
  //                     new THREE.Matrix4().makeTranslation(0.1, -0.4, 0)
  //                 ]
  //             }
  //         },
  //         {
  //             type: ParticleSaga.ModelTarget,
  //             url: './models/gryphon.json',
  //             container: document.getElementById('multitarget-reference-2'),
  //             options: {
  //                 scale: 60,
  //                 color: {
  //                     r: 0.8,
  //                     g: 1,
  //                     b: 0.2
  //                 },
  //                 initialMatrices: [
  //                     new THREE.Matrix4().makeTranslation(0, -2, 0),
  //                     new THREE.Matrix4().makeRotationY(Math.PI / 2)
  //                 ]
  //             }
  //         }, {
  //             type: ParticleSaga.ImageTarget,
  //             url: './images/saga.png',
  //             container: document.getElementById('multitarget-reference-3')
  //         }, {
  //             type: ParticleSaga.ImageTarget,
  //             url: './images/griffin.png',
  //             container: document.getElementById('multitarget-reference-4')
  //         }
  //     ]
  // }
];
function setupDemoUI() {
  var next = document.getElementsByClassName("next")[0];
  var prev = document.getElementsByClassName("prev")[0];
  next.addEventListener("click", scene.nextTarget);
  prev.addEventListener("click", scene.prevTarget);
  document.body.addEventListener("keydown", onKeydown);
}
function onKeydown(e) {
  switch (e.keyCode) {
    case 37:
      scene.prevTarget();
      break;
    case 39:
      scene.nextTarget();
      break;
  }
}
// The scene's context element
var saga = document.getElementById("saga");
var scene = new ParticleSaga.Scene(saga, targets, {
  numParticles: 40000,
  sort: ParticleSaga.VertexSort.leftToRight
});
scene.load(function() {
  // setupDemoUI();
  scene.setTarget(0);
  scene.startSlideshow();
});
