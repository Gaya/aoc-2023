// https://adventofcode.com/2023/day/4
import { cardsScore, determineScratchPile } from './scratchcards';

export default function solution(input: string) {
  const part1 = cardsScore(input);
  const part2 = determineScratchPile(input);

  return [part1, part2];
}
