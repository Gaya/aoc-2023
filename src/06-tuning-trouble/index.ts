import { readFile } from 'fs/promises';

import { findMarkerIndex } from './marker';

// https://adventofcode.com/2022/day/6
export default async function solution() {
  const input = (await readFile(`${__dirname}/input.txt`)).toString();

  const part1 = findMarkerIndex(input);
  const part2 = findMarkerIndex(input, 14);

  console.log(`Day 7 - Part 1: ${part1}`);
  console.log(`Day 7 - Part 2: ${part2}`);
}
