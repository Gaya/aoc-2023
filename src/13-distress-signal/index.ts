// https://adventofcode.com/2022/day/13
import { parsePackets, sumRightOrders } from './compare';

export default function solution(input: string) {
  const parsedInput = parsePackets(input);

  const part1 = sumRightOrders(parsedInput);
  const part2 = 0;

  return [part1, part2];
}
