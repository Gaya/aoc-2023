export function calculateRound(input: string): number {
  // @ts-ignore (assume input is correct)
  const [a, b]: ['A' | 'B' | 'C', 'X' | 'Y' | 'Z'] = input.split(' ');

  const baseScore = {
    'A': 1,
    'B': 2,
    'C': 3,
    'X': 1,
    'Y': 2,
    'Z': 3,
  }

  // 0 = draw 1 = won 2 = lost
  const outcome = (baseScore[b] - baseScore[a]) % 3;
  let outcomeScore;

  switch (outcome < 0 ? outcome + 3 : outcome) {
    case 0:
      outcomeScore = 3;
      break;
    case 1:
      outcomeScore = 6;
      break;
    default:
    case 2:
      outcomeScore = 0;
      break;
  }

  return baseScore[b] + outcomeScore;
}

export function followStrategy(input: string): string {
  // @ts-ignore (assume input is correct)
  const [a, b]: ['A' | 'B' | 'C', 'X' | 'Y' | 'Z'] = input.split(' ');

  // X = lose Y = draw Z = win

  const oppOption = {
    'A': 1,
    'B': 2,
    'C': 3,
  };

  let option;
  let change;

  switch (b) {
    case 'X':
      change = -1;
      break;
    case 'Z':
      change = 1;
      break;
    default:
    case 'Y':
      change = 0;
      break;
  }

  const outcome = (oppOption[a] + change) % 3;

  switch (outcome) {
    case 1:
      option = 'X';
      break;
    case 2:
      option = 'Y';
      break;
    case 0:
    case 3:
    default:
      option = 'Z';
      break;
  }

  return `${a} ${option}`;
}

export function calculateRounds(input: string): number {
  const scores = input.trim().split('\n').map(calculateRound);

  return scores.reduce((a, b) => a + b);
}

export function calculateRoundsWithStrategy(input: string): number {
  const scores = input.trim().split('\n')
    .map(followStrategy)
    .map(calculateRound);

  return scores.reduce((a, b) => a + b);
}
