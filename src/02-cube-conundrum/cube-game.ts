function highestColor(results: RegExpMatchArray[]): number {
  return results.reduce((acc, result) => {
    const count = parseInt(result[1], 10);

    return count > acc ? count : acc;
  }, 0);
}

export function highestColorInGame(input: string): { r: number; g: number; b: number } {
  const redReg = /(\d+) red/g
  const greenReg = /(\d+) green/g
  const blueReg = /(\d+) blue/g

  return {
    r: highestColor([...input.matchAll(redReg)]),
    g: highestColor([...input.matchAll(greenReg)]),
    b: highestColor([...input.matchAll(blueReg)]),
  };
}

export function possibleGames(games: string, cubes: { r: number; g: number; b: number }): number {
  return games.split('\n')
    .reduce((acc, game) => {
      const results = highestColorInGame(game);

      if (results.r <= cubes.r && results.g <= cubes.g && results.b <= cubes.b) {
        const gameIdMatcher = /Game (\d+)/g;
        const id = parseInt([...game.matchAll(gameIdMatcher)][0][1], 10);
        return acc + id;
      }

      return acc;
    }, 0);
}

export function gamePower(input: string): number {
  const colors = highestColorInGame(input);
  return colors.r * colors.g * colors.b;
}

export function gamesPowered(games: string): number {
  return games.split('\n')
    .reduce((acc, game) => {
      return acc + gamePower(game);
    }, 0);
}
