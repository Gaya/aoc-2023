import { parseSensorInput, scannedColsInRow } from './beacons';

// https://adventofcode.com/2022/day/15
export default function solution(input: string) {
  const part1 = scannedColsInRow(parseSensorInput(input), 2000000);
  const part2 = 0;

  return [part1, part2];
}
