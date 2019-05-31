(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.AnimationFrames = factory());
}(this, function () { 'use strict';

  var requestAnimationFrame = window.requestAnimationFrame || function requestAnimationFrame (cb) {
    setTimeout(cb, 0);
  };

  var Animations = function Animations () {
    this.animations = [];
  };
  Animations.prototype.add = function add (animation) {
    this.animations.push(animation);
  };
  Animations.prototype.render = function render () {
    var ref = this;
      var animations = ref.animations;
    var now = Date.now();

    for (var i = 0; i < animations.length; i++) {
      var animation = animations[i];

      if (now < animation.start) {
        continue;
      }

      if (!animation.started) {
        animation.started = true;
        animation.onstart && animation.onstart();
      }

      var t = Math.min(1, (now - animation.start) / (animation.end - animation.start));
      var e = animation.ease(t);

      animation.onprogress && animation.onprogress(e, t);

      if (now >= animation.end) {
        animation.onend && animation.onend();
        animations.splice(i--, 1);
        continue;
      }
    }
  };
  Animations.prototype.remove = function remove (animation) {
    var ref = this;
      var animations = ref.animations;

    for (var i = 0; i < animations.length; i++) {
      if (animations[i] === this) {
        animations.splice(i--, 1);
      }
    }
  };

  var animations = new Animations();

  var linear = function (t) { return t; };

  var easeInBy = function (power) { return function (t) { return Math.pow(t, power); }; };
  var easeOutBy = function (power) { return function (t) { return 1 - Math.abs(Math.pow(t - 1, power)); }; };

  var easeInOutBy = function (power) { return function (t) {
    if (t < 0.5) {
      return easeInBy(power)(t * 2) / 2;
    } else {
      return easeOutBy(power)(t * 2 - 1) / 2 + 0.5;
    }
  }; };

  var ease = {
    linear: linear,

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

    bounce: function bounce (t) {
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

  var rendering;

  var AnimationFrames = function AnimationFrames (ref) {
    if ( ref === void 0 ) ref = {};
    var delay = ref.delay; if ( delay === void 0 ) delay = 0;
    var duration = ref.duration; if ( duration === void 0 ) duration = 0;
    var easing = ref.easing; if ( easing === void 0 ) easing = 'quadOut';
    var oninit = ref.oninit;
    var onstart = ref.onstart;
    var onprogress = ref.onprogress;
    var onend = ref.onend;

    if (!rendering) {
      rendering = requestAnimationFrame(render);
    }

    var now = Date.now();

    this.initTime = now;
    this.delay = delay;
    this.duration = duration;
    this.easing = easing;
    this.onstart = onstart;
    this.onprogress = onprogress;
    this.onend = onend;

    if (!this.ease) {
      throw new Error('Easing not found');
    }

    animations.add(this);

    if (oninit) {
      oninit();
    }
  };

  var prototypeAccessors = { start: { configurable: true },end: { configurable: true },ease: { configurable: true } };
  prototypeAccessors.start.get = function () {
    return this.initTime + this.delay;
  };
  prototypeAccessors.end.get = function () {
    return this.start + this.duration;
  };
  prototypeAccessors.ease.get = function () {
    return ease[this.easing];
  };
  AnimationFrames.prototype.destroy = function destroy () {
    animations.remove(this);
  };
  AnimationFrames.from = function from (val, e) {
    return val * (1 - e);
  };

  Object.defineProperties( AnimationFrames.prototype, prototypeAccessors );

  AnimationFrames.ease = ease;

  function render () {
    animations.render();

    rendering = requestAnimationFrame(render);
  }

  return AnimationFrames;

}));
