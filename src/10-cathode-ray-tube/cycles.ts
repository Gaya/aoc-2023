const parseCycles = /^(addx|noop) ?(-?\d+)?/gm;

type Instruction = ['noop'] | ['addx', number];

export function parseInput(input: string): Instruction[] {
  const cycles = [...input.matchAll(parseCycles)];

  return cycles.reduce((acc: Instruction[], c) => {
    if (c[1] === 'addx') {
      return [
        ...acc,
        ['noop'],
        ['addx', parseInt(c[2], 10)],
      ];
    }

    return [...acc, ['noop']];
  }, []);
}

type SignalKeeper = { [c: number]: number };

export function runCycles(
  instructions: Instruction[],
  cycleChecks: number[] = [20, 60, 100, 140, 180, 220],
): {
  signals: number[],
  pixels: string,
} {
  let register = 1;
  let cycle = 0;
  const rowLength = 40;
  const signalStrengths: SignalKeeper = cycleChecks.reduce((acc: SignalKeeper, cycle) => {
    return {
      ...acc,
      [cycle]: register,
    };
  }, {});
  let pixels = '';

  for (const [instruction, argument] of instructions) {
    // increase cycle
    cycle += 1;

    let sign = ' ';
    const pixelPosition = (cycle - 1) % rowLength;
    if (
      register - 1 === pixelPosition
      || register === pixelPosition
      || register + 1 === pixelPosition) {
      sign = '▓';
    }
    pixels = [pixels, sign, cycle % rowLength === 0 && instructions.length !== cycle ? '\n' : ''].join('');

    // write signal strength
    if (signalStrengths[cycle]) {
      signalStrengths[cycle] = cycle * register;
    }

    if (instruction === 'addx') {
      register += argument;
    }
  }

  return {
    signals: Object.values(signalStrengths),
    pixels,
  };
}
