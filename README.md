[![js-semistandard-style](https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg?maxAge=3600&style=flat-square)](https://github.com/Flet/semistandard)
[![npm](https://img.shields.io/npm/v/@pakastin/animationframes.svg?maxAge=60&style=flat-square)](https://www.npmjs.com/package/@pakastin/animationframes)
[![Twitter Follow](https://img.shields.io/twitter/follow/pakastin.svg?style=social&maxAge=3600)](https://twitter.com/pakastin)

# animationframes
Create animation frames with delay and duration

## install
    npm install animationframes

## oldskool
```html
<script src="https://pakastin.github.io/animationframes/animationframes.min.js"></script>
```

## usage

```js
import { animationframes, ease } from 'animationframes';

const translate = (x, y) => `translate(${x}%, ${y}%)`;

const el = document.createElement('h1');

const animation = animationframes(0, 1000)
  .start(() => {
    el.style.transform = translate(-100, 0);
  })
  .progress((t) => {
    const e = ease.quartInOut(t);
    const x = -100 * (1 - e);

    el.style.transform = translate(x, 0);
  })
  .end(() => {
    el.style.transform = '';
  });

el.textContent = 'Hello world!';

document.body.appendChild(el);
```
https://jsfiddle.net/o6vac675/2/

## License
[MIT](https://github.com/pakastin/animationframes/blob/master/LICENSE)
