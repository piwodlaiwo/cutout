# cutout

[![build status][build-badge]][build-url]
[![coverage status][coverage-badge]][coverage-url]
[![greenkeeper][greenkeeper-badge]][greenkeeper-url]

> render a raster image to svg

This library renders raster images to an svg image. It does so by repeatedly generating random shapes and keeping only the best ones. The code has largely been inspired by [Primitive](https://github.com/fogleman/primitive) and its [related ports](#credits). Primitive works just fine, but I wanted something that runs in javascript as that makes it easier tinker with the logic. My goals with this library were:

- No native dependencies
- No browser specific APIs (even though it can be bundled for the browser without any problems)
- Modular and not tied to a single implementation

## Installation

```bash
npm install -g @ismay/cutout
```

## API

### Cutout
Render a raster image to a collection of shapes

**Kind**: global class

* [Cutout](#Cutout)
    * [.image](#Cutout+image) ⇒ <code>ndarray</code>
    * [.svg](#Cutout+svg) ⇒ <code>string</code>
    * [.difference](#Cutout+difference) ⇒ <code>number</code>
    * [.step()](#Cutout+step) ⇒ <code>this</code>

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
