import { gamePower, gamesPowered, highestColorInGame, possibleGames } from './cube-game';

describe('highestColorInGame', () => {
  it('should correctly count the amount of colours picked', () => {
    expect(highestColorInGame('Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green')).toEqual({
      r: 4,
      b: 6,
      g: 2,
    })
  });
});

describe('possibleGames', () => {
  it('should check each game and combine IDs', () => {
    expect(possibleGames(`Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 55: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`, { r: 12, g: 13, b: 14 })).toEqual(58);
  });
});

describe('gamePower', () => {
  it('should calculate the power of minimum blocks of a game', () => {
    expect(gamePower('Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green')).toEqual(48);
    expect(gamePower('Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue')).toEqual(12);
    expect(gamePower('Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red')).toEqual(1560);
  });
});

describe('gamesPowered', () => {
  it('should add all powers of games', () => {
    expect(gamesPowered(`Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`)).toEqual(2286);
  });
});
