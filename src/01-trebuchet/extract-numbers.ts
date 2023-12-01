export function extractNumbers(input: string): number {
  const numbers = input.match(/\d/g);

  if (numbers) {
    return parseInt(numbers[0] + numbers[numbers.length - 1], 10);
  }

  return 0;
}

export function extractAllNumbers(input: string): number {
  return input.split(/\r?\n/).map(extractNumbers).reduce((a, b) => a + b);
}
