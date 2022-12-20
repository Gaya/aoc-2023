import { findMaxPossibleFlow, parseValves } from './valves';

// https://adventofcode.com/2022/day/16
export default function solution(input: string) {
  const valves = parseValves(input);

  const part1 = findMaxPossibleFlow(valves, valves['AA'], 30);
  const part2 = findMaxPossibleFlow(valves, valves['AA'], 26, true);

  return [part1, part2];
}
