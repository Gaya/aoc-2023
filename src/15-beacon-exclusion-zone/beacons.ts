const findCoordinates = /[x|y]=(-?\d+)/gm;

type Sensors = {
  x1: number;
  x2: number
  y1: number;
  y2: number;
  itemsY: Record<number, Record<number, number>>;
  itemsX: Record<number, Record<number, number>>;
};

export function parseSensorInput(input: string): Sensors {
  const sensors: Sensors = {
    x1: 0,
    x2: 0,
    y1: 0,
    y2: 0,
    itemsY: {},
    itemsX: {},
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

    if (!sensors.itemsX[x1]) {
      sensors.itemsX[x1] = {};
    }

    if (!sensors.itemsY[y1]) {
      sensors.itemsY[y1] = {};
    }

    const dist = dx + dy;

    if (x1 - dist < sensors.x1) {
      sensors.x1 = x1 - dist;
    }

    if (x1 + dist > sensors.x2) {
      sensors.x2 = x1 + dist;
    }

    if (y1 - dist < sensors.y1) {
      sensors.y1 = y1 - dist;
    }

    if (y1 + dist > sensors.y2) {
      sensors.y2 = y1 + dist;
    }

    sensors.itemsX[x1][y1] = dist;
    sensors.itemsY[y1][x1] = dist;
  }

  return sensors;
}

export function scannedColsInRow(sensors: Sensors, row: number): number {
  const positions: Record<number, boolean> = {};

  for (let x = sensors.x1; x < sensors.x2; x++) {
    if (sensors.itemsX[x]) {
      Object
        .entries(sensors.itemsX[x])
        .forEach(([sy, d]) => {
          const y = parseInt(sy, 10);

          const dy = Math.abs(y - row);

          if (dy <= d) {
            // falls in range now determine positions scanned on row
            const fill = Math.abs(dy - d);

            for (let fx = x - fill; fx < x + fill; fx++) {
              positions[fx] = true;
            }
          }
        });
    }
  }

  return Object.keys(positions).length;
}
