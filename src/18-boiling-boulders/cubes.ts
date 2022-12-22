type Position = [number, number, number];

export function parseCubeInput(input: string): Position[] {
  return input.split('\n')
    .map((r) => r.split(',').map((d) => parseInt(d, 10)) as [number, number, number]);
}

type Grid = Record<number, Record<number, Record<number, boolean>>>;

function positionsToGrid(positions: Position[]): Grid {
  return positions.reduce((acc: Grid, [x, y, z]) => {
    if (!acc[z]) {
      acc[z] = {};
    }

    if (!acc[z][y]) {
      acc[z][y] = {};
    }

    acc[z][y][x] = true;

    return acc;
  }, {});
}

function exists(grid: Grid, [x, y, z]: [number, number, number]): boolean {
  return grid[z] && grid[z][y] && grid[z][y][x];
}

export function calculateSurfaceArea(positions: Position[]): number {
  const grid = positionsToGrid(positions);

  return positions.reduce((sides, [x, y, z]) => {
    let count = 0;
    for (let i = 0; i < 6; i++) {
      let dx = 0;
      let dy = 0;
      let dz = 0;

      if (i <= 1) {
        dx = i % 2 === 0 ? -1 : 1;
      }

      if (i >= 2 && i <= 3) {
        dy = i % 2 === 0 ? -1 : 1;
      }

      if (i >= 4 && i <= 5) {
        dz = i % 2 === 0 ? -1 : 1;
      }

      if (!exists(grid, [x + dx, y + dy, z + dz])) {
        count++;
      }
    }

    return sides + count;
  }, 0);
}

interface Ranges {
  x: [number, number];
  y: [number, number];
  z: [number, number];
}

export function calculateOutsideSurfaceArea(positions: Position[]): number {
  const grid = positionsToGrid(positions);
  const checkedGrid: Grid = {};
  const ranges = positions.reduce((acc: Ranges, [x, y, z]) => {
    return {
      x: [Math.min(acc.x[0], x), Math.max(acc.x[1], x)] as [number, number],
      y: [Math.min(acc.y[0], y), Math.max(acc.y[1], y)] as [number, number],
      z: [Math.min(acc.z[0], z), Math.max(acc.z[1], z)] as [number, number],
    };
  }, { x: [Infinity, -Infinity], y: [Infinity, -Infinity], z: [Infinity, -Infinity]});

  // set start
  let start = [ranges.x[0] - 1, ranges.y[0] - 1, ranges.z[0] - 1];
  let upNext = [start];
  let sides = 0;

  while (upNext.length > 0) {
    const [x, y, z] = upNext.shift() || [];

    if (exists(checkedGrid, [x, y, z])) {
      continue;
    }

    for (let i = 0; i < 6; i++) {
      let dx = 0;
      let dy = 0;
      let dz = 0;

      if (i <= 1) {
        dx = i % 2 === 0 ? -1 : 1;
      }

      if (i >= 2 && i <= 3) {
        dy = i % 2 === 0 ? -1 : 1;
      }

      if (i >= 4 && i <= 5) {
        dz = i % 2 === 0 ? -1 : 1;
      }

      const next: [number, number, number] = [x + dx, y + dy, z + dz];

      if (
        next[0] >= ranges.x[0] - 1 && x + dx <= ranges.x[1] + 1
        && next[1] >= ranges.y[0] - 1 && y + dy <= ranges.y[1] + 1
        && next[2] >= ranges.z[0] - 1 && z + dz <= ranges.z[1] + 1
      ) {
        if (!exists(grid, next)) {
          if (!exists(checkedGrid, next)) {
            upNext.push(next);
          }
        } else {
          sides++;
        }
      }
    }

    if (!checkedGrid[z]) {
      checkedGrid[z] = {};
    }

    if (!checkedGrid[z][y]) {
      checkedGrid[z][y] = {};
    }

    checkedGrid[z][y][x] = true;
  }

  return sides;
}
