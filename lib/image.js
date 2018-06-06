const debug = require('debug')('cutout:image');
const zeros = require('zeros');

/**
 * Creates an image filled with a color
 */

const create = (width, height, color) => {
  const image = zeros([width, height, 3]);

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      image.set(x, y, 0, color[0]);
      image.set(x, y, 1, color[1]);
      image.set(x, y, 2, color[2]);
    }
  }

  debug(`Created image w:${width} h:${height} c:${color}`);
  return image;
};

/**
 * Creates a duplicate image
 */

const clone = image => {
  const width = image.shape[0];
  const height = image.shape[1];
  const result = zeros([width, height, 3]);

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const r = image.get(x, y, 0);
      const g = image.get(x, y, 1);
      const b = image.get(x, y, 2);

      result.set(x, y, 0, r);
      result.set(x, y, 1, g);
      result.set(x, y, 2, b);
    }
  }

  debug(`Cloned image w:${width} h:${height}`);
  return result;
};

/**
 * Draws scanlines onto an image
 */

const draw = (image, color, scanlines) => {
  scanlines.forEach(([y, x1, x2]) => {
    for (let x = x1; x < x2 + 1; x += 1) {
      image.set(x, y, 0, color[0]);
      image.set(x, y, 1, color[1]);
      image.set(x, y, 2, color[2]);
    }
  });

  debug(`Drew scanlines on image`);
  return image;
};

module.exports = {
  clone,
  create,
  draw
};
