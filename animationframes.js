(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.animationframes = global.animationframes || {})));
}(this, (function (exports) { 'use strict';

/* global requestAnimationFrame */

var ticking;
var animations = [];

function animationframes (delay, duration) {
  var now = Date.now();

  var start = now + delay;
  var end = start + duration;

  var animation = {
    start: start,
    end: end,
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
}

function tick () {
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
}

window.requestAnimationFrame || (window.requestAnimationFrame = function (cb) {
  setTimeout(cb, 0);
});

var ease = {
  linear: function (t) {
    return t;
  },
  quadIn: function (t) {
    return t * t;
  },
  quadOut: function (t) {
    return t * (2 - t);
  },
  quadInOut: function (t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  },
  cubicIn: function (t) {
    return t * t * t;
  },
  cubicOut: function (t) {
    return (--t) * t * t + 1;
  },
  cubicInOut: function (t) {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  },
  quartIn: function (t) {
    return t * t * t * t;
  },
  quartOut: function (t) {
    return 1 - (--t) * t * t * t;
  },
  quartInOut: function (t) {
    return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;
  },
  quintIn: function (t) {
    return t * t * t * t * t;
  },
  quintOut: function (t) {
    return 1 + (--t) * t * t * t * t;
  },
  quintInOut: function (t) {
    return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t;
  }
};

exports.animationframes = animationframes;
exports.ease = ease;

Object.defineProperty(exports, '__esModule', { value: true });

})));
