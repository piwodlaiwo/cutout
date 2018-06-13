const debug = require('debug')('cutout:rasterizer');
const { rotate, boundingBox } = require('points');
const { toPoints, toPath } = require('svg-points');
const { svgPathProperties } = require('svg-path-properties');
const pointInPolygon = require('robust-point-in-polygon');
const pointInEllipse = require('point-in-ellipse');
const bezier = require('bezier');

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
    vertices.push([Math.round(x), Math.round(y)]);
  }

  return vertices;
};

/**
 * Renders a shape to scanlines
 */

const shapeToScanlines = (shape, xBound, yBound, angle) => {
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

  debug('Converted shape to scanlines');
  return scanlines;
};

/**
 * Rasterizes a bezier to scanlines
 */

const bezierToScanlines = (x1, y1, x2, y2, x3, y3, x4, y4, xBound, yBound) => {
  const xPoints = [x1, x2, x3];
  const yPoints = [y1, y2, y3];
  const coordinates = [];
  const scanlines = [];

  // Use coordinates for cubic bezier if available
  if (x4 !== undefined && y4 !== undefined) {
    xPoints.push(x4);
    yPoints.push(y4);
  }

  // Sample the bezier at a fixed interval
  for (let i = 0; i < 1; i += 0.005) {
    const x = Math.round(bezier(xPoints, i));
    const y = Math.round(bezier(yPoints, i));
    coordinates.push([x, y]);
  }

  // Render the coordinates to line segments and rasterize those
  for (let i = 0; i + 1 < coordinates.length; i += 1) {
    const from = coordinates[i];
    const to = coordinates[i + 1];
    const line = {
      type: 'line',
      x1: from[0],
      y1: from[1],
      x2: to[0],
      y2: to[1]
    };
    scanlines.push(...shapeToScanlines(line, xBound, yBound));
  }

  // Return only the unique scanlines
  debug('Converted bezier to scanlines');
  return scanlines.filter((scanline, index) => scanlines.indexOf(scanline) === index);
};

/**
 * Rasterizes an ellipse to scanlines
 */

const ellipseToScanlines = (cx, cy, rx, ry, angle, xBound, yBound) => {
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

  debug('Converted ellipse to scanlines');
  return scanlines;
};

module.exports = {
  shapeToScanlines,
  bezierToScanlines,
  ellipseToScanlines
};
