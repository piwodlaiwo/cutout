const zeros = require('zeros');

/**
 * Returns a random integer between the min and max values
 */

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

/**
 * Calculates the average color of all the pixels in an image
 */

const getAverageImageColor = image => {
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

  return color;
};

/**
 * Calculates the average color of an array of scanlines
 */

const getAverageScanlineColor = (scanlines, image) => {
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

  return color;
};

/**
 * Calculates the root-mean-square error between two images. 0 is equal, 1 is maximum difference.
 */

const getRMSE = (one, two) => {
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

  return Math.sqrt(total / (width * height * 3)) / 255;
};

/**
 * Draws scanlines on an image, sampling colors from target
 */

const drawScanlines = (scanlines, image, target) => {
  const color = getAverageScanlineColor(scanlines, target);

  scanlines.forEach(([y, x1, x2]) => {
    for (let x = x1; x < x2 + 1; x += 1) {
      image.set(x, y, 0, color[0]);
      image.set(x, y, 1, color[1]);
      image.set(x, y, 2, color[2]);
    }
  });

  return image;
};

/**
 * Fills all pixels of an image with a color
 */

const fillImage = (image, color) => {
  const width = image.shape[0];
  const height = image.shape[1];

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      image.set(x, y, 0, color[0]);
      image.set(x, y, 1, color[1]);
      image.set(x, y, 2, color[2]);
    }
  }

  return image;
};

/**
 * Clones an image
 */

const cloneImage = image => {
  const width = image.shape[0];
  const height = image.shape[1];
  const clone = zeros([width, height, 3]);

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const r = image.get(x, y, 0);
      const g = image.get(x, y, 1);
      const b = image.get(x, y, 2);

      clone.set(x, y, 0, r);
      clone.set(x, y, 1, g);
      clone.set(x, y, 2, b);
    }
  }

  return clone;
};

module.exports = {
  cloneImage,
  drawScanlines,
  fillImage,
  getAverageImageColor,
  getAverageScanlineColor,
  getRandomInt,
  getRMSE
};
