const findNumbers = /\d+/g;

export function cardScore(input: string): number {
  const [winningInput, yourNumbersInput] = input.split('|');
  const ynm = yourNumbersInput.match(findNumbers);
  const wnm = winningInput.match(findNumbers);

  if (!ynm || !wnm) {
    return 0;
  }

  const winning = wnm.filter((match, index) => index > 0 && ynm.includes(match));

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
