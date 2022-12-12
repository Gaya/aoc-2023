export function parseInput(input: string): number[][] {
  const parsed = [...input.trim().matchAll(/^\d+$|^$/gm)];

  return parsed.reduce((acc: number[][], item, currentIndex) => {
    const [value] = item;

    if (value === '' && currentIndex !== parsed.length - 1) {
      acc.push([]);
      return acc;
    }

    acc[acc.length - 1].push(parseInt(value, 10));

    return acc;
  }, [[]]);
}

export default function listCalories(input: string): number[] {
  const parsed = parseInput(input);
  return parsed.map((items) => items.reduce((a, b) => a + b));
}
