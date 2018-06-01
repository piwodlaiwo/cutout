const zeros = require('zeros');

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

  return result;
};

module.exports = clone;
