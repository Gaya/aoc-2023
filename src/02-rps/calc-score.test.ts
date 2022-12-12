import { calculateRound, calculateRounds, followStrategy } from './calc-score';

describe('calculateRound', () => {
  it('should correctly determine scores', () => {
    expect(calculateRound('A X')).toEqual(4);
    expect(calculateRound('A Y')).toEqual(8);
    expect(calculateRound('A Z')).toEqual(3);
    expect(calculateRound('B X')).toEqual(1);
    expect(calculateRound('B Y')).toEqual(5);
    expect(calculateRound('B Z')).toEqual(9);
    expect(calculateRound('C X')).toEqual(7);
    expect(calculateRound('C Y')).toEqual(2);
    expect(calculateRound('C Z')).toEqual(6);
  });
});

const rounds = `A Y
B X
C Z
`;

describe('calculateRounds', () => {
  it('should correctly determine scores of multiple rounds', () => {
    expect(calculateRounds(rounds)).toEqual(15);
  });
});

describe('followStrategy', () => {
  it('should correctly transform to follow strategy', () => {
    expect(followStrategy('A X')).toEqual('A Z');
    expect(followStrategy('A Y')).toEqual('A X');
    expect(followStrategy('A Z')).toEqual('A Y');
    expect(followStrategy('B X')).toEqual('B X');
    expect(followStrategy('B Y')).toEqual('B Y');
    expect(followStrategy('B Z')).toEqual('B Z');
    expect(followStrategy('C X')).toEqual('C Y');
    expect(followStrategy('C Y')).toEqual('C Z');
    expect(followStrategy('C Z')).toEqual('C X');
  });
});
