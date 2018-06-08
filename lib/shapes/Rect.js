const { randomIntInclusive, clampToInt, randomNormal } = require('../util');

/**
 * A rectangle
 */

class Rect {
  constructor(xBound, yBound) {
    this.xBound = xBound;
    this.yBound = yBound;

    const xStep = (1 / 8) * xBound;
    const yStep = (1 / 8) * yBound;

    const x1 = randomIntInclusive(0, xBound);
    const y1 = randomIntInclusive(0, yBound);
    const x2 = clampToInt(x1 + randomIntInclusive(0, xStep) + 1, 0, xBound);
    const y2 = clampToInt(y1 + randomIntInclusive(0, yStep) + 1, 0, yBound);

    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
  }

  set bounds([x1, y1, x2, y2]) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
  }

  get bounds() {
    const x1 = Math.min(this.x1, this.x2);
    const y1 = Math.min(this.y1, this.y2);
    const x2 = Math.max(this.x1, this.x2);
    const y2 = Math.max(this.y1, this.y2);

    return [x1, y1, x2, y2];
  }

  get svg() {
    const [x1, y1, x2, y2] = this.bounds;
    const shape = [
      'rect',
      {
        x: x1,
        y: y1,
        width: x2 - x1,
        height: y2 - y1
      }
    ];

    return shape;
  }

  clone() {
    const rectangle = new Rect(this.xBound, this.yBound);
    rectangle.bounds = this.bounds;

    return rectangle;
  }

  mutate() {
    const xStep = (1 / 16) * this.xBound;
    const yStep = (1 / 16) * this.yBound;

    switch (randomIntInclusive(0, 1)) {
      case 0:
        this.x1 = clampToInt(this.x1 + randomNormal() * xStep, 0, this.xBound);
        this.y1 = clampToInt(this.y1 + randomNormal() * yStep, 0, this.yBound);
        break;
      case 1:
        this.x2 = clampToInt(this.x2 + randomNormal() * xStep, 0, this.xBound);
        this.y2 = clampToInt(this.y2 + randomNormal() * yStep, 0, this.yBound);
    }
  }

  rasterize() {
    const [x1, y1, x2, y2] = this.bounds;
    const scanlines = [];

    for (let y = y1; y < y2 + 1; y += 1) {
      scanlines.push([y, x1, x2]);
    }

    return scanlines;
  }
}

module.exports = Rect;
