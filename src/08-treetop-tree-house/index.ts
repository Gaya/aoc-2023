import { readFile } from 'fs/promises';

import { findVisibleTrees } from './420';

// https://adventofcode.com/2022/day/8
export default async function solution() {
  const input = (await readFile(`${__dirname}/input.txt`)).toString();

  const part1 = findVisibleTrees(input);
  const part2 = 0;

  console.log(`Day 8 - Part 1: ${part1}`);
  console.log(`Day 8 - Part 2: ${part2}`);
}
