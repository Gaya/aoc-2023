import { countSand, dropSand, fillGrid } from './sand';

// https://adventofcode.com/2022/day/14
export default function solution(input: string) {
  const filledGrid = dropSand(fillGrid(input), false);
  const filledGridWithBottom = dropSand(fillGrid(input), true);

  const part1 = countSand(filledGrid);
  const part2 = countSand(filledGridWithBottom);

  return [part1, part2];
}
