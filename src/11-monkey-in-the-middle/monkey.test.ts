import { parseMonkeyInput, performOperation } from './monkey';

import testData from './monkey.test.data';

const parsedMonkeys = {
  0: {
    id: 0,
    items: [79, 98],
    operation: 'old * 19',
    divisible: 23,
    ifTrue: 2,
    ifFalse: 3,
  },
  1: {
    id: 1,
    items: [54, 65, 75, 74],
    operation: 'old + 6',
    divisible: 19,
    ifTrue: 2,
    ifFalse: 0,
  },
  2: {
    id: 2,
    items: [79, 60, 97],
    operation: 'old * old',
    divisible: 13,
    ifTrue: 1,
    ifFalse: 3,
  },
  3: {
    id: 3,
    items: [74],
    operation: 'old + 3',
    divisible: 17,
    ifTrue: 0,
    ifFalse: 1,
  }
};

describe('parseMonkeyInput', () => {
  it('should parse input and turn into monkeys', () => {
    expect(parseMonkeyInput(testData)).toStrictEqual(parsedMonkeys);
  });
});

describe('performOperation', () => {
  it('should be able to sum', () => {
    expect(performOperation('5 + 5', 0)).toBe(10);
    expect(performOperation('old + 5', 3)).toBe(8);
    expect(performOperation('5 + old', 3)).toBe(8);
    expect(performOperation('old + old', 3)).toBe(6);
  });

  it('should be able to multiply', () => {
    expect(performOperation('5 * 5', 0)).toBe(25);
    expect(performOperation('old * 5', 3)).toBe(15);
    expect(performOperation('5 * old', 3)).toBe(15);
    expect(performOperation('old * old', 3)).toBe(9);
  });
});
