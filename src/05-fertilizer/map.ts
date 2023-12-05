export function mapLookup(map: string, source: number): number {
  const ranges = map.match(/\d+/g);

  if (!ranges) {
    return 0;
  }

  const rows = ranges.length / 3;

  for (let i = 0; i < rows; i++) {
    const offset = 3 * i;
    const destStart = ranges[offset];
    const sourceStart = parseInt(ranges[offset + 1], 10);
    const range = parseInt(ranges[offset + 2], 10);

    if (source >= sourceStart && source <= sourceStart + range) {
      const diff = source - sourceStart;
      return parseInt(destStart, 10) + diff;
    }
  }

  return source;
}

export function followMaps(input: string): number {
  const results = input.match(/((\d+)\s?)+/gm);

  if (!results) {
    return 0;
  }

  const [seeds, ...maps] = results;

  const seedNumbers = (seeds.match(/\d+/g) || []).map((seed) => parseInt(seed, 10));

  return seedNumbers.reduce((acc, seed) => {
    const location = maps.reduce((start, map) => {
      return mapLookup(map, start);
    }, seed);

    return location < acc ? location : acc;
  }, Infinity);
}
