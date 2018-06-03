const fs = require('fs');
const save = require('save-pixels');
const streamToPromise = require('stream-to-promise');
const { getAverageImageColor, fillImage, cloneImage, getRMSE, drawScanlines } = require('./util');
const Rect = require('./shapes/Rect');

let currentError = 0;

const cutout = (targetImage, iterations) => {
  const currentImage = fillImage(cloneImage(targetImage), getAverageImageColor(targetImage));
  currentError = getRMSE(currentImage, targetImage);
  console.log('current:', currentError);

  for (let i = 0; i < iterations; i += 1) {
    const width = targetImage.shape[0];
    const height = targetImage.shape[1];

    const rect = new Rect(width, height);
    const newImage = cloneImage(currentImage);

    drawScanlines(rect.toScanlines(), newImage, targetImage);
    const newError = getRMSE(newImage, targetImage);

    if (newError < currentError) {
      console.log(i + ' / ' + iterations + ' : ' + newError);
      drawScanlines(rect.toScanlines(), currentImage, targetImage);
      currentError = newError;
    }
  }

  streamToPromise(save(currentImage, 'png')).then(imageBuffer => {
    fs.writeFileSync('output.png', imageBuffer);
  });
};

module.exports = cutout;

// cutout(require('lena'), 1000);
