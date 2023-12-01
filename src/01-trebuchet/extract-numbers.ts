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
      return '1';
    case 'two':
      return '2';
    case 'three':
      return '3';
    case 'four':
      return '4';
    case 'five':
      return '5';
    case 'six':
      return '6';
    case 'seven':
      return '7';
    case 'eight':
      return '8';
    case 'nine':
      return '9';
    default:
      return number;
  }
}

export function extractNumbersWithNamed(input: string): number {
  const numbers = input.match(/\d|one|two|three|four|five|six|seven|eight|nine/g);
  const reversed = /^.*(\d|one|two|three|four|five|six|seven|eight|nine).*$/g.exec(input);

  if (numbers && reversed) {
    const combined = replaceNamedNumber(numbers[0]) + replaceNamedNumber(reversed[1]);
    return parseInt(combined, 10);
  }

  return 0;
}

export function extractAllNumbersWithNamed(input: string): number {
  return input.split(/\r?\n/).map(extractNumbersWithNamed).reduce((a, b) => a + b);
}
