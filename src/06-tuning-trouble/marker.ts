export function findMarkerIndex(input: string, length = 4): number {
  if (input.length < length) {
    throw new Error('Input is too short');
  }

  const start = length - 1;

  for (let i = start; i < input.length; i++) {
    const t: { [l: string]: boolean } = {};
    let duplicate = false;
    const marker = input.substring(i - start, i + 1).split('');

    for (const l of marker) {
      if (t[l]) {
        duplicate = true;
        continue;
      }

      t[l] = true;
    }

    if (!duplicate) {
      return i + 1;
    }
  }

  return 0;
}
