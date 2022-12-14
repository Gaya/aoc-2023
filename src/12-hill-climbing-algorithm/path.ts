export function parseInput(input: string): number[][] {
  const rows = input.match(/^\w+$/gm);

  return rows
    ? rows.map((r) => r
      .split('')
      .map((l) => {
        if (l === 'S') {
          return 0;
        }

        if (l === 'E') {
          // special char
          return 27;
        }

        return l.charCodeAt(0) - 96;
      }))
    : [];
}

function findStartingNode(grid: number[][]): string {
  return grid.reduce((result, cols, r) => {
    if (result !== '') {
      return result;
    }

    const c = cols.findIndex((v) => v === 0);

    if (c === -1) {
      return result;
    }

    return `${r}_${c}`;
  }, '');
}

function getNeighbours(grid: number[][], unvisited: NodeSet, node: Node): string[] {
  const { r, c } = node;
  const rows = grid.length;
  const cols = grid[0].length;

  const neighbours = [];

  // up
  if (r > 0) {
    neighbours.push(`${r - 1}_${c}`);
  }

  // left
  if (c > 0) {
    neighbours.push(`${r}_${c - 1}`);
  }

  // down
  if (r + 1 <= rows) {
    neighbours.push(`${r + 1}_${c}`);
  }

  // right
  if (c + 1 <= cols) {
    neighbours.push(`${r}_${c + 1}`);
  }

  return neighbours
    .filter((n) => unvisited[n] && unvisited[n].h - 1 <= node.h);
}

interface Node {
  k: string;
  r: number;
  c: number;
  h: number;
  d: number;
  f: string[];
  e: boolean;
}

type NodeSet = Record<string, Node>;

export function findPath(grid: number[][]): Node[] {
  let working = true;

  // create unvisited set
  const unvisited: NodeSet = grid.reduce((acc: NodeSet, cols, r) => {
    return cols.reduce((acc2: NodeSet, h, c) => ({
      ...acc2,
      [`${r}_${c}`]: {
        k: `${r}_${c}`,
        r,
        c,
        f: [],
        h: h === 27 ? 26 : h,
        d: Infinity,
        e: h === 27,
      },
    }), acc);
  }, {});

  const visited: NodeSet = {};

  const startingNode = findStartingNode(grid);

  // set distance to zero for starting node
  unvisited[startingNode].d = 0;

  let currentNode = unvisited[startingNode];

  while (working) {
    const neighbours = getNeighbours(grid, unvisited, currentNode);

    // work on neighbours
    for (const neighbour of neighbours) {
      const n = unvisited[neighbour];
      const newDist = 1 + currentNode.d;
      if (n.d > newDist) {
        n.d = newDist;
        n.f = [currentNode.k];
      }
    }

    // move currentNode to visited
    visited[currentNode.k] = currentNode;
    delete unvisited[currentNode.k];

    const leftToVisit = Object.values(unvisited);

    // stop if destination or everything in unvisited is Infinity
    if (currentNode.e || Object.values(unvisited).every((n) => n.d === Infinity)) {
      working = false;
    }

    // select new node to check
    leftToVisit.sort((a, b) => a.d - b.d);
    currentNode = leftToVisit[0];

    // is new node the destination? We can stop now.
    if (currentNode.e) {
      working = false;
    }
  }

  // reverse engineer path through visited
  let path: Node[] = [];

  working = true;

  while (working) {
    const next = currentNode.f[0];
    path.unshift(currentNode);
    currentNode = visited[next];

    if (!next) {
      working = false;
    }
  }

  return path;
}
