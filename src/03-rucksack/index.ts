import { readFile } from 'fs/promises';

import { determineBadgeTypePrioritySum, determinePrioritySum } from './rucksack';

// https://adventofcode.com/2022/day/3
export default async function solution() {
  const input = (await readFile(`${__dirname}/input.txt`)).toString();

  const part1 = determinePrioritySum(input);
  const part2 = determineBadgeTypePrioritySum(input);

  console.log(`Day 3 - Part 1: ${part1}`);
  console.log(`Day 3 - Part 2: ${part2}`);
}
