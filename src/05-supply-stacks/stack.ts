export function parseStacks(input: string): string[] {
  const stacks = new Array((input.split('\n')[0].length + 1) / 4).fill('');
  const matches = [...input.matchAll(/\[([A-Z])]/gm)];

  return matches.reduce((acc, match) => {
    const letter = match[1];
    const index = ((match.index || 0) % (stacks.length * 4)) / 4;
    acc[index] = [acc[index], letter].join('');

    return acc;
  }, stacks);
}

export function parseInstructions(input: string): [number, number, number][] {
  const matches = [...input.trim().matchAll(/^move (\d+) from (\d+) to (\d+)$/gm)];
  return matches.map((m) => [parseInt(m[1], 10), parseInt(m[2], 10), parseInt(m[3], 10)]);
}

export function moveStacks(input: string): string {
  const stacks = parseStacks(input);
  const instructions = parseInstructions(input);

  const movedStacks = instructions.reduce((acc, [amount, from, to]) => {
    const f = from - 1;
    const t = to - 1;

    const stringToMove = acc[f]
      .substring(0, amount)
      .split('')
      .reverse()
      .join('');

    acc[f] = acc[f].substring(amount);
    acc[t] = [stringToMove, acc[t]].join('');

    return acc;
  }, stacks);

  return movedStacks.map((s) => s[0]).join('');
}
