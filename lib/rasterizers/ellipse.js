const pointInEllipse = require('point-in-ellipse');
const polygon = require('./polygon');
const { rotateCorner } = require('../util');

/**
 * Returns the bounding box of a(n) (rotated) ellipse
 */

const boundingBox = (cx, cy, rx, ry, angle, xBound, yBound) => {
  let vertices = [[cx - rx, cy - ry], [cx + rx, cy - ry], [cx - rx, cy + ry], [cx + rx, cy + ry]];

  if (angle !== 0) {
    vertices = vertices.map(([x, y]) => rotateCorner(x, y, cx, cy, angle));
  }

  return polygon.boundingBox(vertices, xBound, yBound);
};

/**
 * Rasterizes a(n) (rotated) ellipse to scanlines
 */

const toScanlines = (cx, cy, rx, ry, angle, xBound, yBound) => {
  const scanlines = [];
  const rotation = angle * (Math.PI / 180);
  const { top, left, right, bottom } = boundingBox(cx, cy, rx, ry, angle, xBound, yBound);

  for (let y = top; y < bottom + 1; y += 1) {
    for (let x = left; x < right + 1; x += 1) {
      const inEllipse = pointInEllipse(x, y, cx, cy, rx, ry, rotation);

      if (inEllipse) {
        const index = scanlines.findIndex(scanline => scanline[0] === y);

        if (index < 0) {
          scanlines.push([y, x, x]);
        } else {
          scanlines[index][2] = x;
        }
      }
    }
  }

  return scanlines;
};

module.exports = {
  boundingBox,
  toScanlines
};
