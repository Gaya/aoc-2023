import { parseInput, runCycles } from './cycles';
import testData from './cycles.test.data';

describe('parseInput', () => {
  it('should turn input into instructions', () => {
    const input = `noop
addx 3
addx -5`;

    expect(parseInput(input)).toStrictEqual([
      ['noop'],
      ['noop'],
      ['addx', 3],
      ['noop'],
      ['addx', -5],
    ]);
  });
});

describe('runCycles', () => {
  const instructions = parseInput(testData);

  it('should run cycles and return signal strengths', () => {
    expect(runCycles(instructions).signals).toStrictEqual([420, 1140, 1800, 2940, 2880, 3960]);
  });

  it('should run cycles and produce pixels', () => {
    expect(runCycles(instructions).pixels).toBe(
      '▓▓  ▓▓  ▓▓  ▓▓  ▓▓  ▓▓  ▓▓  ▓▓  ▓▓  ▓▓  \n' +
      '▓▓▓   ▓▓▓   ▓▓▓   ▓▓▓   ▓▓▓   ▓▓▓   ▓▓▓ \n' +
      '▓▓▓▓    ▓▓▓▓    ▓▓▓▓    ▓▓▓▓    ▓▓▓▓    \n' +
      '▓▓▓▓▓     ▓▓▓▓▓     ▓▓▓▓▓     ▓▓▓▓▓     \n' +
      '▓▓▓▓▓▓      ▓▓▓▓▓▓      ▓▓▓▓▓▓      ▓▓▓▓\n' +
      '▓▓▓▓▓▓▓       ▓▓▓▓▓▓▓       ▓▓▓▓▓▓▓     '
    );
  });
})
