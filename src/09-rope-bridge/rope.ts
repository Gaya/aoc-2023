const instructExp = /^([RULD]) (\d+)$/gm;

type Dir = 'R' | 'U' | 'L' | 'D';
type Pos = [number, number];

function moveRope(dir: Dir, [hx, hy]: Pos, [tx, ty]: Pos): [Pos, Pos] {
  let x = 0;
  let y = 0;

  switch (dir) {
    case 'U':
      y = 1;
      break;
    case 'D':
      y = -1;
      break;
    case 'L':
      x = -1;
      break;
    case 'R':
      x = 1;
      break;
  }

  const [nx, ny]: Pos = [hx + x, hy + y];

  let mx = 0;
  let my = 0;

  const xDist = Math.abs(nx - tx);
  const yDist = Math.abs(ny - ty);

  if (xDist > 1) {
    mx = x;

    if (ty !== hy) {
      my = hy - ty;
    }
  }

  if (yDist > 1) {
    my = y;

    if (tx !== hx) {
      mx = hx - tx;
    }
  }

  const newT: Pos = [tx + mx, ty + my];

  return [[nx, ny], newT];
}

export function ropeMoves(input: string): number {
  const instructions = [...input.matchAll(instructExp)].map((i) => [i[1], parseInt(i[2], 10)]);

  let H: Pos = [0, 0];
  let T: Pos = [0, 0];
  const tTouched = [T];

  for (const [d, amount] of instructions) {
    for (let  i = 0; i < amount; i++) {
      const [newH, newT] = moveRope(d as Dir, H, T);

      if (!tTouched.find((t) => t[0] === newT[0] && t[1] === newT[1])) {
        tTouched.push(newT);
      }

      H = newH;
      T = newT;
    }
  }

  return tTouched.length;
}
