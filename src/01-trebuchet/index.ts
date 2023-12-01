// https://adventofcode.com/2022/day/<n>
import { extractAllNumbers, extractAllNumbersWithNamed } from './extract-numbers';

export default function solution(input: string) {
  const part1 = extractAllNumbers(input);
  const part2 = extractAllNumbersWithNamed(input);

  return [part1, part2];
}
