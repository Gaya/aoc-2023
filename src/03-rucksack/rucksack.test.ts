import {
  determineBadgeTypePrioritySum,
  determinePrioritySum,
  findBadgeType,
  findDouble,
  letterToPriority,
} from './rucksack';

describe('findDouble', () => {
  it('should find the correct doubles', () => {
    expect(findDouble('vJrwpWtwJgWrhcsFMMfFFhFp')).toStrictEqual('p');
    expect(findDouble('jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL')).toStrictEqual('L');
    expect(findDouble('PmmdzqPrVvPwwTWBwg')).toStrictEqual('P');
    expect(findDouble('wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn')).toStrictEqual('v');
    expect(findDouble('ttgJtRGJQctTZtZT')).toStrictEqual('t');
    expect(findDouble('CrZsJsPPZsGzwwsLwLmpwMDw')).toStrictEqual('s');
  });
});

describe('letterToPriority', () => {
  it('should correctly determine priority', () => {
    expect(letterToPriority('a')).toBe(1);
    expect(letterToPriority('z')).toBe(26);
    expect(letterToPriority('A')).toBe(27);
    expect(letterToPriority('Z')).toBe(52);
  });
});

const input = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw
`;

describe('determinePrioritySum', () => {
  it('should isolate doubles and sum up priorities', () => {
    expect(determinePrioritySum(input)).toBe(157);
  })
});

describe('findBadgeType', () => {
  expect(findBadgeType(['vJrwpWtwJgWrhcsFMMfFFhFp','jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL', 'PmmdzqPrVvPwwTWBwg'])).toBe('r');
  expect(findBadgeType(['wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn', 'ttgJtRGJQctTZtZT', 'CrZsJsPPZsGzwwsLwLmpwMDw'])).toBe('Z');
});

describe('determineBadgeTypePrioritySum', () => {
  it('should correctly split groups and calculate priorities', () => {
    expect(determineBadgeTypePrioritySum(`vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw
`)).toBe(70);
  });
});
