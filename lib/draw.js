const parseColor = require('parse-color');

/**
 * Converts iterator to x and y coordinates when iterating sequentially over a matrix
 */

const getCoordinates = (iteration, width) => {
  const x = Math.round(iteration % width);
  const y = Math.round(Math.floor(iteration / width));

  return [x, y];
};

/**
 * Draws a rectangle in an existing ndarray
 */

const rect = (shape, image) => {
  if (shape.length < 2) {
    throw new Error('Rectangle does not have the required attributes');
  }

  const imageWidth = image.shape[0];
  const imageHeight = image.shape[1];

  const attributes = shape[1];
  const pixels = attributes.width * attributes.height;
  const { rgba } = parseColor(attributes.fill);

  for (let currentPixel = 0; currentPixel < pixels; currentPixel += 1) {
    let [currentX, currentY] = getCoordinates(currentPixel, attributes.width);

    // Correct for x and y offset
    currentX += attributes.x;
    currentY += attributes.y;

    // Skip pixels that are not inside the image
    if (currentX > imageWidth - 1 || currentY > imageHeight - 1) {
      continue;
    }

    image.set(currentX, currentY, 0, rgba[0]);
    image.set(currentX, currentY, 1, rgba[1]);
    image.set(currentX, currentY, 2, rgba[2]);
  }

  return image;
}

module.exports = { rect };
