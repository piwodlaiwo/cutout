/* eslint-env jest */

const isNdarray = require('isndarray');
const baboon = require('baboon-image');
const Cutout = require('.');

it('approximates a raster image with shapes', () => {
  const cutout = new Cutout(baboon, {
    amountOfShapes: 2,
    amountOfAttempts: 2
  });
  const start = cutout.difference;
  cutout.step().step();

  expect(cutout.difference).toBeLessThan(start);
  expect(cutout.shapes.length).toBeGreaterThan(0);
  expect(isNdarray(cutout.image)).toBe(true);
});
