export function findNumbers(input: string): number[] {
  const numberReg = /\d+/gm;
  const symbolReg = /(?!\.|\d|\n)./gm;
  const allNumbers: [number, number][] = [];
  const symbolIndexes: { [key: number]: boolean } = {};
  const lineWidth = input.split('\n')[0].length + 1;

  let results;
  while ((results = numberReg.exec(input)) !== null) {
    const number = parseInt(results[0]);
    allNumbers.push([number, results.index]);
  }

  results = [];
  while ((results = symbolReg.exec(input)) !== null) {
    symbolIndexes[results.index] = true;
  }

  return allNumbers
    .filter(([number, index]) => {
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

      return indexesToCheck.some((i) => symbolIndexes[i]);
    })
    .map(([number]) => number);
}

export function machineNumberSum(input: string): number {
  return findNumbers(input).reduce((a, b) => a + b);
}
