# cutout

[![build status][build-badge]][build-url]
[![coverage status][coverage-badge]][coverage-url]
[![greenkeeper][greenkeeper-badge]][greenkeeper-url]

> render a raster image to svg

This library renders raster images to an svg image. It does so by repeatedly generating random shapes and keeping only the best ones. The code has largely been inspired by [Primitive](https://github.com/fogleman/primitive) and its [related ports](#credits).

To start, Primitive works just fine. However, I just wanted something that runs in javascript because that's what I write all my tools in and it allows me to tinker with the logic. My goals with this library were:

- No native dependencies
- No browser specific APIs (even though it can be bundled for the browser without any problems)
- Modular and not tied to a single implementation

This allows everyone to use this library in node and in the browser, for whatever purpose.

## Installation

```bash
npm install -g @ismay/cutout
```

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
