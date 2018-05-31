/* eslint-env jest */

const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');
const save = require('save-pixels');
const baboon = require('baboon-image');
const streamToPromise = require('stream-to-promise');
const equal = require('assert-dir-equal');
const averageColors = require('./average-colors');

it('correctly averages all colors in an image to a single color', () => {
  const fixture = path.join(__dirname, '..', 'test', 'fixtures', 'average');
  const output = path.join(fixture, 'output');
  const expected = path.join(fixture, 'expected');

  expect.assertions(1);
  rimraf.sync(output);
  fs.mkdirSync(output);

  const image = averageColors(baboon);

  return streamToPromise(save(image, 'png')).then(imageBuffer => {
    fs.writeFileSync(path.join(fixture, 'output', 'output.png'), imageBuffer);
    expect(() => equal(output, expected)).not.toThrow();
  })
});
