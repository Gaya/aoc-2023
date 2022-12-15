import { moveStacks } from './stack';

// https://adventofcode.com/2022/day/5
export default function solution(input: string) {
  const part1 = moveStacks(input);
  const part2 = moveStacks(input, false);

  return [part1, part2];
}
