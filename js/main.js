/* Research tabs */
(function () {
  var nb = document.querySelector(".nb");

  if (!nb) return;

  var tabs = [].slice.call(nb.querySelectorAll("[role=tab]"));
  var pages = [].slice.call(nb.querySelectorAll("[role=tabpanel]"));

  function pick(i, focus) {
    tabs.forEach(function (tab, index) {
      var on = i === index;

      tab.setAttribute("aria-selected", on);
      tab.tabIndex = on ? 0 : -1;
      pages[index].hidden = !on;
    });

    nb.style.setProperty("--c", tabs[i].dataset.c);

    if (focus) {
      tabs[i].focus();
    }
  }

  tabs.forEach(function (tab, index) {
    tab.addEventListener("click", function () {
      pick(index);
    });

    tab.addEventListener("keydown", function (event) {
      if (event.key === "ArrowRight") {
        pick((index + 1) % tabs.length, true);
      }

      if (event.key === "ArrowLeft") {
        pick((index + tabs.length - 1) % tabs.length, true);
      }
    });
  });

  pick(0);
})();

/* Staff lines: five undulating lines with notes drifting along them. */
(function () {
  var canvas = document.getElementById("staff");

  if (!canvas) return;

  var context = canvas.getContext("2d");
  var css = getComputedStyle(document.documentElement);
  var cobalt = css.getPropertyValue("--cobalt").trim();
  var rose = css.getPropertyValue("--rose").trim();
  var reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

  var width = 0;
  var height = 0;
  var pointerX = -9999;
  var pointerY = -9999;
  var gap = 24;
  var amplitude = 40;
  var notes = [];

  for (var i = 0; i < 9; i++) {
    notes.push({
      u: i / 9 + Math.random() * 0.05,
      l: Math.floor(Math.random() * 5) + (Math.random() < 0.5 ? 0.5 : 0),
      s: 0.012 + Math.random() * 0.01
    });
  }

  function resize() {
    var pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

    width = canvas.clientWidth;
    height = canvas.clientHeight;

    canvas.width = width * pixelRatio;
    canvas.height = height * pixelRatio;

    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

    gap = Math.max(16, Math.min(34, height * 0.04));
    amplitude = Math.max(18, height * 0.05);

    if (reduceMotion) {
      draw(0);
    }
  }

  function yAt(line, x, time) {
    var base = Math.min(height * 0.68, height - 110) + (line - 2) * gap;

    var y =
      base +
      Math.sin(x * 0.004 + time * 0.6 + line * 0.35) * amplitude +
      Math.sin(x * 0.011 - time * 0.4 + line * 0.2) * amplitude * 0.35;

    var dx = x - pointerX;
    var dy = pointerY - base;

    var force =
      Math.exp(-(dx * dx) / (2 * 160 * 160)) *
      Math.exp(-(dy * dy) / (2 * 220 * 220));

    return y + (pointerY - y) * 0.5 * force;
  }

  function draw(time) {
    context.clearRect(0, 0, width, height);

    context.strokeStyle = cobalt;
    context.lineWidth = 1.6;
    context.globalAlpha = 0.6;

    for (var line = 0; line < 5; line++) {
      context.beginPath();

      for (var x = 0; x <= width + 8; x += 8) {
        var y = yAt(line, x, time);

        if (x === 0) {
          context.moveTo(x, y);
        } else {
          context.lineTo(x, y);
        }
      }

      context.stroke();
    }

    context.globalAlpha = 0.9;
    context.fillStyle = rose;
    context.strokeStyle = rose;
    context.lineWidth = 2;

    notes.forEach(function (note) {
      var x = ((note.u + time * note.s) % 1) * (width + 80) - 40;
      var y = yAt(note.l, x, time);

      context.beginPath();
      context.ellipse(x, y, 9, 6.5, -0.35, 0, Math.PI * 2);
      context.fill();

      context.beginPath();
      context.moveTo(x + 8, y - 2);
      context.lineTo(x + 8, y - 36);
      context.stroke();
    });

    context.globalAlpha = 1;
  }

  function loop(milliseconds) {
    draw(milliseconds / 1000);
    requestAnimationFrame(loop);
  }

  window.addEventListener("resize", resize);

  window.addEventListener("pointermove", function (event) {
    var rectangle = canvas.getBoundingClientRect();

    pointerX = event.clientX - rectangle.left;
    pointerY = event.clientY - rectangle.top;
  });

  document.addEventListener("pointerleave", function () {
    pointerX = -9999;
    pointerY = -9999;
  });

  resize();

  if (!reduceMotion) {
    requestAnimationFrame(loop);
  }
})();
