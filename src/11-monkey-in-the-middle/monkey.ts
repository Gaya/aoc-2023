const monkeyParser = /^Monkey (?<monkey>\d+):\n[\sa-zA-Z:]+(?<items>[\d+,\s]+)\n[\sa-zA-Z:]+=\s(?<operation>.+)\n[\sa-zA-Z:]+(?<divisible>\d+)\n[\sa-zA-Z:]+(?<true>\d+)\n[\sa-zA-Z:]+(?<false>\d+)/gm;
const operationParser = /^(old|\d+) ([+*]) (old|\d+)$/

type Monkeys = Record<number, Monkey>;

interface Monkey {
  id: number;
  inspections: number;
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
      inspections: 0,
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

export function performOperation(operation: string, input: number): number {
  const [_, f, o, s] = operation.match(operationParser) || [];

  if (!_) {
    return input;
  }

  const first = f === 'old' ? input : parseInt(f, 10);
  const second = s === 'old' ? input : parseInt(s, 10);

  if (o === '+') {
    return first + second;
  }

  if (o === '*') {
    return first * second;
  }

  return input;
}

export function doMonkeyRound(monkeys: Monkeys): Monkeys {
  const shallowMonkeys = { ...monkeys };

  for (const monkey of Object.values(shallowMonkeys)) {
    do {
      const item = monkey.items.shift();

      if (!item) continue;

      const worryLevel = Math.floor(performOperation(monkey.operation, item) / 3);
      const worryCheckedOut = worryLevel / monkey.divisible === 1;

      shallowMonkeys[worryCheckedOut ? monkey.ifTrue : monkey.ifFalse].items.push(worryLevel);

      monkey.inspections += 1;
    } while (monkey.items.length > 0);
  }

  return shallowMonkeys;
}
