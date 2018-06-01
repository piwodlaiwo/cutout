/* eslint-env jest */

const baboon = require('baboon-image');
const generate = require('./generate');

it('generates a random rectangle correctly', () => {
  const shape = generate.rect(baboon);
  const [type, attributes] = shape;

  const width = baboon.shape[0];
  const height = baboon.shape[1];

  expect(shape.length).toBe(2);
  expect(type).toBe('rect');
  expect(Object.keys(attributes)).toEqual(['x', 'y', 'width', 'height']);
  expect(attributes.x + attributes.width < width).toBe(true);
  expect(attributes.y + attributes.height < height).toBe(true);
});
