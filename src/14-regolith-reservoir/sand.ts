// r = rock
// s = sand
// o = stopped sand
type Tile = 'r' | 's' | 'o';
export type Grid = {
  start: [number, number];
  grain?: [number, number];
  abyss?: [number, number];
  x1: number;
  x2: number;
  y1: number;
  y2: number;
  grid: Record<number, Record<number, Tile>>;
}

function addTile(grid: Grid, x: number, y: number, t: Tile = 'r'): Grid {
  if (!grid.grid[y]) {
    grid.grid[y] = {};
  }

  grid.grid[y][x] = t;

  return grid;
}

function moveGridGrain(grid: Grid, x: number, y: number): Grid {
  if (!grid.grain) {
    throw new Error('There was no grain to move...');
  }

  const [gx, gy] = grid.grain;

  delete grid.grid[gy][gx];
  grid.grain = [x, y];
  return addTile(grid, x, y, 's');
}

export function fillGrid(input: string, [sx, sy]: [number, number] = [500, 0]): Grid {
  const instructions = input.split('\n');
  const grid: Grid = {
    start: [sx, sy],
    x1: 0,
    x2: 0,
    y1: 0,
    y2: 0,
    grid: {},
  };

  instructions.forEach((instruction) => {
    const points = instruction.split(' -> ').map((p) => p.split(',').map((i) => parseInt(i, 10)));
    for (let step = 1; step < points.length; step++) {
      const [ax, ay] = points[step - 1];
      const [bx, by] = points[step];
      const horizontal = ax - bx !== 0;

      addTile(grid, ax, ay);
      const dist = horizontal ? bx - ax : by - ay;

      for (let i = 0; i < Math.abs(dist); i++) {
        const change = dist < 0 ? (i * -1) - 1 : i + 1;
        const x = horizontal ? ax + change : ax;
        const y = !horizontal ? ay + change : ay;
        addTile(grid, x, y);
      }
    }
  });

  const rows = Object.keys(grid.grid).map((r) => parseInt(r, 10));
  const cols = Object.values(grid.grid).map((r) => Object.keys(r).map((c) => parseInt(c, 10)))
    .flat();

  grid.y1 = Math.min(...rows, sy);
  grid.y2 = Math.max(...rows, sy);
  grid.x1 = Math.min(...cols, sx);
  grid.x2 = Math.max(...cols, sx);

  return grid;
}

function getTile(grid: Grid, x: number, y: number): Tile | undefined {
  return grid.grid[y] ? grid.grid[y][x] : undefined;
}

export function moveSand(grid: Grid): Grid {
  const [sx, sy] = grid.start;

  // no sand yet, draw a grain
  if (typeof grid.grain === 'undefined') {
    grid.grain = [sx, sy];
    return addTile(grid, sx, sy, 's');
  }

  const [gx, gy] = grid.grain;

  for (let dir = 0; dir < 3; dir++) {
    let dx = 0;

    switch (dir) {
      // down left
      case 1:
        dx = -1;
        break;
      // down right
      case 2:
        dx = 1;
        break;
      // plain down
      default:
        dx = 0;
        break;
    }

    const ny = gy + 1;
    const nx = gx + dx;
    const nextPosition = getTile(grid, nx, ny);
    if (typeof nextPosition === 'undefined') {
      // does the grain fall off the grid?
      if (ny > grid.y2 || nx < grid.x1 || nx > grid.x2) {
        delete grid.grain;
        grid.abyss = [gx, gy];
        return grid;
      }

      return moveGridGrain(grid, nx, ny);
    }
  }

  // turn into dropped grain and remove grain from grid
  delete grid.grain;
  return addTile(grid, gx, gy, 'o');
}

export function countSand(grid: Grid): number {
  return Object.values(grid.grid).reduce((acc, row) => {
    return acc + Object.values(row).reduce((acc2, c) => c === 'o' ? acc2 + 1 : acc2, 0);
  }, 0);
}

function symbolByTile(t?: Tile): string {
  switch (t) {
    case 'r':
      return '#';
    case 'o':
      return 'o';
    case 's':
      return '+';
    default:
      return ' ';
  }
}

function drawGrid(grid: Grid): void {
  const { x1, x2, y1, y2 } = grid;

  for (let x = x1; x < x2 + 7; x++) {
    process.stdout.write('-');
  }
  process.stdout.write('\n');

  for (let y = y1; y < y2 + 1; y++) {
    process.stdout.write('|  ');
    for (let x = x1; x < x2 + 1; x++) {
      process.stdout.write(symbolByTile(getTile(grid, x, y)));
    }
    process.stdout.write('  |\n');
  }
  for (let x = x1; x < x2 + 7; x++) {
    process.stdout.write('-');
  }
  process.stdout.write('\n');
}

export function dropSand(grid: Grid, render = false): Grid {
  while (!grid.abyss) {
    grid = moveSand(grid);
  }

  if (render) {
    drawGrid(grid);
  }

  return grid;
}
