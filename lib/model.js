const debug = require('debug')('cutout:model');
const hillclimb = require('./hillclimb');
const { draw, create, clone } = require('./image');
const { scanlineColor, differenceFull, differencePartial } = require('./compute');

/**
 * Model for the optimization/fitting algorithm
 */

class Model {
  constructor(target, backgroundColor) {
    const width = target.shape[0];
    const height = target.shape[1];
    const current = create(width, height, backgroundColor);
    const buffer = create(width, height, backgroundColor);

    this.width = width;
    this.height = height;
    this.target = target;
    this.current = current;
    this.buffer = buffer;
    this.score = differenceFull(target, current);
    this.results = [];
  }

  get image() {
    return this.current;
  }

  get shapes() {
    return this.results;
  }

  get difference() {
    return this.score;
  }

  step(shapeTypes, amountOfShapes, amountOfAttempts) {
    debug('Calculating next step');

    const state = hillclimb(
      shapeTypes,
      amountOfShapes,
      amountOfAttempts,
      this.target,
      this.current,
      this.buffer,
      this.score
    );
    this.addShape(state.shape);

    debug('Step completed');
  }

  addShape(shape) {
    const before = clone(this.current);
    const scanlines = shape.rasterize();
    const color = scanlineColor(this.target, scanlines);

    draw(this.current, color, scanlines);
    const score = differencePartial(this.target, before, this.current, this.score, scanlines);

    this.score = score;
    this.results.push({ shape, color, score });
  }
}

module.exports = Model;
