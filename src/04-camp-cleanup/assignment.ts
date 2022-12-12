export function hasAssignmentOverlap(input: string): boolean {
  const [aa, ab, ba, bb] = (input.match(/(\d+)/g) || []).map((i) => parseInt(i, 10));
  return (aa <= ba && ab >= bb) || (ba <= aa && bb >= ab);
}

export function findOverlapping(input: string): string[] {
  return input.trim().split('\n')
    .filter(hasAssignmentOverlap);
}
