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

  switch (outcome) {
    case 0:
      outcomeScore = 3;
      break;
    case -2:
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

export default function calculateRounds(input: string): number {
  const scores = input.trim().split('\n').map((r) => calculateRound(r));
  return scores.reduce((a, b) => a + b);
}
