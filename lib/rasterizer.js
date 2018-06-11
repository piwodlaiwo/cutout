const debug = require('debug')('cutout:rasterizer');
const { rotate, boundingBox } = require('points');
const { toPoints, toPath } = require('svg-points');
const { svgPathProperties } = require('svg-path-properties');
const classifyPoint = require('robust-point-in-polygon');
const simplify = require('simplify-js');

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

  /**
   * Map points to scanlines object
   */

  for (let y = top; y < bottom + 1; y += 1) {
    for (let x = left; x < right + 1; x += 1) {
      const onShape = classifyPoint(vertices, [x, y]) < 1;

      if (onShape) {
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

module.exports = {
  shapeToScanlines
};
