import { findMaxPossibleFlow, parseValves } from './valves';

describe('parseValves', () => {
  const input = `Valve AA has flow rate=0; tunnels lead to valves DD, II, BB
Valve BB has flow rate=13; tunnels lead to valves CC, AA
Valve CC has flow rate=2; tunnels lead to valves BB, DD
Valve DD has flow rate=20; tunnels lead to valves CC, AA
Valve II has flow rate=0; tunnels lead to valves AA, JJ
Valve JJ has flow rate=21; tunnels lead to valves II`;

  it('turns valve input into data structure', () => {
    const result = parseValves(input);

    expect(result).toMatchObject({
      AA: {
        key: 'AA',
        flow: 0,
        tunnels: ['DD', 'II', 'BB'],
        distances: { "JJ": 2, "II": 1, "DD": 1, "CC": 2, "BB": 1 },
      },
      BB: {
        key: 'BB',
        flow: 13,
        tunnels: ['CC', 'AA'],
        distances: { "JJ": 3, "II": 2, "DD": 2, "CC": 1, "AA": 1 },
      },
      CC: {
        key: 'CC',
        flow: 2,
        tunnels: ['BB', 'DD'],
        distances: { "JJ": 4, "II": 3, "DD": 1, "BB": 1, "AA": 2 },
      },
      DD: {
        key: 'DD',
        flow: 20,
        tunnels: ['CC', 'AA'],
        distances: { "JJ": 3, "II": 2, "CC": 1, "BB": 2, "AA": 1 },
      },
      II: {
        key: 'II',
        flow: 0,
        tunnels: ['AA', 'JJ'],
        distances: { "JJ": 1, "DD": 2, "CC": 3, "BB": 2, "AA": 1 },
      },
      JJ: {
        key: 'JJ',
        flow: 21,
        tunnels: ['II'],
        distances: { "II": 1, "DD": 3, "CC": 4, "BB": 3, "AA": 2 },
      },
    });
  });
});

describe('findMaxPossibleFlow', () => {
  const input = `Valve AA has flow rate=0; tunnels lead to valves DD, II, BB
Valve BB has flow rate=13; tunnels lead to valves CC, AA
Valve CC has flow rate=2; tunnels lead to valves DD, BB
Valve DD has flow rate=20; tunnels lead to valves CC, AA, EE
Valve EE has flow rate=3; tunnels lead to valves FF, DD
Valve FF has flow rate=0; tunnels lead to valves EE, GG
Valve GG has flow rate=0; tunnels lead to valves FF, HH
Valve HH has flow rate=22; tunnel leads to valve GG
Valve II has flow rate=0; tunnels lead to valves AA, JJ
Valve JJ has flow rate=21; tunnel leads to valve II`;

  it('should find max output flow for 30 minutes', () => {
    const valves = parseValves(input);
    expect(findMaxPossibleFlow(valves, valves['AA'], 30)).toBe(1651);
  });

  it.only('should find max output flow while explaining it to the elephant', () => {
    const valves = parseValves(input);
    expect(findMaxPossibleFlow(valves, valves['AA'], 26, 26)).toBe(1707);
  });
});
