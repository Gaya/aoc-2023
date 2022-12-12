import { readFile } from 'fs/promises';

import { findOverlapping } from './assignment';

// https://adventofcode.com/2022/day/4
export default async function solution() {
  const input = (await readFile(`${__dirname}/input.txt`)).toString();

  const part1 = findOverlapping(input).length;
  const part2 = 0;

  console.log(`Day 4 - Part 1: ${part1}`);
  console.log(`Day 4 - Part 2: ${part2}`);
}
