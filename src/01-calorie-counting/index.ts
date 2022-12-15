import listCalories from './list-calories';

// https://adventofcode.com/2022/day/1
export default function solution(input: string) {
  const parsedInput = listCalories(input);
  parsedInput.sort((a, b) => b - a);

  const part1 = Math.max(...parsedInput);
  const part2 = parsedInput[0] + parsedInput[1] + parsedInput[2];

  return [part1, part2];
}
