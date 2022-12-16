import { countSand, dropSand, fillGrid, Grid, moveSand } from './sand';

describe('fillGrid', () => {
  it('should make a grid with rocks', () => {
    const input = `498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9`;

    const generated = fillGrid(input);

    expect(generated.x1).toBe(494);
    expect(generated.x2).toBe(503);
    expect(generated.y1).toBe(0);
    expect(generated.y2).toBe(9);

    expect(generated.grid).toMatchObject({
      "4": {
        "498": "r",
        "502": "r",
        "503": "r"
      },
      "5": {
        "498": "r",
        "502": "r"
      },
      "6": {
        "496": "r",
        "497": "r",
        "498": "r",
        "502": "r"
      },
      "7": {
        "502": "r"
      },
      "8": {
        "502": "r"
      },
      "9": {
        "494": "r",
        "495": "r",
        "496": "r",
        "497": "r",
        "498": "r",
        "499": "r",
        "500": "r",
        "501": "r",
        "502": "r"
      }
    });
  });
});

describe('moveSand', () => {
  it('can start at the given start location', () => {
    const grid: Grid = {
      start: [500, 0],
      x1: 500,
      x2: 500,
      y1: 0,
      y2: 2,
      grid: {
        2: {
          500: 'r',
        }
      },
    };

    const expectedGrid: Grid = {
      ...grid,
      grain: [500, 0],
      grid: {
        ...grid.grid,
        0: {
          500: 's',
        }
      },
    };

    expect(moveSand(grid)).toMatchObject(expectedGrid);
  });

  it('can move a grain of sand down', () => {
    const grid: Grid = {
      start: [500, 0],
      grain: [500, 0],
      x1: 500,
      x2: 500,
      y1: 0,
      y2: 2,
      grid: {
        0: {
          500: 's',
        },
        2: {
          500: 'r',
        }
      },
    };

    const expectedGrid: Grid = {
      ...grid,
      grain: [500, 1],
      grid: {
        ...grid.grid,
        0: {},
        1: {
          500: 's',
        }
      },
    };

    expect(moveSand(grid)).toMatchObject(expectedGrid);
  });

  it('can move a grain of sand down left', () => {
    const grid: Grid = {
      start: [500, 0],
      grain: [500, 0],
      x1: 499,
      x2: 501,
      y1: 0,
      y2: 2,
      grid: {
        0: {
          500: 's',
        },
        1: {
          500: 'r',
        },
        2: {
          499: 'r',
          500: 'r',
          501: 'r',
        }
      },
    };

    const expectedGrid: Grid = {
      ...grid,
      grain: [499, 1],
      grid: {
        ...grid.grid,
        0: {},
        1: {
          499: 's',
          500: 'r',
        }
      },
    };

    expect(moveSand(grid)).toMatchObject(expectedGrid);
  });

  it('can move a grain of sand down right', () => {
    const grid: Grid = {
      start: [500, 0],
      grain: [500, 0],
      x1: 499,
      x2: 501,
      y1: 0,
      y2: 2,
      grid: {
        0: {
          500: 's',
        },
        1: {
          499: 'r',
          500: 'r',
        },
        2: {
          499: 'r',
          500: 'r',
          501: 'r',
        }
      },
    };

    const expectedGrid: Grid = {
      ...grid,
      grain: [501, 1],
      grid: {
        ...grid.grid,
        0: {},
        1: {
          499: 'r',
          500: 'r',
          501: 's',
        }
      },
    };

    expect(moveSand(grid)).toMatchObject(expectedGrid);
  });

  it('can turn grain into stopped sand', () => {
    const grid: Grid = {
      start: [500, 0],
      grain: [500, 1],
      x1: 499,
      x2: 501,
      y1: 0,
      y2: 2,
      grid: {
        1: {
          500: 's',
        },
        2: {
          499: 'r',
          500: 'r',
          501: 'r',
        }
      },
    };

    const expectedGrid: Grid = {
      ...grid,
      grid: {
        ...grid.grid,
        1: {
          500: 'o',
        }
      },
    };

    delete expectedGrid.grain;

    expect(moveSand(grid)).toMatchObject(expectedGrid);
  });

  it('will drop sand into the abyss in the middle', () => {
    const grid: Grid = {
      start: [500, 0],
      grain: [500, 2],
      x1: 499,
      x2: 501,
      y1: 0,
      y2: 2,
      grid: {
        2: {
          499: 'r',
          500: 's',
          501: 'r',
        }
      },
    };

    const expectedGrid: Grid = {
      ...grid,
      abyss: [500, 2],
    };

    delete expectedGrid.grain;

    expect(moveSand(grid)).toMatchObject(expectedGrid);
  });

  it('will drop sand into the abyss in the bottom left', () => {
    const grid: Grid = {
      start: [500, 0],
      grain: [499, 1],
      x1: 499,
      x2: 501,
      y1: 0,
      y2: 2,
      grid: {
        1: {
          499: 's',
        },
        2: {
          499: 'r',
          500: 'r',
          501: 'r',
        }
      },
    };

    const expectedGrid: Grid = {
      ...grid,
      abyss: [499, 1],
    };

    delete expectedGrid.grain;

    expect(moveSand(grid)).toMatchObject(expectedGrid);
  });

  it('will drop sand into the abyss in the bottom right', () => {
    const grid: Grid = {
      start: [500, 0],
      grain: [501, 1],
      x1: 499,
      x2: 501,
      y1: 0,
      y2: 2,
      grid: {
        1: {
          501: 's',
        },
        2: {
          499: 'r',
          500: 'r',
          501: 'r',
        }
      },
    };

    const expectedGrid: Grid = {
      ...grid,
      abyss: [501, 1],
    };

    delete expectedGrid.grain;

    expect(moveSand(grid)).toMatchObject(expectedGrid);
  });
});

describe('dropSand', () => {
  const input = `498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9`;

  it('stops when sand falls into abyss', () => {
    const grid = dropSand(fillGrid(input), false, true);

    expect(grid.abyss).toStrictEqual([494, 8]);
    expect(countSand(grid)).toBe(24);
  });

  it('stops when sand cannot fall anymore', () => {
    const grid = dropSand(fillGrid(input), true, true);

    expect(countSand(grid)).toBe(93);
  });
});
