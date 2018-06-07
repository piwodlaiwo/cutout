const debug = require('debug')('cutout:main');
const isNdarray = require('isndarray');
const Model = require('./model');
const { backgroundColor } = require('./compute');

/** Render a raster image to a collection of shapes */

class Cutout {
  /**
   * @param {ndarray} target The image to render to svg
   * @param {Object} [options] Configuration options
   * @param {number} [options.alpha=255] The opacity of the shapes (0-255)
   * @param {string[]} [options.shapeTypes=['rect']] The types of shapes to use when generating the image
   * @param {number} [options.amountOfShapes=1000] The number of shapes to try per step
   * @param {number} [options.amountOfAttempts=100] The number of times to mutate each candidate shape
   */

  /* istanbul ignore next */
  constructor(target, options = {}) {
    const settings = Object.assign(
      {
        alpha: 255,
        shapeTypes: ['rect'],
        amountOfShapes: 1000,
        amountOfAttempts: 100
      },
      options
    );

    if (!isNdarray(target)) {
      throw new Error('Supplied image is not an ndarray');
    }

    debug('Starting cutout with these settings', settings);
    this.settings = settings;
    this.model = new Model(target, backgroundColor(target));
  }

  /**
   * Get the current image
   * @return {ndarray} The current image
   */

  get image() {
    return this.model.image;
  }

  /**
   * Get the current shapes
   * @return {Array} The current shapes
   */

  get shapes() {
    return this.model.shapes;
  }

  /**
   * Get the current difference
   * @return {number} The current difference
   */

  get difference() {
    return this.model.difference;
  }

  /**
   * Add a single new shape
   * @return {this} The class instance
   */

  step() {
    this.model.step(
      this.settings.shapeTypes,
      this.settings.alpha,
      this.settings.amountOfShapes,
      this.settings.amountOfAttempts
    );

    return this;
  }
}

module.exports = Cutout;
