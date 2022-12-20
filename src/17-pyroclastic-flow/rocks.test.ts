import { advanceStep, createGame, hasCollision, placeNewBlock, stackAfterRocks } from './rocks';

describe('placeNewBlock', () => {
  it('places a standard block for a fresh game', () => {
    expect(placeNewBlock({
      width: 7,
      moves: '',
      amountFixed: 0,
      highestStack: -1,
      rocks: {},
    })).toMatchObject({
      width: 7,
      amountFixed: 0,
      highestStack: -1,
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
      highestStack: 0,
      moves: '',
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
    })).toMatchObject({
      width: 7,
      amountFixed: 1,
      highestStack: 0,
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
    // expect(hasCollision({ shape: 0, position: [0, 3] }, [{ shape: 3, position: [4, 4] }], '>')).toBe(true);
    // expect(hasCollision({ shape: 0, position: [1, 3] }, [{ shape: 3, position: [6, 4] }], '>')).toBe(false);
    //
    // expect(hasCollision({ shape: 0, position: [3, 3] }, [{ shape: 3, position: [2, 4] }], '<')).toBe(true);
    // expect(hasCollision({ shape: 0, position: [3, 3] }, [{ shape: 3, position: [2, 6] }], '<')).toBe(true);
    // expect(hasCollision({ shape: 0, position: [3, 3] }, [{ shape: 3, position: [2, 3] }], '<')).toBe(true);
    // expect(hasCollision({ shape: 0, position: [3, 3] }, [{ shape: 3, position: [2, 2] }], '<')).toBe(false);
    // expect(hasCollision({ shape: 0, position: [3, 3] }, [{ shape: 3, position: [1, 4] }], '<')).toBe(false);
    //
    // expect(hasCollision({ shape: 0, position: [3, 3] }, [{ shape: 1, position: [3, 2] }], 'v')).toBe(true);
    // expect(hasCollision({ shape: 0, position: [3, 3] }, [{ shape: 1, position: [3, 1] }], 'v')).toBe(false);
    //
    // expect(hasCollision({ shape: 2, position: [0, 6] }, [{ shape: 1, position: [2, 3] }], 'v')).toBe(false);
    // expect(hasCollision({ shape: 2, position: [0, 5] }, [{ shape: 1, position: [2, 3] }], 'v')).toBe(true);
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
      amountFixed: 0,
      highestStack: -1,
      rocks: {},
      moves: '>><<><>><<<>><>>><<<>>><<<><<<>><>><<>>>',
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
      moves: '><<><>><<<>><>>><<<>>><<<><<<>><>><<>>>>',
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
      moves: '<<><>><<<>><>>><<<>>><<<><<<>><>><<>>>>>',
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
      moves: '<><>><<<>><>>><<<>>><<<><<<>><>><<>>>>><',
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
      moves: '><>><<<>><>>><<<>>><<<><<<>><>><<>>>>><<',
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
      moves: '<>><<<>><>>><<<>>><<<><<<>><>><<>>>>><<>',
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
      moves: '>><<<>><>>><<<>>><<<><<<>><>><<>>>>><<><',
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
      moves: '><<<>><>>><<<>>><<<><<<>><>><<>>>>><<><>',
    });
  });
});

describe('stackAfterRocks', () => {
  it('should match the provide example of the AoC', () => {
    expect(stackAfterRocks('>>><<><>><<<>><>>><<<>>><<<><<<>><>><<>>', 2022)).toBe(3068);
  });

  it.skip('should match the provide example of the AoC with insane amount', () => {
    expect(stackAfterRocks('>>><<><>><<<>><>>><<<>>><<<><<<>><>><<>>', 1000000000000))
      .toBe(1514285714288);
  });
});
