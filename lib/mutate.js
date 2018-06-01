/* eslint-disable default-case, no-param-reassign */

const random = require('./random');

/**
 * Mutates a rectangle
 */

const rect = (shape, image) => {
  const width = image.shape[0];
  const height = image.shape[1];

  switch (random.int(0, 1)) {
    case 0:
      shape.x1 = random.int(0, width - 1);
      shape.y1 = random.int(0, height - 1);
      break;
    case 1:
      shape.x2 = random.int(0, width - 1);
      shape.y2 = random.int(0, height - 1);
  }

  return shape;
};

module.exports = { rect };
