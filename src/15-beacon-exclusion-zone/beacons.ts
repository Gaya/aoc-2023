const findCoordinates = /[x|y]=(-?\d+)/gm;

type Sensors = {
  x1: number;
  x2: number
  y1: number;
  y2: number;
  items: [number, number, number][];
};

export function parseSensorInput(input: string): Sensors {
  const sensors: Sensors = {
    x1: 0,
    x2: 0,
    y1: 0,
    y2: 0,
    items: [],
  };
  const parsed = [...input.matchAll(findCoordinates)].map((m) => parseInt(m[1], 10));

  for (let i = 0; i < parsed.length / 4; i++) {
    const start = i * 4;
    const x1 = parsed[start];
    const y1 = parsed[start + 1];
    const x2 = parsed[start + 2];
    const y2 = parsed[start + 3];

    const dx = Math.abs(x1 - x2);
    const dy = Math.abs(y1 - y2);

    const d = dx + dy;

    if (x1 - d < sensors.x1) {
      sensors.x1 = x1 - d;
    }

    if (x1 + d > sensors.x2) {
      sensors.x2 = x1 + d;
    }

    if (y1 - d < sensors.y1) {
      sensors.y1 = y1 - d;
    }

    if (y1 + d > sensors.y2) {
      sensors.y2 = y1 + d;
    }

    sensors.items.push([x1, y1, d]);
  }

  return sensors;
}

function widthOnY(y1: number, y2: number, d: number): number {
  const dx = Math.abs(y2 - y1);

  if (dx > d) {
    return -1;
  }

  return Math.abs(dx - d);
}

type Positions = [number, number][];

export function combineRanges(ranges: [number, number][]): [number, number][] {
  const sorted = [...ranges].sort((a, b) => a[0] - b[0]);

  return sorted.reduce((acc: [number, number][], range) => {
    const restAcc = [...acc];
    const lastRange = restAcc.pop();

    if (!lastRange) {
      return [range];
    }

    if (range[0] >= lastRange[0] && range[0] <= lastRange[1]) {
      return [
        ...restAcc,
        [lastRange[0], Math.max(lastRange[1], range[1])],
      ];
    }

    return [...acc, range];
  }, []);
}

export function countInRanges(ranges: [number, number][], r1 = 0, r2 = 20): number {
  let count = 0;
  for (let x = r1; x < r2 + 1; x++) {
    if (ranges.find(([x1, x2]) => x >= x1 && x <= x2)) {
      count++;
    }
  }

  return count;
}

export function scanRangesOnRow(
  sensors: Sensors,
  row: number,
  r1 = sensors.x1,
  r2 = sensors.x2,
): [number, number][] {
  return sensors.items.reduce((acc: Positions, [x, y, d]) => {
    const width = widthOnY(row, y, d);

    if (width > -1) {
      return [
        ...acc,
        [Math.max(r1, x - width), Math.min(r2, x + width)],
      ];
    }

    return acc;
  }, []);
}

export function scannedColsInRow(
  sensors: Sensors,
  row: number,
  r1 = sensors.x1,
  r2 = sensors.x2,
): number {
  const ranges = scanRangesOnRow(sensors, row, r1, r2);
  return countInRanges(ranges, r1, r2);
}

export function findDistressBeacon(sensors: Sensors, r1 = 0, r2 = 20): number {
  for (let y = r1; y < r2 + 1; y++) {
    const positions = scanRangesOnRow(sensors, y, r1, r2);
    const ranges = combineRanges(positions);

    if (ranges.length !== 1) {
      const x = ranges[0][1] + 1;
      return (x * 4000000) + y;
    }
  }

  return 0;
}
