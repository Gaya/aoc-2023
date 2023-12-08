import { handRank, rankCards, winningCard } from './camel-cards';

describe('handRank', () => {
  it('determines the rank of a hand', () => {
    expect(handRank('AAAAA')).toEqual(7);
    expect(handRank('44444')).toEqual(7);
    expect(handRank('44A44')).toEqual(6);
    expect(handRank('A4444')).toEqual(6);
    expect(handRank('AA444')).toEqual(5);
    expect(handRank('A44A4')).toEqual(5);
    expect(handRank('A44K4')).toEqual(4);
    expect(handRank('AK4AA')).toEqual(4);
    expect(handRank('22334')).toEqual(3);
    expect(handRank('2A33A')).toEqual(3);
    expect(handRank('2K33A')).toEqual(2);
    expect(handRank('2K3A2')).toEqual(2);
    expect(handRank('23456')).toEqual(1);
    expect(handRank('AKQJ9')).toEqual(1);
  });
});

describe('winningCard', () => {
  it('correctly determines winning card', () => {
    expect(winningCard('A', 'K')).toEqual(true);
    expect(winningCard('K', 'A')).toEqual(false);
    expect(winningCard('K', 'K')).toEqual(false);
  });
});

describe('rankCards', () => {
  it('ranks the hand of cards correctly', () => {
    expect(rankCards(`32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`)).toEqual(6440);
  });
});
