import { advanceStep, createGame, hasCollision, placeNewBlock, stackAfterRocks } from './rocks';
import { readFile } from 'fs/promises';

describe('placeNewBlock', () => {
  it('places a standard block for a fresh game', () => {
    expect(placeNewBlock({
      width: 7,
      moves: '',
      amountFixed: 0,
      moveNumber: 0,
      highestStack: -1,
      rocks: {},
      repTracker: {},
    })).toMatchObject({
      width: 7,
      amountFixed: 0,
      highestStack: -1,
      moveNumber: 0,
      current: {
        shape: 0,
        position: [2, 3],
      },
      rocks: {},
      moves: '',
    });
  });

  it('places a plus block after a minus block', () => {
    expect(placeNewBlock({
      width: 7,
      amountFixed: 1,
      moveNumber: 0,
      highestStack: 0,
      moves: '',
      lastFixed: { shape: 0, position: [2, 0] },
      repTracker: {},
      rocks: {
        2: {
          0: true,
        },
        3: {
          0: true,
        },
        4: {
          0: true,
        },
        5: {
          0: true,
        },
      },
    })).toMatchObject({
      width: 7,
      amountFixed: 1,
      highestStack: 0,
      moveNumber: 0,
      current: {
        shape: 1,
        position: [2, 6],
      },
      lastFixed: { shape: 0, position: [2, 0] },
      rocks: {
        2: {
          0: true,
        },
        3: {
          0: true,
        },
        4: {
          0: true,
        },
        5: {
          0: true,
        },
      },
      moves: '',
    });
  });
});

describe('createGame', () => {
  it('creates a fresh game based on inputs', () => {
    expect(createGame('<<<>>>')).toMatchObject({
      width: 7,
      amountFixed: 0,
      highestStack: -1,
      moveNumber: 0,
      current: {
        shape: 0,
        position: [2, 3],
      },
      rocks: {},
      moves: '<<<>>>',
    });
  });
});

describe('hasCollision', () => {
  it('can handle wall collisions', () => {
    expect(hasCollision({ shape: 0, position: [0, 1] }, {}, '<')).toBe(true);
    expect(hasCollision({ shape: 0, position: [3, 1] }, {}, '>')).toBe(true);
    expect(hasCollision({ shape: 0, position: [1, 1] }, {}, '<')).toBe(false);
    expect(hasCollision({ shape: 0, position: [2, 1] }, {}, '>')).toBe(false);
  });

  it('can handle bottom collisions', () => {
    expect(hasCollision({ shape: 0, position: [0, 0] }, {}, 'v')).toBe(true);
    expect(hasCollision({ shape: 0, position: [0, 1] }, {}, 'v')).toBe(false);
  });

  it('can handle block collisions', () => {
    expect(hasCollision({ shape: 0, position: [0, 3] }, { 4: { 4: true, 3: true, 2: true, 1: true } }, '>')).toBe(true);
    expect(hasCollision({ shape: 0, position: [1, 3] }, { 6: { 4: true, 3: true, 2: true, 1: true } }, '>')).toBe(false);

    expect(hasCollision({ shape: 0, position: [3, 3] }, { 2: { 4: true, 3: true, 2: true, 1: true } }, '<')).toBe(true);
    expect(hasCollision({ shape: 0, position: [3, 3] }, { 2: { 6: true, 5: true, 4: true, 3: true } }, '<')).toBe(true);
    expect(hasCollision({ shape: 0, position: [3, 3] }, { 2: { 3: true, 2: true, 1: true, 0: true } }, '<')).toBe(true);
    expect(hasCollision({ shape: 0, position: [3, 3] }, { 2: { 2: true, 1: true, 0: true } }, '<')).toBe(false);
    expect(hasCollision({ shape: 0, position: [3, 3] }, { 1: { 4: true, 3: true, 2: true, 1: true } }, '<')).toBe(false);

    expect(hasCollision({ shape: 0, position: [3, 3] }, { 4: { 2: true } }, 'v')).toBe(true);
  });
});

describe('advanceStep', () => {
  it('advances to game to the next step', () => {
    const game = createGame('>>><<><>><<<>><>>><<<>>><<<><<<>><>><<>>');

    const step1 = advanceStep(game);

    expect(step1).toMatchObject({
      width: 7,
      current: {
        shape: 0,
        position: [3, 2],
      },
      moveNumber: 1,
      amountFixed: 0,
      highestStack: -1,
      rocks: {},
    });

    const step2 = advanceStep(step1);

    expect(step2).toMatchObject({
      width: 7,
      current: {
        shape: 0,
        position: [3, 1],
      },
      amountFixed: 0,
      highestStack: -1,
      rocks: {},
      moveNumber: 2,
    });

    const step3 = advanceStep(step2);

    expect(step3).toMatchObject({
      width: 7,
      current: {
        shape: 0,
        position: [3, 0],
      },
      amountFixed: 0,
      highestStack: -1,
      rocks: {},
      moveNumber: 3,
    });

    const step4 = advanceStep(step3);

    expect(step4).toMatchObject({
      width: 7,
      current: {
        shape: 1,
        position: [2, 6],
      },
      amountFixed: 1,
      highestStack: 0,
      lastFixed: {
        shape: 0,
        position: [2, 0],
      },
      rocks: {
        2: {
          0: true,
        },
        3: {
          0: true,
        },
        4: {
          0: true,
        },
        5: {
          0: true,
        },
      },
      moveNumber: 4,
    });

    const step5 = advanceStep(step4);

    expect(step5).toMatchObject({
      width: 7,
      current: {
        shape: 1,
        position: [1, 5],
      },
      amountFixed: 1,
      highestStack: 0,
      lastFixed: {
        shape: 0,
        position: [2, 0],
      },
      rocks: {
        2: {
          0: true,
        },
        3: {
          0: true,
        },
        4: {
          0: true,
        },
        5: {
          0: true,
        },
      },
      moveNumber: 5,
    });

    const step6 = advanceStep(step5);

    expect(step6).toMatchObject({
      width: 7,
      current: {
        shape: 1,
        position: [2, 4],
      },
      amountFixed: 1,
      highestStack: 0,
      lastFixed: {
        shape: 0,
        position: [2, 0],
      },
      rocks: {
        2: {
          0: true,
        },
        3: {
          0: true,
        },
        4: {
          0: true,
        },
        5: {
          0: true,
        },
      },
      moveNumber: 6,
    });

    const step7 = advanceStep(step6);

    expect(step7).toMatchObject({
      width: 7,
      current: {
        shape: 1,
        position: [1, 3],
      },
      amountFixed: 1,
      highestStack: 0,
      lastFixed: {
        shape: 0,
        position: [2, 0],
      },
      rocks: {
        2: {
          0: true,
        },
        3: {
          0: true,
        },
        4: {
          0: true,
        },
        5: {
          0: true,
        },
      },
      moveNumber: 7,
    });

    const step8 = advanceStep(step7);

    expect(step8).toMatchObject({
      width: 7,
      current: {
        shape: 2,
        position: [2, 9],
      },
      amountFixed: 2,
      highestStack: 3,
      lastFixed: {
        shape: 1,
        position: [2, 3],
      },
      rocks: {
        2: {
          0: true,
          2: true,
        },
        3: {
          0: true,
          1: true,
          2: true,
          3: true,
        },
        4: {
          0: true,
          2: true,
        },
        5: {
          0: true,
        },
      },
      moveNumber: 8,
    });
  });
});

describe('stackAfterRocks', () => {
  it('should match the provide example of the AoC', () => {
    expect(stackAfterRocks('>>><<><>><<<>><>>><<<>>><<<><<<>><>><<>>', 2022)).toBe(3068);
  });

  it('should match the provide example of the AoC with insane amount', () => {
    expect(stackAfterRocks('>>><<><>><<<>><>>><<<>>><<<><<<>><>><<>>', 1000000000000))
      .toBe(1514285714288);
  });

  it('should match the provide input of the AoC with insane amount', async () => {
    const moves = (await readFile(__dirname + '/input.txt')).toString();
    expect(stackAfterRocks(moves, 1000000000000))
      .toBe(1602865329485); // 1582758620701
  });
});
