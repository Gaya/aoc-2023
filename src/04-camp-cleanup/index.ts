import { readFile } from 'fs/promises';

import { findCompleteOverlapping, findOverlapping } from './assignment';

// https://adventofcode.com/2022/day/4
export default async function solution() {
  const input = (await readFile(`${__dirname}/input.txt`)).toString();

  const part1 = findCompleteOverlapping(input).length;
  const part2 = findOverlapping(input).length;

  console.log(`Day 4 - Part 1: ${part1}`);
  console.log(`Day 4 - Part 2: ${part2}`);
}
