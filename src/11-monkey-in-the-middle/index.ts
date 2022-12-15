import { deepCopy } from '../utils';

import { doMonkeyRounds, getMonkeyBusiness, parseMonkeyInput } from './monkey';

// https://adventofcode.com/2022/day/11
export default function solution(input: string) {
  const part1Monkeys = parseMonkeyInput(input);
  const part2Monkeys = deepCopy(part1Monkeys);

  const monkeysAfterRounds = doMonkeyRounds(part1Monkeys, 20);
  const worrisomeMonkeysAfterRounds = doMonkeyRounds(part2Monkeys, 10000, false);

  const part1 = getMonkeyBusiness(monkeysAfterRounds);
  const part2 = getMonkeyBusiness(worrisomeMonkeysAfterRounds);

  return [part1, part2];
}
