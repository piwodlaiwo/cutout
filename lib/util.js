/**
 * Converts iterator to x and y coordinates when iterating sequentially over a matrix
 */

const getCoordinates = (iteration, width) => {
  const x = Math.round(iteration % width);
  const y = Math.round(Math.floor(iteration / width));

  return [x, y];
};

module.exports = { getCoordinates };
