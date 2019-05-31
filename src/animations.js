class Animations {
  constructor () {
    this.animations = [];
  }
  add (animation) {
    this.animations.push(animation);
  }
  render () {
    const { animations } = this;
    const now = Date.now();

    for (let i = 0; i < animations.length; i++) {
      const animation = animations[i];

      if (now < animation.start) {
        continue;
      }

      if (!animation.started) {
        animation.started = true;
        animation.onstart && animation.onstart();
      }

      const t = Math.min(1, (now - animation.start) / (animation.end - animation.start));
      const e = animation.ease(t);

      animation.onprogress && animation.onprogress(e, t);

      if (now >= animation.end) {
        animation.onend && animation.onend();
        animations.splice(i--, 1);
        continue;
      }
    }
  }
  remove (animation) {
    const { animations } = this;

    for (let i = 0; i < animations.length; i++) {
      if (animations[i] === this) {
        animations.splice(i--, 1);
      }
    }
  }
}

export default new Animations();
