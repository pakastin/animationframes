[![js-semistandard-style](https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg?maxAge=3600&style=flat-square)](https://github.com/Flet/semistandard)
[![npm](https://img.shields.io/npm/v/animationframes.svg?maxAge=60&style=flat-square)](https://www.npmjs.com/package/animationframes)
[![Twitter Follow](https://img.shields.io/twitter/follow/pakastin.svg?style=social&maxAge=3600)](https://twitter.com/pakastin)

# animationframes
Minimalistic way to create JS animations (~1.5 KB). Use [prefix](https://github.com/pakastin/prefix) to auto-prefix CSS properties.

Battle-tested in my [HTML5 Deck of Cards](https://deck-of-cards.js.org), [source](https://github.com/pakastin/deck-of-cards/blob/master/lib/card.js#L65).

## install
```
npm install animationframes
```

## usage

```js
import AnimationFrames from 'animationframes';

const translate = (el, x, y) => el.style.transform = `translate(${x}%, ${y}%)`;
const { from } = AnimationFrames;

const el = document.createElement('h1');

const animation = new AnimationFrames({
  delay: 0,
  duration: 1000,
  oninit () {
    el.style.display = 'none';
  }
  onstart () {
    el.style.display = '';
  }
  onprogress (e) {
    translate(el, from(-100, e), 0);
  },
  onend () {
    el.style.transform = '';
  }
});

el.textContent = 'Hello world!';

document.body.appendChild(el);
```
https://jsfiddle.net/o6vac675/4/

Another example: https://jsfiddle.net/pakastin/fjozqopm/

## easings
Available easings: https://github.com/pakastin/animationframes/blob/master/src/ease.js

## oldskool
```html
<script src="https://pakastin.github.io/animationframes/animationframes.min.js"></script>
<script>
const animation = new AnimationFrames( ... );
...
</script>
```

## License
[MIT](https://github.com/pakastin/animationframes/blob/master/LICENSE)
