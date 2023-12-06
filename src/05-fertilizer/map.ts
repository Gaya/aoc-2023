export function mapLookup(
  ranges: string[],
  source: number,
): number {
  const rows = ranges.length / 3;

  for (let i = 0; i < rows; i++) {
    const offset = 3 * i;
    const sourceStart = parseInt(ranges[offset + 1], 10);

    if (source >= sourceStart) {
      const range = parseInt(ranges[offset + 2], 10);
      if (source <= sourceStart + range) {
        const diff = source - sourceStart;
        const destStart = ranges[offset];
        return parseInt(destStart, 10) + diff;
      }
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

function getSeedLocation(start: number, maps: number[][]): number {
  let location = start;
  for (const map of maps.slice().reverse()) {
    const rows = map.length / 3;

    for (let i = 0; i < rows; i++) {
      const offset = 3 * i;
      const source = map[offset + 1];
      const destination = map[offset];
      const range = map[offset + 2];

      if (destination <= location && destination + range > location) {
        location = source + location - destination; // set new location with offset of next map (source - dest)
        break;
      }
    }
  }

  return location;
}

export function followMapsExtended(input: string, maxLocation = Infinity): number {
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

    return ranges.map((n) => parseInt(n, 10));
  });

  const seedCombinations = (seeds.match(/\d+/g) || []).map((seed) => parseInt(seed, 10));

  for (let i = 0; i < maxLocation; i++) {
   const seedLocation = getSeedLocation(i, maps);

    for (let j = 0; j < seedCombinations.length / 2; j++) {
      const offset = j * 2;
      const start = seedCombinations[offset];
      const range = seedCombinations[offset + 1];

      if (seedLocation >= start && seedLocation <= start + range - 1) {
        return i;
      }
    }
  }

  return Infinity;
}
