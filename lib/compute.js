const debug = require('debug')('cutout:compute');
const { draw } = require('./image');

/**
 * Calculates the average color of all the pixels in an image
 */

const backgroundColor = image => {
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

  debug('Computed background color', color);
  return color;
};

/**
 * Calculates the average color of all pixels in an array of scanlines
 */

const scanlineColor = (image, scanlines) => {
  const color = [0, 0, 0];
  let pixels = 0;

  scanlines.forEach(([y, x1, x2]) => {
    for (let x = x1; x < x2 + 1; x += 1) {
      color[0] += image.get(x, y, 0);
      color[1] += image.get(x, y, 1);
      color[2] += image.get(x, y, 2);
      pixels += 1;
    }
  });

  color[0] = Math.round(color[0] / pixels);
  color[1] = Math.round(color[1] / pixels);
  color[2] = Math.round(color[2] / pixels);

  debug('Computed scanline color', color);
  return color;
};

/**
 * Calculates the root-mean-square error between two images
 */

const differenceFull = (one, two) => {
  const width = one.shape[0];
  const height = one.shape[1];
  let total = 0;

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const difference = [
        one.get(x, y, 0) - two.get(x, y, 0),
        one.get(x, y, 1) - two.get(x, y, 1),
        one.get(x, y, 2) - two.get(x, y, 2)
      ];

      total += difference[0] ** 2 + difference[1] ** 2 + difference[2] ** 2;
    }
  }

  const difference = Math.sqrt(total / (width * height * 3)) / 255;

  debug('Computed full difference', difference);
  return difference;
};

/**
 * Calculates the root-mean-square error between the parts of the two images within the scanlines
 */

const differencePartial = (target, before, after, score, scanlines) => {
  const width = target.shape[0];
  const height = target.shape[1];
  const rgbaCount = width * height * 3;
  let total = (score * 255) ** 2 * rgbaCount;

  scanlines.forEach(([y, x1, x2]) => {
    for (let x = x1; x < x2 + 1; x += 1) {
      const diffBefore = [
        target.get(x, y, 0) - before.get(x, y, 0),
        target.get(x, y, 1) - before.get(x, y, 1),
        target.get(x, y, 2) - before.get(x, y, 2)
      ];

      const diffAfter = [
        target.get(x, y, 0) - after.get(x, y, 0),
        target.get(x, y, 1) - after.get(x, y, 1),
        target.get(x, y, 2) - after.get(x, y, 2)
      ];

      total -= diffBefore[0] ** 2 + diffBefore[1] ** 2 + diffBefore[2] ** 2;
      total += diffAfter[0] ** 2 + diffAfter[1] ** 2 + diffAfter[2] ** 2;
    }
  });

  const difference = Math.sqrt(total / rgbaCount) / 255;

  debug('Computed partial difference', difference);
  return difference;
};

/**
 * Calculates a measure of the improvement adding the shape provides, lower energy is better
 */

const energy = (shape, target, current, buffer, score) => {
  const scanlines = shape.rasterize();
  const color = scanlineColor(target, scanlines);

  draw(buffer, color, scanlines);
  const result = differencePartial(target, current, buffer, score, scanlines);

  debug('Computed energy', result);
  return result;
};

module.exports = {
  backgroundColor,
  scanlineColor,
  differenceFull,
  differencePartial,
  energy
};
