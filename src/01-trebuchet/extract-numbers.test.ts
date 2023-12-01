import { extractAllNumbers, extractNumbers } from './extract-numbers';

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
