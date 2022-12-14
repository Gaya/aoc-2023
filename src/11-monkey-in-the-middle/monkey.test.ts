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
    items: [BigInt(79), BigInt(98)],
    operation: 'old * 19',
    divisible: 23,
    ifTrue: 2,
    ifFalse: 3,
  },
  1: {
    id: 1,
    inspections: 0,
    items: [BigInt(54), BigInt(65), BigInt(75), BigInt(74)],
    operation: 'old + 6',
    divisible: 19,
    ifTrue: 2,
    ifFalse: 0,
  },
  2: {
    id: 2,
    inspections: 0,
    items: [BigInt(79), BigInt(60), BigInt(97)],
    operation: 'old * old',
    divisible: 13,
    ifTrue: 1,
    ifFalse: 3,
  },
  3: {
    id: 3,
    inspections: 0,
    items: [BigInt(74)],
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
    expect(performOperation('5 + 5', BigInt(0))).toBe(BigInt(10));
    expect(performOperation('old + 5', BigInt(3))).toBe(BigInt(8));
    expect(performOperation('5 + old', BigInt(3))).toBe(BigInt(8));
    expect(performOperation('old + old', BigInt(3))).toBe(BigInt(6));
  });

  it('should be able to multiply', () => {
    expect(performOperation('5 * 5', BigInt(0))).toBe(BigInt(25));
    expect(performOperation('old * 5', BigInt(3))).toBe(BigInt(15));
    expect(performOperation('5 * old', BigInt(3))).toBe(BigInt(15));
    expect(performOperation('old * old', BigInt(3))).toBe(BigInt(9));
  });
});

describe('doMonkeyRounds', () => {
  it('can perform a round of monkey item throwing', () => {
    const monkeys = parsedMonkeys();

    monkeys[0].items = [BigInt(20), BigInt(23), BigInt(27), BigInt(26)];
    monkeys[0].inspections = 2;
    monkeys[1].items = [BigInt(2080), BigInt(25), BigInt(167), BigInt(207), BigInt(401), BigInt(1046)];
    monkeys[1].inspections = 4;
    monkeys[2].items = [];
    monkeys[2].inspections = 3;
    monkeys[3].items = [];
    monkeys[3].inspections = 5;

    expect(doMonkeyRounds(parsedMonkeys())).toMatchObject(monkeys);
  });

  it('can perform 20 rounds of monkey item throwing', () => {
    const monkeys = parsedMonkeys();

    monkeys[0].items = [BigInt(10), BigInt(12), BigInt(14), BigInt(26), BigInt(34)];
    monkeys[0].inspections = 101;
    monkeys[1].items = [BigInt(245), BigInt(93), BigInt(53), BigInt(199), BigInt(115)];
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
