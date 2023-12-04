function numbersFromInput(input: string): [number, number][] {
  const numberReg = /\d+/gm;
  const allNumbers: [number, number][] = [];

  let results;
  while ((results = numberReg.exec(input)) !== null) {
    const number = parseInt(results[0]);
    allNumbers.push([number, results.index]);
  }

  return allNumbers;
}

function symbolIndexesFromInput(input: string): { [key: number]: boolean } {
  const symbolReg = /(?!\.|\d|\n)./gm;
  const symbolIndexes: { [key: number]: boolean } = {};

  let results;
  while ((results = symbolReg.exec(input)) !== null) {
    symbolIndexes[results.index] = true;
  }

  return symbolIndexes;
}

function symbolGearIndexesFromInput(input: string): number[] {
  const symbolReg = /(?!\.|\d|\n)\*/gm;
  const symbolIndexes: number[] = [];

  let results;
  while ((results = symbolReg.exec(input)) !== null) {
    symbolIndexes.push(results.index);
  }

  return symbolIndexes;
}

function indexesToCheck([number, index]: [number, number], lineWidth = 0) {
  const numLength = number.toString().length;
  const indexesToCheck = [];

  // do we need to check left?
  if (index % lineWidth !== 0) {
    indexesToCheck.push(index - (lineWidth + 1));
    indexesToCheck.push(index - 1);
    indexesToCheck.push(index + (lineWidth - 1));
  }

  for (let i = 0; i < numLength; i++) {
    indexesToCheck.push(index - lineWidth + i);
    indexesToCheck.push(index + lineWidth + i);
  }

  // do we need to check right?
  if ((index % lineWidth) + numLength < lineWidth) {
    indexesToCheck.push(index + numLength - lineWidth);
    indexesToCheck.push(index + numLength);
    indexesToCheck.push(index + numLength + lineWidth);
  }

  return indexesToCheck;
}

export function findNumbers(input: string): number[] {
  const allNumbers = numbersFromInput(input);
  const lineWidth = input.split('\n')[0].length + 1;
  const symbolIndexes = symbolIndexesFromInput(input);

  return allNumbers
    .filter((num) => {
      return indexesToCheck(num, lineWidth)
        .some((i) => symbolIndexes[i]);
    })
    .map(([number]) => number);
}

export function machineNumberSum(input: string): number {
  return findNumbers(input).reduce((a, b) => a + b);
}

export function gearRatio(input: string): number {
  const allNumbers = numbersFromInput(input);
  const lineWidth = input.split('\n')[0].length + 1;
  const gearIndexes = symbolGearIndexesFromInput(input);

  const allNumbersWithIndexes = allNumbers.map((num) => [num, indexesToCheck(num, lineWidth)]);

  return gearIndexes.reduce((acc, gearIndex) => {
    const toBeMultiplied = allNumbersWithIndexes
      .filter(([_, indexes]) => indexes.includes(gearIndex))
      .map(([num]) => num[0]);

    if (toBeMultiplied.length > 1) {
      let multiplied = toBeMultiplied[0];

      for (let i = 1; i < toBeMultiplied.length; i++) {
        multiplied = multiplied * toBeMultiplied[i];
      }

      return acc + multiplied;
    }

    return acc;
  }, 0);
}
