import { parseInput, runCycles } from './cycles';

// https://adventofcode.com/2022/day/10
export default function solution(input: string) {
  const instructions = parseInput(input);
  const outcome = runCycles(instructions);

  const part1 = outcome.signals.reduce((a, b) => a + b);
  const part2 = `\n${outcome.pixels}`;

  return [part1, part2];
}
