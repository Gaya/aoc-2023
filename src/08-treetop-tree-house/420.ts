function toGrid(input: string): number[][] {
  return input
    .split('\n')
    .map((r) => r.split('').map((c) => parseInt(c, 10)));
}

export function findVisibleTrees(input: string): number {
  const grid = toGrid(input);
  const vertGrid = grid[0].map((cols, c) => grid.map((rows, r) => grid[r][c]));
  const rows = grid.length;
  const cols = grid[0].length;

  let visibleTrees = 0;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      // edge tree
      if (c === 0 || r === 0 || c === cols - 1 || r === rows - 1) {
        visibleTrees++;
      } else {
        // check visibility
        const height = grid[r][c];
        const row = grid[r];
        const col = vertGrid[c];

        if (
          // left
          row.filter((n, i) => i < c && n >= height).length === 0
          // up
          || col.filter((n, i) => i < r && n >= height).length === 0
          // right
          || row.filter((n, i) => i > c && n >= height).length === 0
          // down
          || col.filter((n, i) => i > r && n >= height).length === 0
        ) {
          visibleTrees++;
        }
      }
    }
  }

  return visibleTrees;
}
