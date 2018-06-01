const zeros = require('zeros');

const average = image => {
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

module.exports = average;
