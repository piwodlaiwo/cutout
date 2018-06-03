/* eslint-env jest */

const baboon = require('baboon-image');
const lena = require('lena');
const zeros = require('zeros');
const path = require('path');
const fs = require('fs');
const rimraf = require('rimraf');
const streamToPromise = require('stream-to-promise');
const save = require('save-pixels');
const equal = require('assert-dir-equal');
const {
  getRMSE,
  getAverageImageColor,
  drawScanlines,
  getRandomInt,
  fillImage,
  cloneImage
} = require('./util');

it('correctly clones an image', () => {
  const image = zeros([10, 10, 3]);
  const clone = cloneImage(image);

  expect(clone).not.toBe(image);
  expect(clone).toEqual(image);
});

it('compares two identical images', () => {
  const rmse = getRMSE(lena, lena);
  expect(rmse).toBe(0);
});

it('compares two different images', () => {
  const rmse = getRMSE(lena, baboon);
  expect(rmse > 0).toBe(true);
});

it('averages all colors in an image', () => {
  const color = getAverageImageColor(baboon);
  expect(color).toEqual([137, 129, 113]);
});

it('generates random numbers between min and max', () => {
  const min = 0;
  const max = 100000;

  const one = getRandomInt(min, max);
  const two = getRandomInt(min, max);

  expect(one).not.toEqual(two);
  expect(one > min && one < max).toBe(true);
  expect(two > min && two < max).toBe(true);
});

it('draws scanlines on top of an image', () => {
  const fixture = path.join(__dirname, '..', 'test', 'fixtures', 'draw-scanlines');
  const output = path.join(fixture, 'output');
  const expected = path.join(fixture, 'expected');

  expect.assertions(1);
  rimraf.sync(output);
  fs.mkdirSync(output);

  const width = baboon.shape[0];
  const height = baboon.shape[1];
  const image = zeros([width, height, 3]);

  const scanlines = [[0, 0, width - 1], [1, 0, width - 1]];
  const result = drawScanlines(scanlines, image, baboon);

  return streamToPromise(save(result, 'png')).then(buffer => {
    fs.writeFileSync(path.join(fixture, 'output', 'output.png'), buffer);
    expect(() => equal(output, expected)).not.toThrow();
  });
});

it('fills an image with color', () => {
  const fixture = path.join(__dirname, '..', 'test', 'fixtures', 'fill-color');
  const output = path.join(fixture, 'output');
  const expected = path.join(fixture, 'expected');

  expect.assertions(1);
  rimraf.sync(output);
  fs.mkdirSync(output);

  const color = [255, 0, 0];
  const image = zeros([10, 10, 3]);
  const result = fillImage(image, color);

  return streamToPromise(save(result, 'png')).then(buffer => {
    fs.writeFileSync(path.join(fixture, 'output', 'output.png'), buffer);
    expect(() => equal(output, expected)).not.toThrow();
  });
});
