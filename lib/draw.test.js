/* eslint-env jest */

const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');
const save = require('save-pixels');
const baboon = require('baboon-image');
const streamToPromise = require('stream-to-promise');
const equal = require('assert-dir-equal');
const draw = require('./draw');

it('draws a rectangle on top of an image', () => {
  const fixture = path.join(__dirname, '..', 'test', 'fixtures', 'draw-rectangle');
  const output = path.join(fixture, 'output');
  const expected = path.join(fixture, 'expected');

  expect.assertions(1);
  rimraf.sync(output);
  fs.mkdirSync(output);

  const shape = [
    'rect',
    {
      x: 10,
      y: 10,
      width: 30,
      height: 30,
      fill: 'black'
    }
  ];
  const image = draw.rect(shape, baboon);

  return streamToPromise(save(image, 'png')).then(imageBuffer => {
    fs.writeFileSync(path.join(fixture, 'output', 'output.png'), imageBuffer);
    expect(() => equal(output, expected)).not.toThrow();
  });
});
