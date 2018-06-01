/* eslint-env jest */

const baboon = require('baboon-image');
const generate = require('./generate');

it('generates a random rectangle correctly', () => {
  const shape = generate.rect(baboon);

  const width = baboon.shape[0];
  const height = baboon.shape[1];

  expect(Object.keys(shape)).toEqual(['x1', 'y1', 'x2', 'y2']);
  expect(shape.x1 < width - 1).toBe(true);
  expect(shape.y1 < height - 1).toBe(true);
  expect(shape.x2 < width - 1).toBe(true);
  expect(shape.y2 < height - 1).toBe(true);
});
