import { findMarkerIndex } from './marker';

describe('findMarkerIndex', () => {
  it('should find the first possible marker positions', () => {
    expect(findMarkerIndex('bvwbjplbgvbhsrlpgdmjqwftvncz')).toBe(5);
    expect(findMarkerIndex('bvwbj')).toBe(5);
    expect(findMarkerIndex('nppdvjthqldpwncqszvftbrmjlhg')).toBe(6);
    expect(findMarkerIndex('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg')).toBe(10);
    expect(findMarkerIndex('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw')).toBe(11);
  });

  it('should except longer unique strings', () => {
    expect(findMarkerIndex('mjqjpqmgbljsphdztnvjfqwrcgsmlb', 14)).toBe(19);
    expect(findMarkerIndex('bvwbjplbgvbhsrlpgdmjqwftvncz', 14)).toBe(23);
    expect(findMarkerIndex('nppdvjthqldpwncqszvftbrmjlhg', 14)).toBe(23);
    expect(findMarkerIndex('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg', 14)).toBe(29);
    expect(findMarkerIndex('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw', 14)).toBe(26);
  });
});
