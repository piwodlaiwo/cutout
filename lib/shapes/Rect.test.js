/* eslint-env jest */

const Rect = require('./Rect');

it('can mutate', () => {
  const w = 10000;
  const h = 10000;
  const rect = new Rect(w, h);

  const { bounds } = rect;
  rect.mutate();

  expect(rect.bounds).not.toEqual(bounds);
});

it('generates scanlines', () => {
  const w = 10;
  const h = 10;
  const rect = new Rect(w, h);

  expect(() => rect.toScanlines()).not.toThrow();
});
