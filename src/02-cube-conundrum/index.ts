// https://adventofcode.com/2023/day/2
import { gamesPowered, possibleGames } from './cube-game';

export default function solution(input: string) {
  const part1 = possibleGames(input, { r: 12, g: 13, b: 14 });
  const part2 = gamesPowered(input);

  return [part1, part2];
}
