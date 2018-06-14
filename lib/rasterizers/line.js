const bresenham = require('bresenham');

/**
 * Rasterizes a straight line to scanlines
 */

const toScanlines = (x1, y1, x2, y2, xBound, yBound) => {
  const scanlines = [];
  const points = bresenham(Math.min(x1, x2), Math.min(y1, y2), Math.max(x1, x2), Math.max(y1, y2));

  points.forEach(({ x, y }) => {
    if (y >= 0 && y <= yBound && x >= 0 && x <= xBound) {
      const index = scanlines.findIndex(scanline => scanline[0] === y);

      if (index < 0) {
        scanlines.push([y, x, x]);
      } else {
        scanlines[index][2] = x;
      }
    }
  });

  return scanlines;
};

module.exports = {
  toScanlines
};
