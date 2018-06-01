const parseColor = require('parse-color');
const clone = require('./clone');

/**
 * Converts iterator to x and y coordinates when iterating sequentially over a matrix
 */

const getCoordinates = (iteration, width) => {
  const x = Math.round(iteration % width);
  const y = Math.round(Math.floor(iteration / width));

  return [x, y];
};

/**
 * Draws a rectangle shape object to a clone of an existing ndarray
 */

const rect = (shape, image) => {
  const aligned = {
    x1: shape.x1 < shape.x2 ? shape.x1 : shape.x2,
    y1: shape.y1 < shape.y2 ? shape.y1 : shape.y2,
    x2: shape.x2 > shape.x1 ? shape.x2 : shape.x1,
    y2: shape.y2 > shape.y1 ? shape.y2 : shape.y1
  };

  const imageWidth = image.shape[0];
  const imageHeight = image.shape[1];
  const shapeWidth = aligned.x2 - aligned.x1;
  const shapeHeight = aligned.y2 - aligned.y1;

  const copy = clone(image);

  const pixels = shapeWidth * shapeHeight;
  const { rgb } = parseColor(attributes.fill);

  for (let currentPixel = 0; currentPixel < pixels; currentPixel += 1) {
    let [currentX, currentY] = getCoordinates(currentPixel, shapeWidth);

    // Correct for x and y offset
    currentX += aligned.x1;
    currentY += aligned.y1;

    // Skip pixels that are not inside the image
    if (currentX > imageWidth - 1 || currentY > imageHeight - 1) {
      // eslint-disable-next-line no-continue
      continue;
    }

    copy.set(currentX, currentY, 0, rgb[0]);
    copy.set(currentX, currentY, 1, rgb[1]);
    copy.set(currentX, currentY, 2, rgb[2]);
  }

  return copy;
};

module.exports = { rect };
