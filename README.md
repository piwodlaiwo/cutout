# cutout

[![build status][build-badge]][build-url]
[![coverage status][coverage-badge]][coverage-url]
[![greenkeeper][greenkeeper-badge]][greenkeeper-url]

> render a raster image to svg

This library renders raster images to an svg image. It does so by repeatedly generating and mutating shapes, keeping only the best ones. The code has largely been ported from [Primitive](https://github.com/fogleman/primitive). Primitive works just fine, but I wanted something that runs in javascript to make it easier to tinker with the logic. Besides that, my goals with this library were:

- No native, non-javascript dependencies (so no node-canvas, as that relies on Cairo)
- No browser specific APIs (even though it can be bundled for the browser without any problems)
- Modular and not tied to a single implementation, so it can fit in any project

## Installation

```bash
npm install -g @ismay/cutout
```

## Example

```javascript
const fs = require('fs');
const baboon = require('baboon-image');
const Cutout = require('@ismay/cutout');

// Render the image in lines and squares
const cutout = new Cutout(baboon, {
  alpha: 128,
  shapeTypes: ['Line', 'Square']
})

// Draw a 100 shapes
for (var i = 0; i < 100; i++) {
  cutout.step();
}

fs.writeFileSync('./baboon.svg', cutout.svg);
```

## API

### Cutout
Render a raster image to a collection of shapes

**Kind**: global class

* [Cutout](#Cutout)
    * [new Cutout(target, [options])](#new_Cutout_new)
    * [.image](#Cutout+image) ⇒ <code>ndarray</code>
    * [.svg](#Cutout+svg) ⇒ <code>string</code>
    * [.difference](#Cutout+difference) ⇒ <code>number</code>
    * [.step()](#Cutout+step) ⇒ <code>this</code>

<a name="new_Cutout_new"></a>

### new Cutout(target, [options])

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| target | <code>ndarray</code> |  | The image to render to svg |
| [options] | <code>Object</code> |  | Configuration options |
| [options.alpha] | <code>number</code> | <code>255</code> | The opacity of the shapes (0-255) |
| [options.background] | <code>Array.&lt;number&gt;</code> |  | Optional background color, expressed as an array of four numbers between 0 - 255 for respectively red, green, blue and transparency |
| [options.shapeTypes] | <code>Array.&lt;string&gt;</code> |  | The types of shapes to use when generating the image, available are: `Circle`, `Cubic`, `RotatedEllipse`, `Ellipse`, `Line`, `Quadratic`, `Rect`, `RotatedRect`, `Square` and `Triangle` |
| [options.amountOfShapes] | <code>number</code> | <code>1000</code> | The number of shapes to try per step |
| [options.amountOfAttempts] | <code>number</code> | <code>100</code> | The number of times to mutate each candidate shape |

<a name="Cutout+image"></a>

### cutout.image ⇒ <code>ndarray</code>
Get the current image

**Kind**: instance property of [<code>Cutout</code>](#Cutout)
**Returns**: <code>ndarray</code> - The current image
<a name="Cutout+svg"></a>

### cutout.svg ⇒ <code>string</code>
Get the current svg

**Kind**: instance property of [<code>Cutout</code>](#Cutout)
**Returns**: <code>string</code> - The current svg
<a name="Cutout+difference"></a>

### cutout.difference ⇒ <code>number</code>
Get the current difference

**Kind**: instance property of [<code>Cutout</code>](#Cutout)
**Returns**: <code>number</code> - The current difference
<a name="Cutout+step"></a>

### cutout.step() ⇒ <code>this</code>
Add a single new shape

**Kind**: instance method of [<code>Cutout</code>](#Cutout)
**Returns**: <code>this</code> - The class instance

## Credits

- [Primitive](https://github.com/fogleman/primitive)
- [Primitive.js](https://github.com/ondras/primitive.js)
- [Geometrize](https://github.com/Tw1ddle/geometrize-haxe)

## License

[MIT](http://ismay.mit-license.org/)

[build-badge]: https://travis-ci.org/ismay/cutout.svg?branch=master
[build-url]: https://travis-ci.org/ismay/cutout
[greenkeeper-badge]: https://badges.greenkeeper.io/ismay/cutout.svg
[greenkeeper-url]: https://greenkeeper.io/
[coverage-badge]: https://coveralls.io/repos/github/ismay/cutout/badge.svg?branch=master
[coverage-url]: https://coveralls.io/github/ismay/cutout?branch=master
