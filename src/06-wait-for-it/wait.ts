export function possibleWins(time: number, distance: number): number {
  let wins = 0;
  for (let i = 0; i < time; i++) {
    if (i * (time - i) > distance) {
      wins++;
    }
  }

  return wins;
}

export function calcBeating(input: string): number {
  const numbers = input.match(/\d+/gm);

  if (!numbers) {
    return 0;
  }

  const wins: number[] = [];
  const half = numbers.length / 2;

  for (let i = 0; i < half; i++) {
    const time = parseInt(numbers[i], 10);
    const distance = parseInt(numbers[i + half], 10);

    wins.push(possibleWins(time, distance));
  }

  return wins.reduce((a, b) => a * b);
}

export function calcBeatingTwo(input: string): number {
  const numbers = input.match(/\d+/gm);

  if (!numbers) {
    return 0;
  }

  const times: string[] = [];
  const distances: string[] = [];
  const half = numbers.length / 2;

  for (let i = 0; i < half; i++) {
    const time = numbers[i];
    const distance = numbers[i + half];

    times.push(time);
    distances.push(distance);
  }

  return possibleWins(
    parseInt(times.reduce((a, b) => a + b), 10),
    parseInt(distances.reduce((a, b) => a + b), 10),
  );
}
