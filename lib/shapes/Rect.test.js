/* eslint-env jest */

const Rect = require('./Rect');

it('gets bounds', () => {
  const xBound = 10;
  const yBound = 10;
  const rect = new Rect(xBound, yBound);

  expect(Array.isArray(rect.bounds)).toBe(true);
});

it('sets bounds', () => {
  const xBound = 10;
  const yBound = 10;
  const rect = new Rect(xBound, yBound);

  const { bounds } = rect;
  rect.bounds = [100, 100, 200, 200];

  expect(rect.bounds).not.toEqual(bounds);
});

it('gets svg', () => {
  const xBound = 10;
  const yBound = 10;
  const rect = new Rect(xBound, yBound);
  const { svg } = rect;
  const attrs = ['x', 'y', 'width', 'height'];

  expect(svg[0]).toBe('rect');
  expect(Object.keys(svg[1])).toEqual(attrs);
});

it('can mutate', () => {
  const xBound = 10000;
  const yBound = 10000;
  const rect = new Rect(xBound, yBound);

  const { bounds } = rect;
  rect.mutate();

  expect(rect.bounds).not.toEqual(bounds);
});

it('can rasterize', () => {
  const xBound = 10;
  const yBound = 10;
  const rect = new Rect(xBound, yBound);

  expect(() => rect.rasterize()).not.toThrow();
  expect(Array.isArray(rect.rasterize())).toBe(true);
});

it('can clone itself', () => {
  const xBound = 10;
  const yBound = 10;
  const rect = new Rect(xBound, yBound);
  const clone = rect.clone();

  expect(rect).not.toBe(clone);
  expect(rect.bounds).toEqual(clone.bounds);
});
