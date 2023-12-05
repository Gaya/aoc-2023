const findNumbers = /\d+/g;

function determineWinning(input: string) {
  const [winningInput, yourNumbersInput] = input.split('|');
  const ynm = yourNumbersInput.match(findNumbers);
  const wnm = winningInput.match(findNumbers);

  if (!ynm || !wnm) {
    return [];
  }

  return wnm.filter((match, index) => index > 0 && ynm.includes(match));
}

export function cardScore(input: string): number {
  const winning = determineWinning(input);

  if (winning.length > 1) {
    return Math.pow(2, winning.length - 1);
  }

  return winning.length;
}

export function cardsScore(input: string): number {
  return input.split('\n')
    .map(cardScore)
    .reduce((a, b) => a + b);
}

export function determineScratchPile(input: string): number {
  const cards = input.split('\n');
  const pile: { [key: number]: number } = cards
    .reduce((acc, _, currentIndex) => ({ [currentIndex + 1]: 1, ...acc }), {});

  cards.map((c) => determineWinning(c))
    .forEach((w, index) => {
      const amount = pile[index + 1];

      for (let i = 0; i < w.length; i++) {
        pile[index + 2 + i] += amount;
      }
    });

  return Object.values(pile).reduce((a, b) => a + b);
}
