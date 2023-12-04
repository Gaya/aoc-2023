// https://adventofcode.com/2023/day/3
import { gearRatio, machineNumberSum } from './machine-numbers';

export default function solution(input: string) {
  const part1 = machineNumberSum(input);
  const part2 = gearRatio(input);

  return [part1, part2];
}
