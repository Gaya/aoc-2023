import { followMaps, followMapsExtended, mapLookup } from './map';

describe('mapLookup', () => {
  it('looks of the destinations by map', () => {
    const map = `50 98 2
52 50 48`;

    const ranges = map.match(/\d+/g);

    if (!ranges) {
      throw new Error('Test error');
    }

    expect(mapLookup(ranges, 79)).toEqual(81);
    expect(mapLookup(ranges, 14)).toEqual(14);
    expect(mapLookup(ranges, 55)).toEqual(57);
    expect(mapLookup(ranges, 13)).toEqual(13);
  });
});

describe('followMaps', () => {
  it('should look up the path to the best location', () => {
    const input = `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`;

    expect(followMaps(input)).toEqual(35);
  });
});

describe('followMapsExtended', () => {
  it('should look up the correct location in a ranged way', () => {
    const input = `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`;

    expect(followMapsExtended(input)).toEqual(46);
  });
});
