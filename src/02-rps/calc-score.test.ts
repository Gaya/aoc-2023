import calculateRounds, { calculateRound } from './calc-score';

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
