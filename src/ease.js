
const easeInBy = power => t => Math.pow(t, power);

const easeOutBy = power => t => 1 - Math.abs(Math.pow(t - 1, power));

const easeInOutBy = power => t => t < 0.5 ? easeInBy(power)(t * 2) / 2 : easeOutBy(power)(t * 2 - 1) / 2 + 0.5;

export const ease = {
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
  sinIn: t => 1 + Math.sin(Math.PI / 2 * t - Math.PI / 2),
  sinOut: t => Math.sin(Math.PI / 2 * t),
  sinInOut: t => (1 + Math.sin(Math.PI * t - Math.PI / 2)) / 2
};
