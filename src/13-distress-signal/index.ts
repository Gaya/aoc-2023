import { findDecoderKey, parseCombinedPackets, parsePackets, sumRightOrders } from './compare';

// https://adventofcode.com/2022/day/13
export default function solution(input: string) {
  const part1 = sumRightOrders(parseCombinedPackets(input));
  const part2 = findDecoderKey(parsePackets(input));

  return [part1, part2];
}
