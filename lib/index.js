/* eslint-disable */

const fs = require('fs');
const save = require('save-pixels');
const streamToPromise = require('stream-to-promise');
const average = require('./average');
const generate = require('./generate');
const draw = require('./draw');
const compare = require('./compare');

let currentError = 0;

const cutout = (targetImage, iterations) => {
  let currentImage = average.all(targetImage);
  currentError = compare(currentImage, targetImage);
  console.log('current:', currentError);

  for (let i = 0; i < iterations; i += 1) {
    const rect = generate.rect(targetImage);
    const newImage = draw.rect(rect, currentImage, targetImage);
    const newError = compare(newImage, targetImage);

    if (newError < currentError) {
      console.log(i + ' / ' + iterations + ' : ' + newError);
      currentImage = draw.rect(rect, currentImage, targetImage);
      currentError = newError;
    }
  }

  streamToPromise(save(currentImage, 'png')).then(imageBuffer => {
    fs.writeFileSync('output.png', imageBuffer);
  });
};

module.exports = cutout;
