import { calculateRounds, calculateRoundsWithStrategy } from './calc-score';

// https://adventofcode.com/2022/day/2
export default function solution(input: string) {
  const part1 = calculateRounds(input);
  const part2 = calculateRoundsWithStrategy(input);

  return [part1, part2];
}
