const randomNormal = require('d3-random').randomNormal();

/**
 * Deduplicate a multidimensional array (an array of arrays)
 */

const deduplicateArrayOfArrays = input => {
  const cache = new Set();
  const output = [];

  for (let i = 0; i < input.length; i += 1) {
    const key = input[i].join(',');

    if (!cache.has(key)) {
      output.push(input[i]);
      cache.add(key);
    }
  }

  return output;
};

/**
 * Rotates corner of a rectangle around the rectangle's center
 * @param {number} x x coordinate of point to rotate
 * @param {number} y y coordinate of point to rotate
 * @param {number} cx center of rectangle on x-axis
 * @param {number} cy center of rectangle on y-axis
 * @param {number} angle angle of rotation
 */

const rotateCorner = (x, y, cx, cy, angle) => {
  // Translate point to origin
  const originX = x - cx;
  const originY = y - cy;

  // Apply rotation
  const rotatedX = originX * Math.cos(angle) - originY * Math.sin(angle);
  const rotatedY = originX * Math.sin(angle) + originY * Math.cos(angle);

  // Translate back
  return [Math.round(rotatedX + cx), Math.round(rotatedY + cy)];
};

/**
 * Returns a random array item
 */

const randomArrayItem = items => items[Math.floor(Math.random() * items.length)];

/**
 * Returns a random integer between the min and max values, including the min and max values
 */

const randomIntInclusive = (min, max) => {
  const floor = Math.ceil(min);
  const ceil = Math.floor(max);

  return Math.floor(Math.random() * (ceil - floor + 1)) + floor;
};

/**
 * Returns a number between the min and max values, including the min and max values
 */

const clampToInt = (number, min, max) => {
  if (number < min) {
    return Math.round(min);
  }

  if (max < number) {
    return Math.round(max);
  }

  return Math.round(number);
};

module.exports = {
  rotateCorner,
  clampToInt,
  randomIntInclusive,
  randomArrayItem,
  randomNormal,
  deduplicateArrayOfArrays
};
