const { randomIntInclusive, clampToInt, randomNormal } = require('../util');
const { ellipseToScanlines } = require('../rasterizer');

/**
 * A rotated ellipse
 * @param {number} xBound maximum value for x-coordinates, zero-based
 * @param {number} yBound maximum value for y-coordinates, zero-based
 */

class RotatedEllipse {
  constructor(xBound, yBound) {
    this.xBound = xBound;
    this.yBound = yBound;

    this.cx = randomIntInclusive(0, xBound);
    this.cy = randomIntInclusive(0, yBound);
    this.rx = randomIntInclusive(1, 30);
    this.ry = randomIntInclusive(1, 30);
    this.angle = randomIntInclusive(0, 179);
  }

  set props([cx, cy, rx, ry, angle]) {
    this.cx = cx;
    this.cy = cy;
    this.rx = rx;
    this.ry = ry;
    this.angle = angle;
  }

  get props() {
    return [this.cx, this.cy, this.rx, this.ry, this.angle];
  }

  get svg() {
    const [cx, cy, rx, ry, angle] = this.props;
    const shape = [
      'ellipse',
      {
        cx,
        cy,
        rx,
        ry,
        transform: `rotate(${angle} ${cx} ${cy})`
      }
    ];

    return shape;
  }

  clone() {
    const ellipse = new RotatedEllipse(this.xBound, this.yBound);
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
        this.rx = clampToInt(this.rx + randomNormal() * 15, 1, this.xBound / 2);
        this.ry = clampToInt(this.ry + randomNormal() * 15, 1, this.yBound / 2);
        break;
      case 2:
        this.angle = (this.angle + randomNormal() * 30) % 180;
    }
  }

  rasterize() {
    return ellipseToScanlines(this.props, this.xBound, this.yBound);
  }
}

module.exports = RotatedEllipse;
