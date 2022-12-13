const instructExp = /^([RULD]) (\d+)$/gm;

type Dir = 'R' | 'U' | 'L' | 'D';
type Pos = [number, number];

function determineChange([hx, hy]: Pos, [tx, ty]: Pos): Pos {
  let dx = 0;
  let dy = 0;

  const xDist = Math.abs(hx - tx);
  const yDist = Math.abs(hy - ty);

  if (xDist > 1) {
    dx = tx < hx ? 1 : -1;

    if (ty !== hy) {
      dy = hy - ty;
    }
  }

  if (yDist > 1) {
    dy = ty < hy ? 1 : -1;

    if (tx !== hx) {
      dx = hx - tx;
    }
  }

  return [dx, dy];
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

  const [hx, hy] = head;
  const [nx, ny]: Pos = [hx + dx, hy + dy];
  const [tx, ty]: Pos = restRope[0];
  const [ddx, ddy]: Pos = determineChange([nx, ny], [tx, ty]);

  return [
    [nx, ny],
    [tx + ddx, ty + ddy],
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
