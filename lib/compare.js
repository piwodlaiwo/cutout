/**
 * Compares two ndarrays and returns the RMS error as a measure of similarity
 */

const compare = (one, two) => {
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

module.exports = compare;
