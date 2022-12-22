import { calculateSurfaceArea, parseCubeInput } from './cubes';

describe('parseCubeInput', () => {
  it('should parse the input into neat arrays', () => {
    const input = `1,1,1
2,1,1
3,2,1`;
    expect(parseCubeInput(input)).toStrictEqual([
      [1,1,1],
      [2,1,1],
      [3,2,1]
    ]);
  });
});

describe('calculateSurfaceArea', () => {
  it('calculates surface area of simple 3D mapped positions', () => {
    const input = `1,1,1
2,1,1`;

    expect(calculateSurfaceArea(parseCubeInput(input))).toBe(10);
  });

  it.only('calculates surface area of 3D mapped positions', () => {
    const input = `2,2,2
1,2,2
3,2,2
2,1,2
2,3,2
2,2,1
2,2,3
2,2,4
2,2,6
1,2,5
3,2,5
2,1,5
2,3,5`;

    expect(calculateSurfaceArea(parseCubeInput(input))).toBe(64);
  });
});
