import { readFile } from 'fs/promises';

import { findAndSumDeletedFolders, findFolderToDeleteAndSum } from './parseTerminal';

// https://adventofcode.com/2022/day/7
export default async function solution() {
  const input = (await readFile(`${__dirname}/input.txt`)).toString();

  const part1 = findAndSumDeletedFolders(input, 100000);
  const part2 = findFolderToDeleteAndSum(input, 70000000, 30000000);

  console.log(`Day 6 - Part 1: ${part1}`);
  console.log(`Day 6 - Part 2: ${part2}`);
}
