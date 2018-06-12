const { randomIntInclusive, clampToInt, randomNormal } = require('../util');
const { shapeToScanlines } = require('../rasterizer');

/**
 * A rectangle
 * @param {number} xBound maximum value for x-coordinates, zero-based
 * @param {number} yBound maximum value for y-coordinates, zero-based
 */

class Rect {
  constructor(xBound, yBound) {
    this.xBound = xBound;
    this.yBound = yBound;

    this.x = randomIntInclusive(0, xBound);
    this.y = randomIntInclusive(0, yBound);
    this.width = clampToInt(randomIntInclusive(1, 30), 1, xBound - this.x);
    this.height = clampToInt(randomIntInclusive(1, 30), 1, yBound - this.y);
  }

  set props([x, y, width, height]) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  get props() {
    return [this.x, this.y, this.width, this.height];
  }

  get svg() {
    const [x, y, width, height] = this.props;
    const shape = [
      'rect',
      {
        x,
        y,
        width,
        height
      }
    ];

    return shape;
  }

  clone() {
    const rectangle = new Rect(this.xBound, this.yBound);
    rectangle.props = this.props;

    return rectangle;
  }

  mutate() {
    /* istanbul ignore next */
    switch (randomIntInclusive(0, 1)) {
      case 0:
        this.x = clampToInt(this.x + randomNormal() * 15, 0, this.xBound);
        this.y = clampToInt(this.y + randomNormal() * 15, 0, this.yBound);
        break;
      case 1:
        this.width = clampToInt(this.width + randomNormal() * 15, 1, this.xBound - this.x);
        this.height = clampToInt(this.height + randomNormal() * 15, 1, this.yBound - this.y);
    }
  }

  rasterize() {
    const [x, y, width, height] = this.props;
    const shape = { type: 'rect', x, y, height, width };

    return shapeToScanlines(shape, this.xBound, this.yBound);
  }
}

module.exports = Rect;
