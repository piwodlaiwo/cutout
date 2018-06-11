const { randomIntInclusive, clampToInt, randomNormal } = require('../util');
const { shapeToScanlines } = require('../rasterizer');

/**
 * A line
 * @param {number} xBound maximum value for x-coordinates, zero-based
 * @param {number} yBound maximum value for y-coordinates, zero-based
 */

class Line {
  constructor(xBound, yBound) {
    this.xBound = xBound;
    this.yBound = yBound;

    this.x1 = randomIntInclusive(0, xBound);
    this.y1 = randomIntInclusive(0, yBound);
    this.x2 = clampToInt(this.x1 + randomIntInclusive(0, 30) - 15);
    this.y2 = clampToInt(this.y1 + randomIntInclusive(0, 30) - 15);
  }

  set props([x1, y1, x2, y2]) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
  }

  get props() {
    return [this.x1, this.y1, this.x2, this.y2];
  }

  get svg() {
    const [x1, y1, x2, y2] = this.props;
    const shape = [
      'line',
      {
        x1,
        y1,
        x2,
        y2
      }
    ];

    return shape;
  }

  clone() {
    const line = new Line(this.xBound, this.yBound);
    line.props = this.props;

    return line;
  }

  mutate() {
    /* istanbul ignore next */
    switch (randomIntInclusive(0, 1)) {
      case 0:
        this.x1 = clampToInt(this.x1 + randomNormal() * 15, 0, this.xBound);
        this.y1 = clampToInt(this.y1 + randomNormal() * 15, 0, this.yBound);
        break;
      case 1:
        this.x2 = clampToInt(this.x2 + randomNormal() * 15, 0, this.xBound);
        this.y2 = clampToInt(this.y2 + randomNormal() * 15, 0, this.yBound);
    }
  }

  rasterize() {
    const [x1, y1, x2, y2] = this.props;
    const shape = { type: 'line', x1, y1, x2, y2 };

    return shapeToScanlines(shape, this.xBound, this.yBound);
  }
}

module.exports = Line;
