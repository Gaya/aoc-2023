import { readFile } from 'fs/promises';

import { ropeMoves } from './rope';

// https://adventofcode.com/2022/day/9
export default async function solution() {
  const input = (await readFile(`${__dirname}/input.txt`)).toString();

  const part1 = ropeMoves(input);
  const part2 = ropeMoves(input, 10);

  console.log(`Day 9 - Part 1: ${part1}`);
  console.log(`Day 9 - Part 2: ${part2}`);
}
