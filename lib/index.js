const debug = require('debug')('cutout:main');
const isNdarray = require('isndarray');
const Model = require('./model');
const { backgroundColor } = require('./compute');

/**
 * Render a raster image to a collection of shapes
 */

class Cutout {
  /* istanbul ignore next */
  constructor(target, options = {}) {
    const defaults = {
      shapeTypes: ['rect'],
      amountOfShapes: 1000,
      amountOfAttempts: 100
    };
    const settings = Object.assign(defaults, options);

    if (!isNdarray(target)) {
      throw new Error('Supplied image is not an ndarray');
    }

    debug('Starting cutout with these settings', settings);
    this.settings = settings;
    this.model = new Model(target, backgroundColor(target));
  }

  get image() {
    return this.model.image;
  }

  get shapes() {
    return this.model.shapes;
  }

  get difference() {
    return this.model.difference;
  }

  step() {
    this.model.step(
      this.settings.shapeTypes,
      this.settings.amountOfShapes,
      this.settings.amountOfAttempts
    );

    return this;
  }
}

module.exports = Cutout;
