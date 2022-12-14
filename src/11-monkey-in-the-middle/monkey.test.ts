import {
  doMonkeyRounds,
  getMonkeyBusiness,
  parseMonkeyInput,
  performOperation,
} from './monkey';
import testData from './monkey.test.data';

const parsedMonkeys = () => ({
  0: {
    id: 0,
    inspections: 0,
    items: [79, 98],
    operation: 'old * 19',
    divisible: 23,
    ifTrue: 2,
    ifFalse: 3,
  },
  1: {
    id: 1,
    inspections: 0,
    items: [54, 65, 75, 74],
    operation: 'old + 6',
    divisible: 19,
    ifTrue: 2,
    ifFalse: 0,
  },
  2: {
    id: 2,
    inspections: 0,
    items: [79, 60, 97],
    operation: 'old * old',
    divisible: 13,
    ifTrue: 1,
    ifFalse: 3,
  },
  3: {
    id: 3,
    inspections: 0,
    items: [74],
    operation: 'old + 3',
    divisible: 17,
    ifTrue: 0,
    ifFalse: 1,
  }
});

describe('parseMonkeyInput', () => {
  it('should parse input and turn into monkeys', () => {
    expect(parseMonkeyInput(testData)).toMatchObject(parsedMonkeys());
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

describe('doMonkeyRounds', () => {
  it('can perform a round of monkey item throwing', () => {
    const monkeys = parsedMonkeys();

    monkeys[0].items = [20, 23, 27, 26];
    monkeys[0].inspections = 2;
    monkeys[1].items = [2080, 25, 167, 207, 401, 1046];
    monkeys[1].inspections = 4;
    monkeys[2].items = [];
    monkeys[2].inspections = 3;
    monkeys[3].items = [];
    monkeys[3].inspections = 5;

    expect(doMonkeyRounds(parsedMonkeys())).toMatchObject(monkeys);
  });

  it('can perform 20 rounds of monkey item throwing', () => {
    const monkeys = parsedMonkeys();

    monkeys[0].items = [10, 12, 14, 26, 34];
    monkeys[0].inspections = 101;
    monkeys[1].items = [245, 93, 53, 199, 115];
    monkeys[1].inspections = 95;
    monkeys[2].items = [];
    monkeys[2].inspections = 7;
    monkeys[3].items = [];
    monkeys[3].inspections = 105;

    expect(doMonkeyRounds(parsedMonkeys(), 20)).toMatchObject(monkeys);
  });
});

describe('doMonkeyRounds with extra worry', () => {
  it('can handle other worry rules', () => {
    const monkeys = doMonkeyRounds(parsedMonkeys(), 1, false);

    expect(monkeys[0].inspections).toBe(2);
    expect(monkeys[1].inspections).toBe(4);
    expect(monkeys[2].inspections).toBe(3);
    expect(monkeys[3].inspections).toBe(6);
  });

  it('can handle other worry rules 20 rounds', () => {
    const monkeys = doMonkeyRounds(parsedMonkeys(), 20, false);

    expect(monkeys[0].inspections).toBe(99);
    expect(monkeys[1].inspections).toBe(97);
    expect(monkeys[2].inspections).toBe(8);
    expect(monkeys[3].inspections).toBe(103);
  });

  it('can handle other worry rules 10000 rounds', () => {
    const monkeys = doMonkeyRounds(parsedMonkeys(), 10000, false);

    expect(monkeys[0].inspections).toBe(52166);
    expect(monkeys[1].inspections).toBe(47830);
    expect(monkeys[2].inspections).toBe(1938);
    expect(monkeys[3].inspections).toBe(52013);
  });
});

describe('getMonkeyBusiness', () => {
  it('should correctly determine monkey business', () => {
    const monkeys = parsedMonkeys();

    monkeys[0].inspections = 101;
    monkeys[1].inspections = 95;
    monkeys[2].inspections = 7;
    monkeys[3].inspections = 105;

    expect(getMonkeyBusiness(monkeys)).toBe(10605);
  });
});
