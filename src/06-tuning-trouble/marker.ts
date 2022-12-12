export function findMarkerIndex(input: string, length = 4): number {
  if (input.length < length) {
    throw new Error('Input is too short');
  }

  const start = length - 1;

  for (let i = start; i < input.length; i++) {
    const marker = new Set(input.substring(i - start, i + 1).split(''));

    if (marker.size === length) {
      return i + 1;
    }
  }

  return 0;
}
