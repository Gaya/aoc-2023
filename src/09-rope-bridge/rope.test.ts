import { newPosition, ropeMoves } from './rope';

describe('ropeMoves', () => {
  it('should count the amount of squares the head touched', () => {
    const instructions = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`;
    expect(ropeMoves(instructions)).toBe(13);
  });

  it('should count the amount of squares the head touched when rope is longer', () => {
    const instructions = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`;
    expect(ropeMoves(instructions, 10)).toBe(1);
  });

  it('should accept rope length', () => {
    const instructions = `R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`;
    expect(ropeMoves(instructions, 10)).toBe(36);
  });
});

describe('newPosition', () => {
  it('can move horizontally', () => {
    expect(newPosition([1, 0], [0, 0])).toStrictEqual([0, 0]);
    expect(newPosition([2, 0], [0, 0])).toStrictEqual([1, 0]);
    expect(newPosition([1, 0], [2, 0])).toStrictEqual([2, 0]);
    expect(newPosition([0, 0], [2, 0])).toStrictEqual([1, 0]);
  });

  it('can move vertically', () => {
    expect(newPosition([0, 1], [0, 0])).toStrictEqual([0, 0]);
    expect(newPosition([0, 2], [0, 0])).toStrictEqual([0, 1]);
    expect(newPosition([0, 1], [0, 2])).toStrictEqual([0, 2]);
    expect(newPosition([0, 0], [0, 2])).toStrictEqual([0, 1]);
  });

  it('can ignore moving diagonally', () => {
    expect(newPosition([1, 1], [0, 0])).toStrictEqual([0, 0]);
    expect(newPosition([-1, 1], [0, 0])).toStrictEqual([0, 0]);
    expect(newPosition([-1, -1], [0, 0])).toStrictEqual([0, 0]);
    expect(newPosition([1, -1], [0, 0])).toStrictEqual([0, 0]);
  });

  it('can move diagonally', () => {
    expect(newPosition([1, 2], [0, 0])).toStrictEqual([1, 1]);
    expect(newPosition([2, 1], [0, 0])).toStrictEqual([1, 1]);

    expect(newPosition([-1, 2], [0, 0])).toStrictEqual([-1, 1]);
    expect(newPosition([-2, 1], [0, 0])).toStrictEqual([-1, 1]);

    expect(newPosition([1, -2], [0, 0])).toStrictEqual([1, -1]);
    expect(newPosition([2, -1], [0, 0])).toStrictEqual([1, -1]);

    expect(newPosition([-1, -2], [0, 0])).toStrictEqual([-1, -1]);
    expect(newPosition([-2, -1], [0, 0])).toStrictEqual([-1, -1]);
  });
});
