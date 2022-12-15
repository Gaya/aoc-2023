const matchCompares = /^(\[.*])\n(\[.*])$/gm;

type Compare = Array<number | Compare>;

export function parsePackets(input: string): Compare[][] {
  const results = input.match(matchCompares);

  if (!results) {
    return [];
  }

  return results.map((r) => r.split('\n').map((a) => JSON.parse(a)));
}

function isNumber(i: unknown): i is number {
  return typeof i === 'number';
}

function isArray(i: unknown): i is Compare {
  return Array.isArray(i);
}

export function isRightOrder(a: Compare, b: Compare, start = true): boolean | null {
  let hasChecked = false;

  for (let i = 0; i < a.length; i++) {
    const aItem = a[i];
    const bItem = b[i];

    // if right list has run out while b was still going
    if (typeof bItem === 'undefined') {
      return false;
    }

    if (isNumber(aItem) && isNumber(bItem)) {
      if (aItem !== bItem) {
        hasChecked = true;
      }

      // right is smaller than left
      if (aItem > bItem) {
        return false;
      } else if (bItem > aItem) {
        return true;
      }
    } else if (isArray(aItem) && isArray(bItem)) {
      // both arrays
      const arrCompare = isRightOrder(aItem, bItem, false);
      if (arrCompare !== null) {
        return arrCompare;
      }
    } else {
      // if there is one single digit
      return isRightOrder(isArray(aItem) ? aItem : [aItem], isArray(bItem) ? bItem : [bItem], false);
    }
  }

  if (!hasChecked && a.length === b.length) {
    return start ? true : null;
  }

  return true;
}

export function sumRightOrders(list: Compare[][]): number {
  return list.reduce((acc, [a, b], index) => isRightOrder(a, b) ? acc + index + 1 : acc, 0);
}
