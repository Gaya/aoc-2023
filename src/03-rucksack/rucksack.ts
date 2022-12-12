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
