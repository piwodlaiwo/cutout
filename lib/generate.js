const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

/**
 * Generates a random rectangle that fits in the supplied image
 */

const rect = image => {
  const width = image.shape[0];
  const height = image.shape[1];

  const x1 = getRandomInt(0, width - 1);
  const y1 = getRandomInt(0, height - 1);

  const x2 = getRandomInt(0, width - 1);
  const y2 = getRandomInt(0, height - 1);

  const from = [x1 < x2 ? x1 : x2, y1 < y2 ? y1 : y2];

  const to = [x1 > x2 ? x1 : x2, y1 > y2 ? y1 : y2];

  const shape = [
    'rect',
    {
      x: from[0],
      y: from[1],
      width: to[0] - from[0],
      height: to[1] - from[1]
    }
  ];

  return shape;
};

module.exports = { rect };
