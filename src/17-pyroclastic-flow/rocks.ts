const blockTypes = {
  // -
  0: [[0, 0], [1, 0], [2, 0], [3, 0]],
  // +
  1: [[1, 0], [0, -1], [1, -1], [2, -1], [2, -2]],
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
  moves: string;
  fixed: Block[];
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

  const lastFixed = game.fixed[game.fixed.length - 1];
  const stackHeight = lastFixed ? lastFixed.position[1] : -1;
  const lastBlock = !lastFixed ? 4 : lastFixed.shape;
  const shape = (lastBlock + 1) % 5 as 0 | 1 | 2 | 3 | 4;

  const current: Block = {
    shape,
    position: [2, stackHeight + 3 + shapeHeight(shape)],
  };

  return {
    ...game,
    current,
  };
}

export function createGame(moves: string): Game {
  return placeNewBlock({
    width: 7,
    fixed: [],
    moves,
  });
}

export function hasCollision(
  block: Block,
  others: Block[],
  move: '<' | '>' | 'v',
  width = 7,
): boolean {
  const [x1, y1] = block.position;
  const bh = shapeHeight(block.shape)
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

  if (x1 + dx < 0) {
    return true;
  }

  if (x1 + shapeWidth(block.shape) + dx > width) {
    return true;
  }

  if (y1 + dy < 0) {
    return true;
  }

  return others.some((other) => {
    const [x2, y2] = other.position;

    if (y2 < y1 - bh) {
      return false;
    }

    const a = blockTypes[block.shape].map(([x, y]) => [x + dx + x1, y + dy + y1]);
    const b = blockTypes[other.shape].map(([x, y]) => [x + x2, y + y2]);

    return b.some((bpos) => a.some((apos) => apos[0] === bpos[0] && apos[1] === bpos[1]));
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
  if (!hasCollision(game.current, game.fixed, move, game.width)) {
    // current can make move
    const dx = move === '>' ? 1 : -1;
    newGame.current = {
      ...game.current,
      position: [newGame.current.position[0] + dx, newGame.current.position[1]],
    };
  }

  // move down
  if (hasCollision(game.current, game.fixed, 'v', game.width)) {
    // move to fixed
    newGame.fixed = [...newGame.fixed, newGame.current];
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
  while (game.fixed.length < amount) {
    game = advanceStep(game);
  }

  const lastFixed = game.fixed[game.fixed.length - 1];
  return lastFixed.position[1] + shapeHeight(lastFixed.shape);
}
