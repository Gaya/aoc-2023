import { readFile } from 'fs/promises';

import { deepCopy } from '../utils';

import { doMonkeyRounds, getMonkeyBusiness, parseMonkeyInput } from './monkey';

// https://adventofcode.com/2022/day/11
export default async function solution() {
  const input = (await readFile(`${__dirname}/input.txt`)).toString();

  const part1Monkeys = parseMonkeyInput(input);
  const part2Monkeys = parseMonkeyInput(input);

  const monkeysAfterRounds = doMonkeyRounds(part1Monkeys, 20);
  const worrisomeMonkeysAfterRounds = doMonkeyRounds(part2Monkeys, 10000, false);

  const part1 = getMonkeyBusiness(monkeysAfterRounds);
  const part2 = getMonkeyBusiness(worrisomeMonkeysAfterRounds);

  console.log(`Day 11 - Part 1: ${part1}`);
  console.log(`Day 11 - Part 2: ${part2}`);
}
