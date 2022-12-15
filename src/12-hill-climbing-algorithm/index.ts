import { findPath, parseInput } from './path';

// https://adventofcode.com/2022/day/12
export default function solution(input: string) {
  const grid = parseInput(input);

  const path = findPath(grid);
  const path2 = findPath(grid, true);

  const part1 = path.length - 1;
  const part2 = path2.length - 1;

  return [part1, part2];
}
