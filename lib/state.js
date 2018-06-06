const { energy } = require('./compute');

/**
 * Stores the current shape iteration
 */

class State {
  constructor(shape, target, current, buffer) {
    this.shape = shape;
    this.target = target;
    this.current = current;
    this.buffer = buffer;
    this.score = null;
  }

  energy(lastScore) {
    if (this.score === null) {
      this.score = energy(this.shape, this.target, this.current, this.buffer, lastScore);
    }

    return this.score;
  }

  clone() {
    return new State(this.shape.clone(), this.target, this.current, this.buffer);
  }

  mutate() {
    const oldState = this.clone();
    this.shape.mutate();

    return oldState;
  }
}

module.exports = State;
