/* global requestAnimationFrame */

let ticking;
const animations = [];

const tick = () => {
  const now = Date.now();

  if (!animations.length) {
    ticking = false;
    return;
  }

  for (let i = 0; i < animations.length; i++) {
    const animation = animations[i];

    if (now < animation.start) {
      continue;
    }
    if (!animation.started) {
      animation.started = true;
      animation.startcb && animation.startcb();
    }

    const t = (now - animation.start) / (animation.end - animation.start);

    animation.progresscb && animation.progresscb(t < 1 ? t : 1);

    if (now > animation.end) {
      animation.endcb && animation.endcb();
      animations.splice(i--, 1);
      continue;
    }
  }
  requestAnimationFrame(tick);
};

export const frames = (delay, duration) => {
  const now = Date.now();

  const animation = {
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
  const self = {
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
      for (let i = 0; i < animations.length; i++) {
        if (animations[i] === animation) {
          animations.splice(i--, 1);
          break;
        }
      }
    }
  };
  return self;
};

window.requestAnimationFrame || (window.requestAnimationFrame = (cb) => {
  setTimeout(cb, 0);
});
