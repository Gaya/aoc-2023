// https://adventofcode.com/2023/day/5
import { followMaps, followMapsExtended } from './map';

export default function solution(input: string) {
  const part1 = followMaps(input);
  const part2 = followMapsExtended(input);
  return [part1, part2];
}
