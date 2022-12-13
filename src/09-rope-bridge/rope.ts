const instructExp = /^([RULD]) (\d+)$/gm;

type Dir = 'R' | 'U' | 'L' | 'D';
type Pos = [number, number];

function determineChange([hx, hy]: Pos, [tx, ty]: Pos, [dx, dy]: Pos): Pos {
  let mx = 0;
  let my = 0;

  const [nx, ny]: Pos = [hx + dx, hy + dy];

  const xDist = Math.abs(nx - tx);
  const yDist = Math.abs(ny - ty);

  if (xDist > 1) {
    mx = dx;

    if (ty !== hy) {
      my = hy - ty;
    }
  }

  if (yDist > 1) {
    my = dy;

    if (tx !== hx) {
      mx = hx - tx;
    }
  }

  return [mx, my];
}

function moveRope(dir: Dir, rope: Pos[]): Pos[] {
  const [head, ...restRope] = rope;

  let dx = 0;
  let dy = 0;

  switch (dir) {
    case 'U':
      dy = 1;
      break;
    case 'D':
      dy = -1;
      break;
    case 'L':
      dx = -1;
      break;
    case 'R':
      dx = 1;
      break;
  }

  const headMove: Pos = [dx, dy];
  const [hx, hy] = head;
  const [nx, ny]: Pos = [hx + dx, hy + dy];

  const changes = restRope.reduce((acc: Pos[], toMove, index) => {
    const d = index === 0 ? headMove : acc[index - 1];
    const h = index === 0 ? head : restRope[index - 1];

    return [
      ...acc,
      determineChange(h, toMove, d),
    ];
  }, []);

  return [
    [nx, ny],
    ...changes.map(([cx, cy], index): Pos => {
      const [x, y] = restRope[index];
      return [x + cx, y + cy];
    }),
  ];
}

export function ropeMoves(input: string, ropeLength = 1): number {
  const instructions = [...input.matchAll(instructExp)].map((i) => [i[1], parseInt(i[2], 10)]);

  let rope: Pos[] = new Array(ropeLength + 1).fill([0, 0]);
  const touched: { [coord: string]: boolean } = {};

  for (const [d, amount] of instructions) {
    for (let  i = 0; i < amount; i++) {
      rope = moveRope(d as Dir, rope);
      touched[`${rope[rope.length - 1][0]},${rope[rope.length - 1][1]}`] = true;
    }
  }

  return Object.keys(touched).length;
}
