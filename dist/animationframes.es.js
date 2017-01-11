/* global requestAnimationFrame */

var ticking;
var animations = [];

var tick = function () {
  var now = Date.now();

  if (!animations.length) {
    ticking = false;
    return;
  }

  for (var i = 0; i < animations.length; i++) {
    var animation = animations[i];

    if (now < animation.start) {
      continue;
    }
    if (!animation.started) {
      animation.started = true;
      animation.startcb && animation.startcb();
    }

    var t = (now - animation.start) / (animation.end - animation.start);

    animation.progresscb && animation.progresscb(t < 1 ? t : 1);

    if (now > animation.end) {
      animation.endcb && animation.endcb();
      animations.splice(i--, 1);
      continue;
    }
  }
  requestAnimationFrame(tick);
};

var frames = function (delay, duration) {
  var now = Date.now();

  var animation = {
    start: now + delay,
    end: now + delay + duration,
    started: false,
    startcb: null,
    progresscb: null,
    endcb: null
  };

  animations.push(animation);

  if (!ticking) {
    ticking = true;
    requestAnimationFrame(tick);
  }
  var self = {
    start: function (cb) {
      animation.startcb = cb;
      return self;
    },
    progress: function (cb) {
      animation.progresscb = cb;
      return self;
    },
    end: function (cb) {
      animation.endcb = cb;
      return self;
    },
    destroy: function () {
      for (var i = 0; i < animations.length; i++) {
        if (animations[i] === animation) {
          animations.splice(i--, 1);
          break;
        }
      }
    }
  };
  return self;
};

window.requestAnimationFrame || (window.requestAnimationFrame = function (cb) {
  setTimeout(cb, 0);
});

var easeInBy = function (power) { return function (t) { return Math.pow(t, power); }; };

var easeOutBy = function (power) { return function (t) { return 1 - Math.abs(Math.pow(t - 1, power)); }; };

var easeInOutBy = function (power) { return function (t) { return t < 0.5 ? easeInBy(power)(t * 2) / 2 : easeOutBy(power)(t * 2 - 1) / 2 + 0.5; }; };

var ease = {
  linear: function (t) {
    return t;
  },
  quadIn: easeInBy(2),
  quadOut: easeOutBy(2),
  quadInOut: easeInOutBy(2),
  cubicIn: easeInBy(3),
  cubicOut: easeOutBy(3),
  cubicInOut: easeInOutBy(3),
  quartIn: easeInBy(4),
  quartOut: easeOutBy(4),
  quartInOut: easeInOutBy(4),
  quintIn: easeInBy(5),
  quintOut: easeOutBy(5),
  quintInOut: easeInOutBy(5),
  sineIn: function (t) { return 1 + Math.sin(Math.PI / 2 * t - Math.PI / 2); },
  sineOut: function (t) { return Math.sin(Math.PI / 2 * t); },
  sineInOut: function (t) { return (1 + Math.sin(Math.PI * t - Math.PI / 2)) / 2; },
  bounce: function (t) {
    var s = 7.5625;
    var p = 2.75;

    if (t < 1 / p) {
      return s * t * t;
    }
    if (t < 2 / p) {
      t -= 1.5 / p;
      return s * t * t + 0.75;
    }
    if (t < 2.5 / p) {
      t -= 2.25 / p;
      return s * t * t + 0.9375;
    }
    t -= 2.625 / p;
    return s * t * t + 0.984375;
  }
};

export { frames, ease };
