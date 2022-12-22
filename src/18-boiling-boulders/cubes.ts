type Position = [number, number, number];

export function parseCubeInput(input: string): Position[] {
  return input.split('\n')
    .map((r) => r.split(',').map((d) => parseInt(d, 10)) as [number, number, number]);
}

type Grid = Record<number, Record<number, Record<number, boolean>>>;

function exists(grid: Grid, [x, y, z]: [number, number, number]): boolean {
  return grid[z] && grid[z][y] && grid[z][y][x];
}

export function calculateSurfaceArea(positions: Position[]): number {
  const grid: Grid = positions.reduce((acc: Grid, [x, y, z]) => {
    if (!acc[z]) {
      acc[z] = {};
    }

    if (!acc[z][y]) {
      acc[z][y] = {};
    }

    acc[z][y][x] = true;

    return acc;
  }, {});

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
