// https://adventofcode.com/2023/day/1
import { extractAllNumbers, extractAllNumbersWithNamed } from './extract-numbers';

export default function solution(input: string) {
  const part1 = extractAllNumbers(input);
  const part2 = extractAllNumbersWithNamed(input);

  return [part1, part2];
}
