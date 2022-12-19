import {
  combineRanges,
  countInRanges,
  findDistressBeacon,
  parseSensorInput,
  scannedColsInRow,
} from './beacons';

describe('parseSensorInput', () => {
  const input = `Sensor at x=2, y=18: closest beacon is at x=-2, y=15
Sensor at x=9, y=16: closest beacon is at x=10, y=16
Sensor at x=13, y=2: closest beacon is at x=15, y=3
Sensor at x=12, y=14: closest beacon is at x=10, y=16
Sensor at x=10, y=20: closest beacon is at x=10, y=16
Sensor at x=14, y=2: closest beacon is at x=10, y=16`;

  it('turns input into a list of coordinates and distances', () => {
    expect(parseSensorInput(input).items).toMatchObject([
      [2, 18, 7],
      [9, 16, 1],
      [13, 2, 3],
      [12, 14, 4],
      [10, 20, 4],
      [14, 2, 18],
    ]);
  });
});

describe('scannedColsInRow', () => {
  it('find all sensors and determines the amount of positions scanned on a row', () => {
    const input = `Sensor at x=2, y=18: closest beacon is at x=-2, y=15
Sensor at x=9, y=16: closest beacon is at x=10, y=16
Sensor at x=13, y=2: closest beacon is at x=15, y=3
Sensor at x=12, y=14: closest beacon is at x=10, y=16
Sensor at x=10, y=20: closest beacon is at x=10, y=16
Sensor at x=14, y=17: closest beacon is at x=10, y=16
Sensor at x=8, y=7: closest beacon is at x=2, y=10
Sensor at x=2, y=0: closest beacon is at x=2, y=10
Sensor at x=0, y=11: closest beacon is at x=2, y=10
Sensor at x=20, y=14: closest beacon is at x=25, y=17
Sensor at x=17, y=20: closest beacon is at x=21, y=22
Sensor at x=16, y=7: closest beacon is at x=15, y=3
Sensor at x=14, y=3: closest beacon is at x=15, y=3
Sensor at x=20, y=1: closest beacon is at x=15, y=3`;

    expect(scannedColsInRow(parseSensorInput(input), 10)).toBe(27);
  });
});

describe('findDistressBeacon', () => {
  it('finds the distress beacon location and return its tuning frequency', () => {
    const input = `Sensor at x=2, y=18: closest beacon is at x=-2, y=15
Sensor at x=9, y=16: closest beacon is at x=10, y=16
Sensor at x=13, y=2: closest beacon is at x=15, y=3
Sensor at x=12, y=14: closest beacon is at x=10, y=16
Sensor at x=10, y=20: closest beacon is at x=10, y=16
Sensor at x=14, y=17: closest beacon is at x=10, y=16
Sensor at x=8, y=7: closest beacon is at x=2, y=10
Sensor at x=2, y=0: closest beacon is at x=2, y=10
Sensor at x=0, y=11: closest beacon is at x=2, y=10
Sensor at x=20, y=14: closest beacon is at x=25, y=17
Sensor at x=17, y=20: closest beacon is at x=21, y=22
Sensor at x=16, y=7: closest beacon is at x=15, y=3
Sensor at x=14, y=3: closest beacon is at x=15, y=3
Sensor at x=20, y=1: closest beacon is at x=15, y=3`;

    expect(findDistressBeacon(parseSensorInput(input))).toBe(56000011);
  });
});

describe('combineRanges', () => {
  it('sorts and combines range into merged chunks', () => {
    expect(combineRanges([[1, 4], [8, 12], [3, 6]])).toStrictEqual([[1, 6], [8, 12]]);
    expect(combineRanges([[1, 4], [8, 12], [2, 3]])).toStrictEqual([[1, 4], [8, 12]]);
  });
});
