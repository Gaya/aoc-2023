import { bestScenicScore, findVisibleTrees, toGrid } from './420';

// https://adventofcode.com/2022/day/8
export default function solution(input: string) {
  const grids = toGrid(input);
  const [possibleTrees, total] = findVisibleTrees(grids);

  const part1 = total;
  const part2 = bestScenicScore(grids, possibleTrees);

  return [part1, part2];
}
