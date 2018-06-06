const debug = require('debug')('cutout:shapes');
const { randomArrayItem } = require('../util');
const Rect = require('./Rect');

/**
 * Create a shape of the supplied type
 */

const create = (shapeType, xBound, yBound) => {
  debug(`Creating ${shapeType}`);

  switch (shapeType.toLowerCase()) {
    case 'rect':
      return new Rect(xBound, yBound);
    default:
      throw new Error(`${shapeType} is not a valid shape type`);
  }
};

/**
 * Creates a random shape from the types supplied
 */

const randomShapeOf = (shapeTypes, xBound, yBound) =>
  create(randomArrayItem(shapeTypes), xBound, yBound);

module.exports = { randomShapeOf };
