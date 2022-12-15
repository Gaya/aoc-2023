import { countSand, dropSand, fillGrid } from './sand';

// https://adventofcode.com/2022/day/14
export default function solution(input: string) {
  const grid = fillGrid(input);

  const filledGrid = dropSand(grid, false);

  const part1 = countSand(filledGrid);
  const part2 = 0;

  return [part1, part2];
}
