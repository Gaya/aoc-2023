import { isRightOrder, parsePackets, sumRightOrders } from './compare';

const input = `[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]`;

describe('parsePackets', () => {
  it('should correctly turn input into packets', () => {
    expect(parsePackets(input)).toStrictEqual([
      [
        [1,1,3,1,1],
        [1,1,5,1,1],
      ],
      [
        [[1],[2,3,4]],
        [[1],4],
      ],
      [
        [9],
        [[8,7,6]],
      ],
      [
        [[4,4],4,4],
        [[4,4],4,4,4],
      ],
      [
        [7,7,7,7],
        [7,7,7],
      ],
      [
        [],
        [3],
      ],
      [
        [[[]]],
        [[]],
      ],
      [
        [1,[2,[3,[4,[5,6,7]]]],8,9],
        [1,[2,[3,[4,[5,6,0]]]],8,9]
      ]
    ]);
  });
});

describe('isRightOrder', () => {
  it('should handle comparing two simple lists', () => {
    expect(isRightOrder([1,1,3,1,1], [1,1,5,1,1])).toBe(true);
    expect(isRightOrder([1,1,5,1,1], [1,1,3,1,1])).toBe(false);
  });

  it('should fail if right is a shorter list', () => {
    expect(isRightOrder([1,1,1,1], [1,1])).toBe(false);
    expect(isRightOrder([1, 1, 1], [[], []])).toBe(false);
    expect(isRightOrder([1,1], [1,1,1,1])).toBe(true);
  });

  it('will do recursion if items are arrays', () => {
    expect(isRightOrder([[1, 1]], [[1, 1]])).toBe(true);
    expect(isRightOrder([[1, 1]], [[1]])).toBe(false);
    expect(isRightOrder([[1]], [[1, 1]])).toBe(true);
    expect(isRightOrder([[1, 1, 3, 1, 1]], [[1, 1, 5, 1, 1]])).toBe(true);
    expect(isRightOrder([[1, 1, 5, 1, 1]], [[1, 1, 3, 1, 1]])).toBe(false);
  });

  it('passes test example 1', () => {
    expect(isRightOrder([1,1,3,1,1], [1,1,5,1,1])).toBe(true);
  });

  it('passes test example 2', () => {
    expect(isRightOrder([[1],[2,3,4]], [[1],4])).toBe(true);
  });

  it('passes test example 3', () => {
    expect(isRightOrder([9], [[8,7,6]])).toBe(false);
  });

  it('passes test example 4', () => {
    expect(isRightOrder([[4,4],4,4], [[4,4],4,4,4])).toBe(true);
  });

  it('passes test example 5', () => {
    expect(isRightOrder([7,7,7,7], [7,7,7])).toBe(false);
  });

  it('passes test example 6', () => {
    expect(isRightOrder([], [3])).toBe(true);
  });

  it('passes test example 7', () => {
    expect(isRightOrder([[[]]], [[]])).toBe(false);
  });

  it('passes test example 8', () => {
    expect(isRightOrder([1,[2,[3,[4,[5,6,7]]]],8,9], [1,[2,[3,[4,[5,6,0]]]],8,9])).toBe(false);
  });
});

describe('sumRightOrders', () => {
  it('should sum up the indexes of the rightly ordered indices', () => {
    expect(sumRightOrders(parsePackets(input))).toBe(13);
  });
});
