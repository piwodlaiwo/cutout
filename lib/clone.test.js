/* eslint-env jest */

const baboon = require('baboon-image');
const clone = require('./clone');

it('correctly clones an image', () => {
  const copy = clone(baboon);
  expect(copy !== baboon).toBe(true);
});
