import { findMarkerIndex } from './marker';

// https://adventofcode.com/2022/day/6
export default function solution(input: string) {
  const part1 = findMarkerIndex(input);
  const part2 = findMarkerIndex(input, 14);

  return [part1, part2];
}
