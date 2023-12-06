// https://adventofcode.com/2023/day/6
import { calcBeating, calcBeatingTwo } from './wait';

export default function solution(input: string) {
  const part1 = calcBeating(input);
  const part2 = calcBeatingTwo(input);

  return [part1, part2];
}
