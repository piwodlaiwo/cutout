const { getRandomInt } = require('../util');

/**
 * Expects 1-based width and height of the target image
 */

class Rect {
  constructor(w, h) {
    this.w = w;
    this.h = h;

    this.x1 = getRandomInt(0, w - 1);
    this.y1 = getRandomInt(0, h - 1);

    this.x2 = getRandomInt(0, w - 1);
    this.y2 = getRandomInt(0, h - 1);
  }

  get bounds() {
    const x1 = this.x1 < this.x2 ? this.x1 : this.x2;
    const y1 = this.y1 < this.y2 ? this.y1 : this.y2;
    const x2 = this.x2 > this.x1 ? this.x2 : this.x1;
    const y2 = this.y2 > this.y1 ? this.y2 : this.y1;

    return [x1, y1, x2, y2];
  }

  mutate() {
    /* istanbul ignore next */
    switch (getRandomInt(0, 1)) {
      case 0:
        this.x1 = getRandomInt(0, this.w - 1);
        this.y1 = getRandomInt(0, this.h - 1);
        break;
      case 1:
        this.x2 = getRandomInt(0, this.w - 1);
        this.y2 = getRandomInt(0, this.h - 1);
    }
  }

  toScanlines() {
    const [x1, y1, x2, y2] = this.bounds;
    const scanlines = [];

    for (let y = y1; y < y2 + 1; y += 1) {
      scanlines.push([y, x1, x2]);
    }

    return scanlines;
  }
}

module.exports = Rect;
