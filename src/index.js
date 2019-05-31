import requestAnimationFrame from './requestanimationframe';
import animations from './animations';
import ease from './ease';

let rendering;

export default class AnimationFrames {
  constructor ({
    delay = 0,
    duration = 0,
    easing = 'quadOut',
    oninit,
    onstart,
    onprogress,
    onend
  } = {}) {
    if (!rendering) {
      rendering = requestAnimationFrame(render);
    }

    const now = Date.now();

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
  }
  get start () {
    return this.initTime + this.delay;
  }
  get end () {
    return this.start + this.duration;
  }
  get ease () {
    return ease[this.easing];
  }
  destroy () {
    animations.remove(this);
  }
  static from (val, e) {
    return val * (1 - e);
  }
}

AnimationFrames.ease = ease;

function render () {
  animations.render();

  rendering = requestAnimationFrame(render);
}
