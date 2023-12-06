import { calcBeating, calcBeatingTwo, possibleWins } from './wait';

describe('possibleWins', () => {
  it('calculates to possible winning moves', () => {
    expect(possibleWins(7, 9)).toEqual(4);
    expect(possibleWins(15, 40)).toEqual(8);
    expect(possibleWins(30, 200)).toEqual(9);
    expect(possibleWins(71530, 940200)).toEqual(71503);
  });
});

describe('calcBeating', () => {
  it('calculates ways to beat based on sheet', () => {
    expect(calcBeating(`Time:      7  15   30
Distance:  9  40  200`)).toEqual(288);
  });
});

describe('calcBeatingTwo', () => {
  it('should calc but good kerning', () => {
    expect(calcBeatingTwo(`Time:      7  15   30
Distance:  9  40  200`)).toEqual(71503);
  });
});
