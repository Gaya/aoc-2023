import { readFile } from 'fs/promises';

import listCalories from './list-calories';

// https://adventofcode.com/2022/day/1
export default async function solution() {
  const input = (await readFile(`${__dirname}/input.txt`)).toString();
  const parsedInput = listCalories(input);
  parsedInput.sort((a, b) => b - a);

  const part1 = Math.max(...parsedInput);
  const part2 = parsedInput[0] + parsedInput[1] + parsedInput[2];

  console.log(`Day 1 - Part 1: ${part1}`); // 68442
  console.log(`Day 1 - Part 2: ${part2}`); // 204837
}
