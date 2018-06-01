/* eslint-env jest */

const baboon = require('baboon-image');
const lena = require('lena');
const compare = require('./compare');

it('correctly compares two identical images', () => {
  const rmse = compare(lena, lena);
  expect(rmse).toBe(0);
});

it('correctly compares two different images', () => {
  const rmse = compare(lena, baboon);
  expect(rmse).toMatchSnapshot();
});
