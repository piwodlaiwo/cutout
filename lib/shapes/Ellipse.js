const { randomIntInclusive, clampToInt, randomNormal } = require('../util');
const { shapeToScanlines } = require('../rasterizer');

/**
 * An ellipse
 * @param {number} xBound maximum value for x-coordinates, zero-based
 * @param {number} yBound maximum value for y-coordinates, zero-based
 */

class Ellipse {
  constructor(xBound, yBound) {
    this.xBound = xBound;
    this.yBound = yBound;

    this.cx = randomIntInclusive(0, xBound);
    this.cy = randomIntInclusive(0, yBound);
    this.rx = randomIntInclusive(0, 30) + 1;
    this.ry = randomIntInclusive(0, 30) + 1;
  }

  set props([cx, cy, rx, ry]) {
    this.cx = cx;
    this.cy = cy;
    this.rx = rx;
    this.ry = ry;
  }

  get props() {
    return [this.cx, this.cy, this.rx, this.ry];
  }

  get svg() {
    const [cx, cy, rx, ry] = this.props;
    const shape = [
      'ellipse',
      {
        cx,
        cy,
        rx,
        ry
      }
    ];

    return shape;
  }

  clone() {
    const ellipse = new Ellipse(this.xBound, this.yBound);
    ellipse.props = this.props;

    return ellipse;
  }

  mutate() {
    /* istanbul ignore next */
    switch (randomIntInclusive(0, 2)) {
      case 0:
        this.cx = clampToInt(this.cx + randomNormal() * 15, 0, this.xBound);
        this.cy = clampToInt(this.cy + randomNormal() * 15, 0, this.yBound);
        break;
      case 1:
        this.rx = clampToInt(this.rx + randomNormal() * 15, 1, this.xBound);
        break;
      case 2:
        this.ry = clampToInt(this.ry + randomNormal() * 15, 1, this.yBound);
    }
  }

  rasterize() {
    const [cx, cy, rx, ry] = this.props;
    const shape = { type: 'ellipse', cx, cy, rx, ry };

    return shapeToScanlines(shape, this.xBound, this.yBound);
  }
}

module.exports = Ellipse;
