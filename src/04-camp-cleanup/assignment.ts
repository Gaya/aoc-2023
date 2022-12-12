export function hasAssignmentCompleteOverlap(input: string): boolean {
  const [aa, ab, ba, bb] = (input.match(/(\d+)/g) || []).map((i) => parseInt(i, 10));
  return (aa <= ba && ab >= bb) || (ba <= aa && bb >= ab);
}

export function findCompleteOverlapping(input: string): string[] {
  return input.trim().split('\n')
    .filter(hasAssignmentCompleteOverlap);
}

export function hasAssignmentOverlap(input: string): boolean {
  const [aa, ab, ba, bb] = (input.match(/(\d+)/g) || []).map((i) => parseInt(i, 10));
  return (aa <= ba && ab >= ba) || (ba <= aa && bb >= aa);
}

export function findOverlapping(input: string): string[] {
  return input.trim().split('\n')
    .filter(hasAssignmentOverlap);
}
