import { findAndSumDeletedFolders, findFolderToDeleteAndSum } from './parseTerminal';

// https://adventofcode.com/2022/day/7
export default function solution(input: string) {
  const part1 = findAndSumDeletedFolders(input, 100000);
  const part2 = findFolderToDeleteAndSum(input, 70000000, 30000000);

  return [part1, part2];
}
