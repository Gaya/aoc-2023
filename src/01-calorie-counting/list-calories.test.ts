import listCalories from './list-calories';

const input = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`;

describe('listCalories', () => {
  it('should separate input and sum caloric contents of items', () => {
    expect(listCalories(input)).toBe([6000, 4000, 11000, 24000, 10000]);
  });
});
