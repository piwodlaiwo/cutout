/* eslint-env jest */

const baboon = require('baboon-image');
const mutate = require('./mutate');

it('mutates a random rectangle correctly', () => {
  const original = {
    x1: 0,
    y1: 0,
    x2: 10,
    y2: 10
  };
  const shape = Object.assign({}, original);

  mutate.rect(shape, baboon);
  expect(shape).not.toEqual(original);
});
