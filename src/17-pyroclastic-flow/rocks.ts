const blockTypes = {
  // -
  0: [[0, 0], [1, 0], [2, 0], [3, 0]],
  // +
  1: [[1, 0], [0, -1], [1, -1], [2, -1], [1, -2]],
  // L flipped H
  2: [[2, 0], [2, -1], [0, -2], [1, -2], [2, -2]],
  // |
  3: [[0, 0], [0, -1], [0, -2], [0, -3]],
  // block
  4: [[0, 0], [1, 0], [0, -1], [1, -1]],
}

interface Block {
  shape: 0 | 1 | 2 | 3 | 4;
  position: [number, number];
}

interface Game {
  width: number;
  current?: Block;
  lastFixed?: Block;
  moves: string;
  highestStack: number;
  amountFixed: number;
  rocks: Record<number, Record<number, boolean>>;
}

function shapeWidth(shape: number): number {
  switch (shape) {
    case 4:
      return 2;
    case 3:
      return 1;
    case 2:
    case 1:
      return 3;
    default:
    case 0:
      return 4;
  }
}

function shapeHeight(shape: number): number {
  switch (shape) {
    case 4:
      return 2;
    case 3:
      return 4;
    case 2:
    case 1:
      return 3;
    default:
    case 0:
      return 1;
  }
}

export function placeNewBlock(game: Game) {
  if (game.current) {
    throw new Error('Already has a moving block!');
  }

  const lastFixed = game.lastFixed;
  const height = game.highestStack;
  const lastBlock = !lastFixed ? 4 : lastFixed.shape;
  const shape = (lastBlock + 1) % 5 as 0 | 1 | 2 | 3 | 4;

  const current: Block = {
    shape,
    position: [2, height + 3 + shapeHeight(shape)],
  };

  return {
    ...game,
    current,
  };
}

export function createGame(moves: string): Game {
  return placeNewBlock({
    width: 7,
    rocks: {},
    amountFixed: 0,
    highestStack: -1,
    moves,
  });
}

export function hasCollision(
  block: Block,
  rocks: Game['rocks'],
  move: '<' | '>' | 'v',
  width = 7,
): boolean {
  const [x1, y1] = block.position;
  let dx = 0;
  let dy = 0;

  if (move === '<') {
    dx = -1;
  }

  if (move === '>') {
    dx = 1;
  }

  if (move === 'v') {
    dy = -1;
  }

  // left wall
  if (x1 + dx < 0) {
    return true;
  }

  // right wall
  if (x1 + shapeWidth(block.shape) + dx > width) {
    return true;
  }

  // floor
  if (y1 + dy < 0) {
    return true;
  }

  if (Object.keys(rocks).length === 0) {
    return false;
  }

  // rocks
  return blockTypes[block.shape].some(([x, y]) => {
    return rocks[x + dx + x1] ? rocks[x + dx + x1][y + dy + y1] : false;
  });
}

export function advanceStep(game: Game): Game {
  if (!game.current) {
    throw new Error('Game should have a current block.');
  }

  const move = game.moves[0] as '<' | '>';

  let newGame = {
    ...game,
    moves: [game.moves.substring(1), move].join(''),
  };

  if (!newGame.current) {
    throw new Error('This cannot happen.');
  }

  // make game move
  if (!hasCollision(game.current, game.rocks, move, game.width)) {
    // current can make move
    const dx = move === '>' ? 1 : -1;
    newGame.current = {
      ...game.current,
      position: [newGame.current.position[0] + dx, newGame.current.position[1]],
    };
  }

  // move down
  if (hasCollision(newGame.current, newGame.rocks, 'v', newGame.width)) {
    // move to fixed
    newGame.amountFixed += 1;

    // place block in rocks
    const [bx, by] = newGame.current.position;
    blockTypes[newGame.current.shape].forEach(([x, y]) => {
      const ny = by + y;
      const nx = bx + x;

      if (!newGame.rocks[nx]) {
        newGame.rocks[nx] = {};
      }

      newGame.rocks[nx][ny] = true;
    });

    if (newGame.current.position[1] > newGame.highestStack) {
      newGame.highestStack = newGame.current.position[1];
    }

    newGame.lastFixed = newGame.current;
    delete newGame.current;
    newGame = placeNewBlock(newGame);
  } else {
    // move one down
    newGame.current = {
      ...game.current,
      position: [newGame.current.position[0], newGame.current.position[1] - 1],
    };
  }

  return newGame;
}

export function stackAfterRocks(moves: string, amount = 2022): number {
  let game = createGame(moves);
  while (game.amountFixed < amount) {
    game = advanceStep(game);
  }

  return game.highestStack + 1;
}
