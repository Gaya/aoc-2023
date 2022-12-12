import { moveStacks, parseInstructions, parseStacks } from './stack';

const input = `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2
`;

describe('parseStacks', () => {
  it('should parse the stacks header of input to correct inputs', () => {
    expect(parseStacks(input)).toStrictEqual([
      'NZ',
      'DCM',
      'P'
    ]);
  });
});

describe('parseInstructions', () => {
  it('should make a list of instructions based on the input', () => {
    expect(parseInstructions(input)).toStrictEqual([
      [1, 2, 1],
      [3, 1, 3],
      [2, 2, 1],
      [1, 1, 2],
    ]);
  });
});

describe('moveStacks', () => {
  it('should parse and move stacks according to instructions', () => {
    expect(moveStacks(input)).toBe('CMZ');
  });
});
