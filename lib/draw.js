const clone = require('./clone');
const average = require('./average');
const util = require('./util');

/**
 * Draws a rectangle shape object to a clone of an existing ndarray
 */

const rect = (shape, currentImage, targetImage) => {
  const aligned = {
    x1: shape.x1 < shape.x2 ? shape.x1 : shape.x2,
    y1: shape.y1 < shape.y2 ? shape.y1 : shape.y2,
    x2: shape.x2 > shape.x1 ? shape.x2 : shape.x1,
    y2: shape.y2 > shape.y1 ? shape.y2 : shape.y1
  };

  const imageWidth = currentImage.shape[0];
  const imageHeight = currentImage.shape[1];
  const shapeWidth = aligned.x2 - aligned.x1;
  const shapeHeight = aligned.y2 - aligned.y1;

  const copy = clone(currentImage);

  const pixels = shapeWidth * shapeHeight;
  const color = average.rect(aligned, targetImage);

  for (let currentPixel = 0; currentPixel < pixels; currentPixel += 1) {
    let [currentX, currentY] = util.getCoordinates(currentPixel, shapeWidth);

    // Correct for x and y offset
    currentX += aligned.x1;
    currentY += aligned.y1;

    // Skip pixels that are not inside the image
    if (currentX > imageWidth - 1 || currentY > imageHeight - 1) {
      // eslint-disable-next-line no-continue
      continue;
    }

    copy.set(currentX, currentY, 0, color[0]);
    copy.set(currentX, currentY, 1, color[1]);
    copy.set(currentX, currentY, 2, color[2]);
  }

  return copy;
};

module.exports = { rect };
