const random = require('./random');

/**
 * Generates a random rectangle that fits in the supplied image
 */

const rect = image => {
  const width = image.shape[0];
  const height = image.shape[1];

  const x1 = random.int(0, width - 1);
  const y1 = random.int(0, height - 1);

  const x2 = random.int(0, width - 1);
  const y2 = random.int(0, height - 1);

  return { x1, y1, x2, y2 };
};

module.exports = { rect };
