import { findCompleteOverlapping, findOverlapping } from './assignment';

// https://adventofcode.com/2022/day/4
export default function solution(input: string) {
  const part1 = findCompleteOverlapping(input).length;
  const part2 = findOverlapping(input).length;

  return [part1, part2];
}
