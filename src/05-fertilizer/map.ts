export function mapLookup(ranges: string[], source: number): number {
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

function locationByStartAndMap(seed: number, maps: string[][]) {
  return maps.reduce((start, map) => {
    return mapLookup(map, start);
  }, seed);
}

export function followMaps(input: string): number {
  const results = input.match(/((\d+)\s?)+/gm);

  if (!results) {
    return 0;
  }

  const [seeds, ...rawMaps] = results;
  const maps = rawMaps.map((map) => {
    const ranges = map.match(/\d+/g);

    if (!ranges) {
      return [];
    }

    return ranges;
  });

  const seedNumbers = (seeds.match(/\d+/g) || []).map((seed) => parseInt(seed, 10));

  return seedNumbers.reduce((acc, seed) => {
    const location = locationByStartAndMap(seed, maps);
    return location < acc ? location : acc;
  }, Infinity);
}

export function followMapsExtended(input: string): number {
  const results = input.match(/((\d+)\s?)+/gm);

  if (!results) {
    return 0;
  }

  const [seeds, ...rawMaps] = results;
  const maps = rawMaps.map((map) => {
    const ranges = map.match(/\d+/g);

    if (!ranges) {
      return [];
    }

    return ranges;
  });

  const seedCombinations = (seeds.match(/\d+/g) || []).map((seed) => parseInt(seed, 10));
  let location = Infinity;

  for (let i = 0; i < seedCombinations.length / 2; i++) {
    const offset = i * 2;
    const start = seedCombinations[offset];
    const range = seedCombinations[offset + 1];

    for (let j = 0; j < range; j++) {
      const seed = start + j;
      const seedLocation = locationByStartAndMap(seed, maps);

      if (seedLocation < location) {
        location = seedLocation;
      }
    }
  }

  return location;
}
