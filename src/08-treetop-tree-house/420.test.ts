import { findVisibleTrees } from './420';

const grid = `30373
25512
65332
33549
35390`;

describe('findVisibleTrees', () => {
  it('should find the number of visible trees', () => {
    expect(findVisibleTrees(grid)).toBe(21);
  });
});
