import { readFile } from 'fs/promises';

import { parseInput, runCycles } from './cycles';

// https://adventofcode.com/2022/day/10
export default async function solution() {
  const input = (await readFile(`${__dirname}/input.txt`)).toString();

  const instructions = parseInput(input);
  const outcome = runCycles(instructions);

  const part1 = outcome.signals.reduce((a, b) => a + b);
  const part2 = outcome.pixels;

  console.log(`Day 10 - Part 1: ${part1}`);
  console.log(`Day 10 - Part 2:\n${part2}`);
}
