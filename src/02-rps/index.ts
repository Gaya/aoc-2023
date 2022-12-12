import { readFile } from 'fs/promises';
import { calculateRounds, calculateRoundsWithStrategy } from './calc-score';

// https://adventofcode.com/2022/day/2
export default async function solution() {
  const input = (await readFile(`${__dirname}/input.txt`)).toString();

  const part1 = calculateRounds(input);
  const part2 = calculateRoundsWithStrategy(input);

  console.log(`Day 2 - Part 1: ${part1}`);
  console.log(`Day 2 - Part 2: ${part2}`);
}
