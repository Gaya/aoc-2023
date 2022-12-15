import { readFile } from 'fs/promises';

import { determineBadgeTypePrioritySum, determinePrioritySum } from './rucksack';

// https://adventofcode.com/2022/day/3
export default function solution(input: string) {
  const part1 = determinePrioritySum(input);
  const part2 = determineBadgeTypePrioritySum(input);

  return [part1, part2];
}
