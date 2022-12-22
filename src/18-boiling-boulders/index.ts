import { calculateSurfaceArea, parseCubeInput } from './cubes';

// https://adventofcode.com/2022/day/18
export default function solution(input: string) {
  const part1 = calculateSurfaceArea(parseCubeInput(input));
  const part2 = 0;

  return [part1, part2];
}
