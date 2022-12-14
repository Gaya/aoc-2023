import { readFile } from 'fs/promises';

import { findPath, parseInput } from './path';

// https://adventofcode.com/2022/day/12
export default async function solution() {
  const input = (await readFile(`${__dirname}/input.txt`)).toString();

  const path = findPath(parseInput(input));

  const part1 = path.length - 1;
  const part2 = 0;

  console.log(`Day 12 - Part 1: ${part1}`);
  console.log(`Day 12 - Part 2: ${part2}`);
}
