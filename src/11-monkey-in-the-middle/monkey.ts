const monkeyParser = /^Monkey (?<monkey>\d+):\n[\sa-zA-Z:]+(?<items>[\d+,\s]+)\n[\sa-zA-Z:]+=\s(?<operation>.+)\n[\sa-zA-Z:]+(?<divisible>\d+)\n[\sa-zA-Z:]+(?<true>\d+)\n[\sa-zA-Z:]+(?<false>\d+)/gm;

type Monkeys = Record<number, Monkey>;

interface Monkey {
  id: number;
  items: number[];
  operation: string;
  divisible: number;
  ifTrue: number;
  ifFalse: number;
}

export function parseMonkeyInput(input: string): Monkeys {
  const parsed = [...input.matchAll(monkeyParser)];
  return parsed.reduce((acc: Monkeys, match) => {
    if (!match.groups) {
      return acc;
    }

    const monkey: Monkey = {
      id: parseInt(match.groups.monkey, 10),
      items: match.groups.items.split(', ').map((i) => parseInt(i, 10)),
      operation: match.groups.operation,
      divisible: parseInt(match.groups.divisible, 10),
      ifTrue: parseInt(match.groups.true, 10),
      ifFalse: parseInt(match.groups.false, 10),
    };

    return {
      ...acc,
      [monkey.id]: monkey,
    }
  }, {});
}
