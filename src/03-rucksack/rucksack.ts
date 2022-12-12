export function findDouble(input: string): string {
  const first = input.substring(0, input.length / 2).split('');
  const second = input.substring(input.length / 2, input.length).split('');

  return first.find((l) => second.includes(l)) || '';
}

export function letterToPriority(input: string): number {
  const value = input.charCodeAt(0);
  return value - (value >= 97 ? 96 : 38);
}

export function determinePrioritySum(input: string): number {
  const scores = input.trim().split('\n')
    .map(findDouble)
    .map(letterToPriority);
  return scores.reduce((a, b) => a + b);
}

export function findBadgeType(input: string[]): string {
  const rows = input.map((r) => r.split(''));
  return rows[0].find((l) => rows.every((letters) => letters.includes(l))) || '';
}

export function determineBadgeTypePrioritySum(input: string): number {
  const rows = input.trim().split('\n');
  let total = 0;

  for (let i = 0; i < (rows.length / 3); i++) {
    const input = rows.slice(i * 3, (i * 3 + 3));
    total += letterToPriority(findBadgeType(input));
  }

  return total;
}
