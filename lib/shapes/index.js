const debug = require('debug')('cutout:shapes');
const { randomArrayItem } = require('../util');
const Circle = require('./Circle');
const Ellipse = require('./Ellipse');
const Square = require('./Square');
const Rect = require('./Rect');
const RotatedRect = require('./RotatedRect');
const Triangle = require('./Triangle');
const Line = require('./Line');

/**
 * Create a shape of the supplied type
 */

const create = (shapeType, xBound, yBound) => {
  debug(`Creating ${shapeType}`);

  /* istanbul ignore next */
  switch (shapeType.toLowerCase()) {
    case 'circle':
      return new Circle(xBound, yBound);
    case 'ellipse':
      return new Ellipse(xBound, yBound);
    case 'square':
      return new Square(xBound, yBound);
    case 'rect':
      return new Rect(xBound, yBound);
    case 'rotatedrect':
      return new RotatedRect(xBound, yBound);
    case 'triangle':
      return new Triangle(xBound, yBound);
    case 'line':
      return new Line(xBound, yBound);
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
