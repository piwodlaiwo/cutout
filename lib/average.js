const zeros = require('zeros');
const util = require('./util');

const all = image => {
  const color = [0, 0, 0];
  const width = image.shape[0];
  const height = image.shape[1];

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      color[0] += image.get(x, y, 0);
      color[1] += image.get(x, y, 1);
      color[2] += image.get(x, y, 2);
    }
  }

  color[0] = Math.round(color[0] / (width * height));
  color[1] = Math.round(color[1] / (width * height));
  color[2] = Math.round(color[2] / (width * height));

  const result = zeros([width, height, 3]);

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      result.set(x, y, 0, color[0]);
      result.set(x, y, 1, color[1]);
      result.set(x, y, 2, color[2]);
    }
  }

  return result;
};

const rect = (shape, image) => {
  const imageWidth = image.shape[0];
  const imageHeight = image.shape[1];
  const shapeWidth = shape.x2 - shape.x1;
  const shapeHeight = shape.y2 - shape.y1;
  const color = [0, 0, 0];
  const pixels = shapeWidth * shapeHeight;
  let usedPixels = 0;

  for (let currentPixel = 0; currentPixel < pixels; currentPixel += 1) {
    let [currentX, currentY] = util.getCoordinates(currentPixel, shapeWidth);

    // Correct for x and y offset
    currentX += shape.x1;
    currentY += shape.y1;

    // Skip pixels that are not inside the image
    if (currentX > imageWidth - 1 || currentY > imageHeight - 1) {
      // eslint-disable-next-line no-continue
      continue;
    }

    usedPixels += 1;
    color[0] += image.get(currentX, currentY, 0);
    color[1] += image.get(currentX, currentY, 1);
    color[2] += image.get(currentX, currentY, 2);
  }

  color[0] = Math.round(color[0] / usedPixels);
  color[1] = Math.round(color[1] / usedPixels);
  color[2] = Math.round(color[2] / usedPixels);

  return color;
};

module.exports = { all, rect };
