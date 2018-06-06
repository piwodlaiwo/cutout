/* eslint-env jest */

const zeros = require('zeros');
const { create } = require('./image');
const { backgroundColor, scanlineColor, differenceFull, differencePartial } = require('./compute');

it('calculates background color', () => {
  const image = zeros([10, 10, 3]);
  const color = backgroundColor(image);

  expect(color).toEqual([0, 0, 0]);
});

it('calculates scanline color', () => {
  const image = zeros([10, 10, 3]);
  const scanlines = [[0, 0, 5], [1, 1, 3]];
  const color = scanlineColor(image, scanlines);

  expect(color).toEqual([0, 0, 0]);
});

it('calculates the full difference between two identical images', () => {
  const one = zeros([10, 10, 3]);
  const two = zeros([10, 10, 3]);
  const difference = differenceFull(one, two);

  expect(difference).toBe(0);
});

it('calculates the partial difference between two identical images', () => {
  const target = zeros([10, 10, 3]);
  const before = zeros([10, 10, 3]);
  const after = zeros([10, 10, 3]);
  const score = 0;
  const scanlines = [[0, 0, 5], [1, 1, 3]];
  const difference = differencePartial(target, before, after, score, scanlines);

  expect(difference).toBe(0);
});

it('calculates the full difference between two different images', () => {
  const one = zeros([10, 10, 3]);
  const two = create(10, 10, [255, 0, 0]);
  const difference = differenceFull(one, two);

  expect(difference).toBeGreaterThan(0);
});

it('calculates the partial difference between two different images', () => {
  const target = zeros([10, 10, 3]);
  const before = zeros([10, 10, 3]);
  const after = create(10, 10, [255, 0, 0]);
  const score = 0;
  const scanlines = [[0, 0, 5], [1, 1, 3]];
  const difference = differencePartial(target, before, after, score, scanlines);

  expect(difference).toBeGreaterThan(0);
});
