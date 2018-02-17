import { TIME_UNIT } from './constants';
import * as utils from './utils';

describe('Convert chores to array', () => {
  const now = new Date().getTime();
  const input = {
    'test-chore': {
      lastDone: now,
      frequency: 10,
      pointsPerTime: 100,
      title: 'Test Chore',
    },
    'second-chore': {
      lastDone: now,
      frequency: 10,
      pointsPerTime: 100,
      title: 'Second Chore',
    },
  };
  const result = utils.convertChoresToArray(input, now);

  it('Should convert chores object into array', () => {
    expect(Array.isArray(result)).toBe(true);
  });

  it('Should have the same number of items as the input', () => {
    expect(result.length).toBe(Object.keys(input).length);
  });

  const addedProperties = ['slug', 'due', 'currentPoints', 'percentage'];

  it(`Should add ${addedProperties.length} new properties to chores`, () => {
    expect(Object.keys(result[0]).length)
      .toBe(Object.keys(input[Object.keys(input)[0]]).length + addedProperties.length);
  });

  addedProperties.forEach((prop) => {
    it(`Should add a ${prop} property to chores`, () => {
      expect(result[0]).toHaveProperty(prop);
    });
  });
});

describe('Computed chore properties', () => {
  const now = new Date().getTime();
  const basicChore = {
    lastDone: now,
    frequency: 1,
    pointsPerTime: 100,
    title: 'Test chore',
  };

  const expectedProperties = ['currentPoints', 'due', 'percentage'];

  it(`Should return ${expectedProperties.length} properties`, () => {
    expect(Object.keys(utils.computedChoreProperties(basicChore, now)).length)
      .toBe(expectedProperties.length);
  });

  expectedProperties.forEach((prop) => {
    it(`Should return property ${prop}`, () => {
      expect(utils.computedChoreProperties(basicChore, now)).toHaveProperty(prop);
    });
  });

  it('Should set currentPoints to 0 when lastDone == now', () => {
    expect(utils.computedChoreProperties(basicChore, now).currentPoints).toBe(0);
  });

  it('Should set currentPoints to pointsPerTime when frequency == 0', () => {
    expect(utils.computedChoreProperties({
      ...basicChore,
      frequency: 0,
    }, now).currentPoints).toBe(basicChore.pointsPerTime);
  });

  it('Should set currentPoints to pointsPerTime when lastDone = now - frequency * TIME_UNIT', () => {
    expect(utils.computedChoreProperties({
      ...basicChore,
      lastDone: now - (basicChore.frequency * TIME_UNIT),
    }, now).currentPoints).toBe(basicChore.pointsPerTime);
  });

  it('Should set due to frequency * TIME_UNIT', () => {
    expect(utils.computedChoreProperties(basicChore, now).due)
      .toBe(basicChore.lastDone + (basicChore.frequency * TIME_UNIT));
  });

  it('Should have a percentage of 50 halfway through the chore frequency', () => {
    expect(utils.computedChoreProperties({
      ...basicChore,
      lastDone: now - (basicChore.frequency * TIME_UNIT * 0.5),
    }, now).percentage).toBe(50);
  });

  it('Should set not have a percentage over 100', () => {
    expect(utils.computedChoreProperties({
      ...basicChore,
      lastDone: 0,
    }, now).percentage)
      .toBe(100);
  });
});

describe('Make slug', () => {
  it('Should convert text to lower case', () => {
    expect(utils.makeSlug('ABC')).toBe('abc');
  });

  it('Should convert spaces to dashes', () => {
    expect(utils.makeSlug('a b c')).toBe('a-b-c');
  });

  it('Should trim white space', () => {
    expect(utils.makeSlug(' abc ')).toBe('abc');
  });

  it('Should remove non a-z characters', () => {
    expect(utils.makeSlug('a^b$c_')).toBe('abc');
  });
});
