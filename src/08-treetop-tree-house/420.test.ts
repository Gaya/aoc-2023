import { bestScenicScore, calculateScenicScore, findVisibleTrees, toGrid } from './420';

const grid = `30373
25512
65332
33549
35390`;

const grids = toGrid(grid);

describe('findVisibleTrees', () => {
  it('should find the number of visible trees', () => {
    const [_, total] = findVisibleTrees(grids);
    expect(total).toBe(21);
  });
});

describe('calculateScenicScore', () => {
  it('should determine scenic score', () => {
    expect(calculateScenicScore(grids, 1, 2)).toBe(4);
    expect(calculateScenicScore(grids, 3, 2)).toBe(8);
  });
});

describe('bestScenicScore', () => {
  it('should calculate all tree scores and return the best', () => {
    const [trees] = findVisibleTrees(grids);
    expect(bestScenicScore(grids, trees)).toBe(8);
  });
});
