const matchValve = /(?<valve>[A-Z]{2}).+=(?<rate>\d+).+valves? (?<tunnels>(?:[A-Z]{2},? ?)+)/gm;

interface Valve {
  key: string;
  flow: number;
  tunnels: string[];
  distances: Record<string, number>;
  opened?: boolean;
}

type Valves = Record<string, Valve>;

type Path = Record<string, { d: number; f: string }>;

function findPath(valves: Valves, from: string, to: string): Path {
  if (valves[from].tunnels.includes(to)) {
    return {
      [from]: {
        d: 1,
        f: to,
      }
    };
  }

  const valveKeys = Object.keys(valves);
  let unvisited = Object.values(valves);
  const results: Path = valveKeys
    .reduce((acc: Path, k) => ({
      ...acc,
      [k]: { d: Infinity, f: '' },
    }), {});
  let current = to;
  results[current] = { d: 0, f: current };

  let searching = true;

  while (searching) {
    for (const valve of valves[current].tunnels) {
      const dist = results[current].d + 1;

      if (results[valve].d > dist) {
        results[valve] = { d: dist, f: current };
      }
    }

    unvisited = unvisited.filter((v) => v.key !== current);

    if (current === from || unvisited.every((v) => results[v.key].d === Infinity)) {
      searching = false;
      return results;
    }

    unvisited.sort((a, b) => results[a.key].d - results[b.key].d);
    current = unvisited[0].key;

    if (current === from) {
      searching = false;
      return results;
    }
  }

  throw new Error('No path found.');
}

export function parseValves(input: string): Valves {
  const matched = [...input.matchAll(matchValve)];

  const valves = matched.reduce((acc: Valves, match) => {
    if (!match.groups) {
      return acc;
    }

    return {
      [match.groups.valve]: {
        key: match.groups.valve,
        flow: parseInt(match.groups.rate, 10),
        tunnels: match.groups.tunnels.split(', '),
        distances: {},
      },
      ...acc,
    };
  }, {});

  const valveKeys = Object.keys(valves);
  return valveKeys.reduce((acc, key) => {
    const otherValves = valveKeys.filter((k) => k !== key);
    const valve = valves[key];

    return {
      ...acc,
      [valve.key]: {
        ...valve,
        distances: otherValves.reduce((acc: Record<string, number>, key) => {
          return {
            ...acc,
            [key]: findPath(valves, valve.key, key)[valve.key].d,
          };
        }, {}),
      },
    };
  }, valves);
}

interface ValvesState {
  valves: Valves;
  current: Valve;
  released: number;
  opened: string[];
  minutesLeft: number;
}

export function parseAndCreateState(input: string): ValvesState {
  const valves = parseValves(input);

  return {
    valves,
    current: valves['AA'],
    released: 0,
    opened: [],
    minutesLeft: 30,
  };
}

export function findMaxPossibleFlow(valves: Valves, start: Valve, minutes: number): number {
  let unopenedValves = Object.values(valves);
  const flows: Record<string, number[]> = unopenedValves
    .reduce((acc, valve) => {
      let outputs: number[] = [];

      for (let i = minutes; i >= 0; i--) {
        outputs[i] = valve.flow * i;
      }

      return {
        ...acc,
        [valve.key]: outputs,
      };
    }, {});

  const openedValves: string[] = [];
  let currentMinutes = minutes;
  let currentValve = start;
  const scores: Record<string, number> = unopenedValves.reduce((acc, v) => {
    if (v.flow === 0) {
      return acc;
    }

    return {
      ...acc,
      [v.key]: -Infinity,
    };
  }, {});
  scores[start.key] = 0;

  let working = true;

  while (working) {
    const others = Object.entries(currentValve.distances)
      .filter(([k]) => !openedValves.includes(k) && Object.keys(scores).includes(k));

    for (const [k, d] of others) {
      const f = flows[k][currentMinutes - d - 1] + scores[currentValve.key];
      if (f > scores[k]) {
        scores[k] = f;
      }
    }

    openedValves.push(currentValve.key);
    const unopened = Object.entries(scores)
      .filter(([k]) => !openedValves.includes(k));

    if (
      currentMinutes === 0
      || unopened.every(([k, s]) => s === -Infinity)
      || unopened.length === 0
    ) {
      working = false;
      return Math.max(...Object.values(scores));
    }

    unopened.sort(([_, a], [__, b]) => b - a);
    const next = unopened[0][0];
    const dist = currentValve.distances[next];
    currentValve = valves[unopened[0][0]];
    currentMinutes = currentMinutes - dist - 1;
  }

  return 0;
}
