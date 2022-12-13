import { readFile } from 'fs/promises';

import { bestScenicScore, findVisibleTrees, toGrid } from './420';

// https://adventofcode.com/2022/day/8
export default async function solution() {
  const input = (await readFile(`${__dirname}/input.txt`)).toString();

  const grids = toGrid(input);
  const [possibleTrees, total] = findVisibleTrees(grids);

  const part1 = total;
  const part2 = bestScenicScore(grids, possibleTrees);

  console.log(`Day 8 - Part 1: ${part1}`);
  console.log(`Day 8 - Part 2: ${part2}`);
}
