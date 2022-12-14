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

export function findStartingNode(grid: number[][], target = 0): string {
  return grid.reduce((result, cols, r) => {
    if (result !== '') {
      return result;
    }

    const c = cols.findIndex((v) => v === target);

    if (c === -1) {
      return result;
    }

    return `${r}_${c}`;
  }, '');
}

function getNeighbours(
  nodes: NodeSet,
  node: Node,
  visited: Record<string, boolean>,
): string[] {
  const { r, c } = node;

  const neighbours = [];
  neighbours.push(`${r - 1}_${c}`);
  neighbours.push(`${r}_${c - 1}`);
  neighbours.push(`${r + 1}_${c}`);
  neighbours.push(`${r}_${c + 1}`);

  return neighbours
    .filter((n) => nodes[n]
      && !visited[n]
      && nodes[n].h - 1 <= node.h);
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

export function findPath(
  grid: number[][],
  startingNode = findStartingNode(grid),
): Node[] {
  let working = true;
  const visited: Record<string, boolean> = {};

  // create unvisited set
  const nodes: NodeSet = grid.reduce((acc: NodeSet, cols, r) => {
    return cols.reduce((acc2: NodeSet, h, c) => ({
      ...acc2,
      [`${r}_${c}`]: {
        k: `${r}_${c}`,
        r,
        c,
        f: [],
        h: Math.max(1, Math.min(26, h)),
        d: Infinity,
        e: h === 27,
      },
    }), acc);
  }, {});
  let unvisited: string[] = Object.keys(nodes);

  // set distance to zero for starting node
  nodes[startingNode].d = 0;
  let currentNode = nodes[startingNode];

  while (working) {
    const neighbours = getNeighbours(nodes, currentNode, visited);

    // work on neighbours
    for (const neighbour of neighbours) {
      const n = nodes[neighbour];
      const newDist = 1 + currentNode.d;
      if (n.d > newDist) {
        n.d = newDist;
        n.f = [currentNode.k];
      }
    }

    // move currentNode to visited
    unvisited = unvisited.filter((v) => v !== currentNode.k);
    visited[currentNode.k] = true;

    // stop if destination or everything in unvisited is Infinity
    if (
      currentNode.e || unvisited.every((n) => nodes[n].d === Infinity)
    ) {
      working = false;
      continue;
    }

    // select new node to check
    unvisited.sort((a, b) => nodes[a].d - nodes[b].d);
    currentNode = nodes[unvisited[0]];

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
    currentNode = nodes[next];

    if (!next) {
      working = false;
    }
  }

  return path;
}
