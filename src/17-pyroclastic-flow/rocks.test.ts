import { advanceStep, createGame, hasCollision, placeNewBlock, stackAfterRocks } from './rocks';

describe('placeNewBlock', () => {
  it('places a standard block for a fresh game', () => {
    expect(placeNewBlock({ width: 7, moves: '', fixed: [] })).toMatchObject({
      width: 7,
      current: {
        shape: 0,
        position: [2, 3],
      },
      fixed: [],
      moves: '',
    });
  });

  it('places a plus block after a minus block', () => {
    expect(placeNewBlock({
      width: 7,
      moves: '',
      fixed: [{ shape: 0, position: [2, 0] }],
    })).toMatchObject({
      width: 7,
      current: {
        shape: 1,
        position: [2, 6],
      },
      fixed: [{ shape: 0, position: [2, 0] }],
      moves: '',
    });
  });
});

describe('createGame', () => {
  it('creates a fresh game based on inputs', () => {
    expect(createGame('<<<>>>')).toMatchObject({
      width: 7,
      current: {
        shape: 0,
        position: [2, 3],
      },
      fixed: [],
      moves: '<<<>>>',
    });
  });
});

describe('hasCollision', () => {
  it('can handle wall collisions', () => {
    expect(hasCollision({ shape: 0, position: [0, 1] }, [], '<')).toBe(true);
    expect(hasCollision({ shape: 0, position: [3, 1] }, [], '>')).toBe(true);
    expect(hasCollision({ shape: 0, position: [1, 1] }, [], '<')).toBe(false);
    expect(hasCollision({ shape: 0, position: [2, 1] }, [], '>')).toBe(false);
  });

  it('can handle bottom collisions', () => {
    expect(hasCollision({ shape: 0, position: [0, 0] }, [], 'v')).toBe(true);
    expect(hasCollision({ shape: 0, position: [0, 1] }, [], 'v')).toBe(false);
  });

  it('can handle block collisions', () => {
    expect(hasCollision({ shape: 0, position: [0, 3] }, [{ shape: 3, position: [4, 4] }], '>')).toBe(true);
    expect(hasCollision({ shape: 0, position: [1, 3] }, [{ shape: 3, position: [6, 4] }], '>')).toBe(false);

    expect(hasCollision({ shape: 0, position: [3, 3] }, [{ shape: 3, position: [2, 4] }], '<')).toBe(true);
    expect(hasCollision({ shape: 0, position: [3, 3] }, [{ shape: 3, position: [2, 6] }], '<')).toBe(true);
    expect(hasCollision({ shape: 0, position: [3, 3] }, [{ shape: 3, position: [2, 3] }], '<')).toBe(true);
    expect(hasCollision({ shape: 0, position: [3, 3] }, [{ shape: 3, position: [2, 2] }], '<')).toBe(false);
    expect(hasCollision({ shape: 0, position: [3, 3] }, [{ shape: 3, position: [1, 4] }], '<')).toBe(false);

    expect(hasCollision({ shape: 0, position: [3, 3] }, [{ shape: 1, position: [3, 2] }], 'v')).toBe(true);
    expect(hasCollision({ shape: 0, position: [3, 3] }, [{ shape: 1, position: [3, 1] }], 'v')).toBe(false);
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
      fixed: [],
      moves: '>><<><>><<<>><>>><<<>>><<<><<<>><>><<>>>',
    });

    const step2 = advanceStep(step1);

    expect(step2).toMatchObject({
      width: 7,
      current: {
        shape: 0,
        position: [3, 1],
      },
      fixed: [],
      moves: '><<><>><<<>><>>><<<>>><<<><<<>><>><<>>>>',
    });

    const step3 = advanceStep(step2);

    expect(step3).toMatchObject({
      width: 7,
      current: {
        shape: 0,
        position: [3, 0],
      },
      fixed: [],
      moves: '<<><>><<<>><>>><<<>>><<<><<<>><>><<>>>>>',
    });

    const step4 = advanceStep(step3);

    expect(step4).toMatchObject({
      width: 7,
      current: {
        shape: 1,
        position: [2, 6],
      },
      fixed: [{
        shape: 0,
        position: [2, 0],
      }],
      moves: '<><>><<<>><>>><<<>>><<<><<<>><>><<>>>>><',
    });

    const step5 = advanceStep(step4);

    expect(step5).toMatchObject({
      width: 7,
      current: {
        shape: 1,
        position: [1, 5],
      },
      fixed: [{
        shape: 0,
        position: [2, 0],
      }],
      moves: '><>><<<>><>>><<<>>><<<><<<>><>><<>>>>><<',
    });

    const step6 = advanceStep(step5);

    expect(step6).toMatchObject({
      width: 7,
      current: {
        shape: 1,
        position: [2, 4],
      },
      fixed: [{
        shape: 0,
        position: [2, 0],
      }],
      moves: '<>><<<>><>>><<<>>><<<><<<>><>><<>>>>><<>',
    });

    const step7 = advanceStep(step6);

    expect(step7).toMatchObject({
      width: 7,
      current: {
        shape: 1,
        position: [1, 3],
      },
      fixed: [{
        shape: 0,
        position: [2, 0],
      }],
      moves: '>><<<>><>>><<<>>><<<><<<>><>><<>>>>><<><',
    });

    const step8 = advanceStep(step7);

    expect(step8).toMatchObject({
      width: 7,
      current: {
        shape: 2,
        position: [2, 9],
      },
      fixed: [{
        shape: 0,
        position: [2, 0],
      }, {
        shape: 1,
        position: [2, 3],
      }],
      moves: '><<<>><>>><<<>>><<<><<<>><>><<>>>>><<><>',
    });
  });
});

describe('stackAfterRocks', () => {
  it('should match the provide example of the AoC', () => {
    expect(stackAfterRocks('>>><<><>><<<>><>>><<<>>><<<><<<>><>><<>>', 2022)).toBe(3068);
  });
});
