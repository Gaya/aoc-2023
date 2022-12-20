import { stackAfterRocks } from './rocks';

// https://adventofcode.com/2022/day/17
export default function solution(input: string) {
  const part1 = stackAfterRocks(input);
  const part2 = stackAfterRocks(input, 1000000000000);

  return [part1, part2];
}
