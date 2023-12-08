export function handRank(hand: string): number {
  const cardHand = hand.split('').reduce((acc: { [card: string]: number }, l) => ({
    ...acc,
    [l]: acc[l] ? acc[l] + 1 : 1,
  }), {});

  const values = Object.values(cardHand).sort((a, b) => b - a);

  if (values[0] === 5) {
    return 7;
  }

  if (values[0] === 4) {
    return 6;
  }

  if (values[0] === 3 && values[1] === 2) {
    return 5;
  }

  if (values[0] === 3) {
    return 4;
  }

  if (values[0] === 2 && values[1] === 2) {
    return 3;
  }

  if (values[0] === 2) {
    return 2;
  }

  return 1;
}

const ranks = {
  'A': 1,
  'K': 2,
  'Q': 3,
  'J': 4,
  'T': 5,
  '9': 6,
  '8': 7,
  '7': 8,
  '6': 9,
  '5': 10,
  '4': 11,
  '3': 12,
  '2': 13,
};

export function winningCard(a: keyof typeof ranks, b: keyof typeof ranks) {
  return ranks[a] < ranks[b];
}

export function rankCards(input: string): number {
  const cards = input.match(/^(\w{5}) (\d+)$/gm);

  if (!cards) {
    return 0;
  }

  const rankings = cards.map((c) => {
    const [hand, score] = c.split(' ');
    return {
      hand,
      score: parseInt(score, 10),
      rank: handRank(hand),
    };
  }).sort((a, b) => {
    if (a.rank > b.rank) {
      return 1;
    } else if (a.rank === b.rank) {
      for (let i = 0; i < 5; i++) {
        const CA = a.hand[i] as keyof typeof ranks;
        const CB = b.hand[i] as keyof typeof ranks;
        if (winningCard(CB, CA)) {
          return -1;
        }
      }

      return 1;
    }

    return -1;
  });

  return rankings.reduce((acc, c, index) => acc + c.score * (index + 1), 0);
}
