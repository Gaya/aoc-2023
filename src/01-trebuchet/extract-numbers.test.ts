import {
  extractAllNumbers,
  extractAllNumbersWithNamed,
  extractNumbers,
  extractNumbersWithNamed,
} from './extract-numbers';

describe('extractNumbers', () => {
  it('should read numbers from string and make a number', () => {
    expect(extractNumbers('1abc2')).toEqual(12);
    expect(extractNumbers('pqr3stu8vwx')).toEqual(38);
  });

  it('should handle multiple numbers in strings', () => {
    expect(extractNumbers('a1b2c3d4e5f')).toEqual(15);
  });

  it('should handle no numbers', () => {
    expect(extractNumbers('trebuchet')).toEqual(0);
  });

  it('should handle empty strings', () => {
    expect(extractNumbers('')).toEqual(0);
  });

  it('should handle single numbers', () => {
    expect(extractNumbers('treb7uchet')).toEqual(77);
  });
});

describe('extractAllNumbers', () => {
  it('should sum up all the found numbers', () => {
    expect(extractAllNumbers(`
1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet
`)).toEqual(142);
  });
});

// extract with names
describe('extractNumbersWithNamed', () => {
  it('should read numbers from string and make a number', () => {
    expect(extractNumbersWithNamed('two1nine')).toEqual(29);
    expect(extractNumbersWithNamed('7pqrstsixteen')).toEqual(76);
    expect(extractNumbersWithNamed('heyoneighthallo')).toEqual(18);
    expect(extractNumbersWithNamed('heyseveninehallo')).toEqual(79);
  });
});

describe('extractAllNumbersWithNamed', () => {
  it('should calculate the total with named numbers', () => {
    expect(extractAllNumbersWithNamed(`two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`)).toEqual(281);
  });
});
