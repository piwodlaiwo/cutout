const debug = require('debug')('cutout:hillclimb');
const State = require('./state');
const { randomShapeOf } = require('./shapes');

/**
 * Gets the best state using a random algorithm
 */

const bestRandomState = (shapeTypes, amountOfShapes, target, current, buffer, lastScore) => {
  debug('Searching for best random state');
  const xBound = current.shape[0] - 1;
  const yBound = current.shape[1] - 1;

  let bestEnergy = 0;
  let bestState = null;

  for (let i = 0; i < amountOfShapes; i += 1) {
    const shape = randomShapeOf(shapeTypes, xBound, yBound);
    const state = new State(shape, target, current, buffer);
    const energy = state.energy(lastScore);

    /* istanbul ignore next */
    if (i === 0 || energy < bestEnergy) {
      bestEnergy = energy;
      bestState = state;
    }
  }

  debug('Found best random state');
  return bestState;
};

/**
 * Hill climbing optimization algorithm, attempts to minimize energy (the error/difference)
 */

const hillClimb = (state, amountOfAttempts, lastScore) => {
  let currentState = state.clone();
  let bestState = state.clone();
  let bestEnergy = state.energy(lastScore);
  let attempt = 0;

  while (attempt < amountOfAttempts) {
    const undo = currentState.mutate();
    const energy = currentState.energy(lastScore);

    if (energy >= bestEnergy) {
      currentState = undo;
    } else {
      bestEnergy = energy;
      bestState = currentState.clone();
      attempt = -1;
    }

    attempt += 1;
  }

  return bestState;
};

/**
 * Gets the best state using a hill climbing algorithm
 */

const bestHillClimbState = (
  shapeTypes,
  amountOfShapes,
  amountOfAttempts,
  target,
  current,
  buffer,
  lastScore
) => {
  debug('Starting hillclimb');
  let state = bestRandomState(shapeTypes, amountOfShapes, target, current, buffer, lastScore);
  state = hillClimb(state, amountOfAttempts, lastScore);

  debug('Found optimal hillclimb state');
  return state;
};

module.exports = bestHillClimbState;
