/* eslint-env jest */

const beerCalc = require('beer-calc');

describe('SRM Color', () => {
  it('should return the expected SRM value (multi-grain)', () => {
    const grains = [{ L: 5, Lbs: 5 }, { L: 10, Lbs: 3 }];
    const batchSize = 5; // gallons
    expect(beerCalc.SRM(grains, batchSize)).toBe(11.309099999999999);
  });
  it('should return the expected SRM value (single grain)', () => {
    const grains = { L: 30, Lbs: 10 };
    const batchSize = 5; // gallons
    expect(beerCalc.SRM(grains, batchSize)).toBe(61.686);
  });
  it('should throw an error if invalid arguments are provided', () => {
    const grains = 'dingus';
    const batchSize = 'five gallons'; // gallons
    expect(() => beerCalc.SRM(grains, batchSize)).toThrow(
      'SRM value is invalid, check your arguments.'
    );
  });
  it('should throw an error if the result is 0', () => {
    const grains = { L: 0, Lbs: 10 };
    const batchSize = 5; // gallons
    expect(() => beerCalc.SRM(grains, batchSize)).toThrow(
      'SRM value is invalid, check your arguments.'
    );
  });
  it('should throw an error if the result is less than 0', () => {
    const grains = { L: -10, Lbs: 10 };
    const batchSize = 5; // gallons
    expect(() => beerCalc.SRM(grains, batchSize)).toThrow(
      'SRM value is invalid, check your arguments.'
    );
  });
});
