import { findPath, parseInput } from './path';

describe('parseInput', () => {
  it('should parse the puzzle input to height maps', () => {
    const input = `Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`;

    expect(parseInput(input)).toStrictEqual([
      [0, 1, 2, 17, 16, 15, 14, 13],
      [1, 2, 3, 18, 25, 24, 24, 12],
      [1, 3, 3, 19, 26, 27, 24, 11],
      [1, 3, 3, 20, 21, 22, 23, 10],
      [1, 2, 4, 5, 6, 7, 8, 9],
    ])
  });
});

describe('findPath', () => {
  it('should find a path', () => {
    const input = `Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`;

    const route = findPath(parseInput(input));

    expect(Object.keys(route).length - 1).toBe(31);
  });
});
