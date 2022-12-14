import { readFile } from 'fs/promises';

import { findPath, findStartingNode, parseInput } from './path';

// https://adventofcode.com/2022/day/12
export default async function solution() {
  const input = (await readFile(`${__dirname}/input.txt`)).toString();

  const grid = parseInput(input);

  const path = findPath(grid);
  const path2 = findPath(grid, findStartingNode(grid, 27), 0);

  const part1 = path.length - 1;
  const part2 = path2.length - 1;

  console.log(`Day 12 - Part 1: ${part1}`);
  console.log(`Day 12 - Part 2: ${part2}`);
}
