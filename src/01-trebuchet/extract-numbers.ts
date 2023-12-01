export function extractNumbers(input: string): number {
  const numbers = input.match(/\d/g);

  if (numbers) {
    return parseInt(numbers[0] + numbers[numbers.length - 1], 10);
  }

  return 0;
}

export function extractAllNumbers(input: string): number {
  return input.split(/\r?\n/).map(extractNumbers).reduce((a, b) => a + b);
}

function replaceNamedNumber(number: string): string {
  switch (number) {
    case 'one':
    case 'eno':
      return '1';
    case 'two':
    case 'owt':
      return '2';
    case 'three':
    case 'eerht':
      return '3';
    case 'four':
    case 'ruof':
      return '4';
    case 'five':
    case 'evif':
      return '5';
    case 'six':
    case 'xis':
      return '6';
    case 'seven':
    case 'neves':
      return '7';
    case 'eight':
    case 'thgie':
      return '8';
    case 'nine':
    case 'enin':
      return '9';
    default:
      return number;
  }
}

export function extractNumbersWithNamed(input: string): number {
  const numbers = input.match(/\d|one|two|three|four|five|six|seven|eight|nine/g);
  const reversed = input.split('').reverse().join('')
    .match(/\d|eno|owt|eerht|ruof|evif|xis|neves|thgie|enin/g);

  if (numbers && reversed) {
    const combined = replaceNamedNumber(numbers[0]) + replaceNamedNumber(reversed[0]);
    return parseInt(combined, 10);
  }

  return 0;
}

export function extractAllNumbersWithNamed(input: string): number {
  return input.split(/\r?\n/).map(extractNumbersWithNamed).reduce((a, b) => a + b);
}
