type Coordinates = [number, number][];
type Grids = [number[][], number[][]];

export function toGrid(input: string): Grids {
  const grid = input
    .split('\n')
    .map((r) => r.split('').map((c) => parseInt(c, 10)));
  const vertGrid = grid[0].map((cols, c) => grid.map((rows, r) => grid[r][c]));

  return [grid, vertGrid];
}

export function findVisibleTrees([grid, vertGrid]: Grids): [Coordinates, number] {
  const rows = grid.length;
  const cols = grid[0].length;

  let visibleTrees: Coordinates = [];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      // edge tree
      if (c === 0 || r === 0 || c === cols - 1 || r === rows - 1) {
        // ignore
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
          visibleTrees.push([r, c]);
        }
      }
    }
  }

  const total = visibleTrees.length + (rows * 2) + (cols * 2) - 4;

  return [visibleTrees, total];
}

export function calculateScenicScore([grid, vertGrid]: Grids, r = 0, c = 0): number {
  const rows = grid.length;
  const cols = grid[0].length;
  const height = grid[r][c];

  const leftTrees = grid[r].reduceRight((dist, tree, index) => {
    if (dist === 0 && index === 0) {
      return c;
    } else if (dist === 0 && index < c && tree >= height) {
      return c - index;
    }

    return dist;
  }, 0);
  const rightTrees = grid[r].reduce((dist, tree, index) => {
    if (dist === 0 && index + 1 === cols) {
      return index - c;
    } else if (dist === 0 && index > c && tree >= height) {
      return index - c;
    }

    return dist;
  }, 0);
  const upTrees = vertGrid[c].reduceRight((dist, tree, index) => {
    if (dist === 0 && index === 0) {
      return r;
    } else if (dist === 0 && index < r && tree >= height) {
      return r - index;
    }

    return dist;
  }, 0);
  const downTrees = vertGrid[c].reduce((dist, tree, index) => {
    if (dist === 0 && index + 1 === rows) {
      return index - r;
    } else if (dist === 0 && index > r && tree >= height) {
      return index - r;
    }

    return dist;
  }, 0);

  return leftTrees * rightTrees * upTrees * downTrees;
}

export function bestScenicScore(grids: Grids, trees: Coordinates): number {
  const scores = trees.map(([r, c]) => calculateScenicScore(grids, r, c));

  return Math.max(...scores);
}
