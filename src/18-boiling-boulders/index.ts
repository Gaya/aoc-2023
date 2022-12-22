import { calculateOutsideSurfaceArea, calculateSurfaceArea, parseCubeInput } from './cubes';

// https://adventofcode.com/2022/day/18
export default function solution(input: string) {
  const cube = parseCubeInput(input);

  const part1 = calculateSurfaceArea(cube);
  const part2 = calculateOutsideSurfaceArea(cube);

  return [part1, part2];
}
