// https://adventofcode.com/2022/day/<n>
import { extractAllNumbers } from './extract-numbers';

export default function solution(input: string) {
  const part1 = extractAllNumbers(input);
  const part2 = 0;

  return [part1, part2];
}
