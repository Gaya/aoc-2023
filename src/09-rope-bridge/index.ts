import { ropeMoves } from './rope';

// https://adventofcode.com/2022/day/9
export default function solution(input: string) {
  const part1 = ropeMoves(input);
  const part2 = ropeMoves(input, 10);

  return [part1, part2];
}
