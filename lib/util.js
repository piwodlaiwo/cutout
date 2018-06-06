const randomNormal = require('d3-random').randomNormal();

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
  clampToInt,
  randomIntInclusive,
  randomArrayItem,
  randomNormal
};
