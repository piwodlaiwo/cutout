const debug = require('debug')('cutout:rasterizer');
const { rotate, boundingBox } = require('points');
const { toPoints, toPath } = require('svg-points');
const { svgPathProperties } = require('svg-path-properties');
const pointInPolygon = require('robust-point-in-polygon');
const pointInEllipse = require('point-in-ellipse');
const simplify = require('simplify-js');
const Bezier = require('bezier-js');

/**
 * Gets the bounding box of the points and limits it to the image bounds
 */

const pointsToBox = (points, xBound, yBound) => {
  const { top, right, bottom, left } = boundingBox(points);

  // Limit the bounding box to the image
  return {
    top: top < 0 ? 0 : Math.round(top),
    right: right > xBound ? xBound : Math.round(right),
    bottom: bottom > yBound ? yBound : Math.round(bottom),
    left: left < 0 ? 0 : Math.round(left)
  };
};

/**
 * Converts a collection of points to an array of vertices
 */

const pointsToVertices = points => {
  const { getTotalLength, getPointAtLength } = svgPathProperties(toPath(points));
  const pathLength = Math.round(getTotalLength());
  const vertices = [];

  // Map points to vertices
  for (let length = 0; length < pathLength; length += 1) {
    const { x, y } = getPointAtLength(length);
    vertices.push({ x: Math.round(x), y: Math.round(y) });
  }

  // Simplify the shape for faster rendering and map to a format compatible with the classifier
  return simplify(vertices).map(({ x, y }) => [x, y]);
};

/**
 * Renders a shape to scanlines
 */

const shapeToScanlines = (shape, xBound, yBound, angle) => {
  debug('Converting shape to scanlines');
  const scanlines = [];
  const points = angle ? rotate(toPoints(shape), angle) : toPoints(shape);
  const vertices = pointsToVertices(points);
  const { top, left, right, bottom } = pointsToBox(points, xBound, yBound);

  // Map points to scanlines object
  for (let y = top; y < bottom + 1; y += 1) {
    for (let x = left; x < right + 1; x += 1) {
      const inPolygon = pointInPolygon(vertices, [x, y]) < 1;

      if (inPolygon) {
        const index = scanlines.findIndex(scanline => scanline[0] === y);

        if (index < 0) {
          scanlines.push([y, x, x]);
        } else {
          scanlines[index][2] = x;
        }
      }
    }
  }

  debug('Done converting shape to scanlines');
  return scanlines;
};

/**
 * Rasterizes a bezier to scanlines
 */

const bezierToScanlines = (coordinates, xBound, yBound) => {
  debug('Converting bezier to scanlines');
  const vertices = [];

  // Generate quadratic bezier with coordinates
  const bezier = new Bezier(...coordinates);
  const pathLength = Math.round(bezier.length());
  const lut = bezier.getLUT(pathLength);

  // Map lookup table to integer vertex coordinates
  lut.forEach(({ x, y }) => {
    vertices.push([Math.round(x), Math.round(y)]);
  });

  // Map vertices to scanlines
  const scanlines = vertices
    // Filter points that aren't displayed
    .filter(([x, y]) => !(y < 0 || y > yBound || x < 0 || x > xBound))
    // Might be a bit suboptimal, each point is its own scanline
    .map(([x, y]) => [y, x, x]);

  debug('Done converting bezier to scanlines');
  return scanlines;
};

/**
 * Rasterizes an ellipse to scanlines
 */

const ellipseToScanlines = ([cx, cy, rx, ry, angle], xBound, yBound) => {
  debug('Converting ellipse to scanlines');
  const scanlines = [];
  const rotation = angle * (Math.PI / 180);

  // Rough bounding box, to minimize the amount of pixels to check
  const max = Math.max(rx, ry);
  const left = cx - max < 0 ? 0 : cx - max;
  const top = cy - max < 0 ? 0 : cy - max;
  const right = cx + max > xBound ? xBound : cx + max;
  const bottom = cy + max > yBound ? yBound : cy + max;

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

  debug('Done converting ellipse to scanlines');
  return scanlines;
};

module.exports = {
  shapeToScanlines,
  bezierToScanlines,
  ellipseToScanlines
};
