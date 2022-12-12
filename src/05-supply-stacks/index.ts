import { readFile } from 'fs/promises';

import { moveStacks } from './stack';

// https://adventofcode.com/2022/day/5
export default async function solution() {
  const input = (await readFile(`${__dirname}/input.txt`)).toString();

  const part1 = moveStacks(input);
  const part2 = 0;

  console.log(`Day 5 - Part 1: ${part1}`);
  console.log(`Day 5 - Part 2: ${part2}`);
}
