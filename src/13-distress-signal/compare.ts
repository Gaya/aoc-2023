const matchCompares = /^(\[.*])\n(\[.*])$/gm;
const matchPacket = /^(\[.*])$/gm;

type Packet = Array<number | Packet>;

export function parseCombinedPackets(input: string): Packet[][] {
  const results = input.match(matchCompares);

  if (!results) {
    return [];
  }

  return results.map((r) => r.split('\n').map((a) => JSON.parse(a)));
}

export function parsePackets(input: string): Packet[] {
  const results = input.match(matchPacket);

  if (!results) {
    return [];
  }

  return results.map((a) => JSON.parse(a));
}

function isNumber(i: unknown): i is number {
  return typeof i === 'number';
}

function isArray(i: unknown): i is Packet {
  return Array.isArray(i);
}

export function isRightOrder(a: Packet, b: Packet, start = true): boolean | null {
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
    } else {
      let compare = isRightOrder(
        isArray(aItem) ? aItem : [aItem],
        isArray(bItem) ? bItem : [bItem],
        false,
      );

      // made a choice? Share it... or skip to next
      if (compare !== null) {
        return compare;
      }
    }
  }

  if (!hasChecked && a.length === b.length) {
    return start ? true : null;
  }

  return true;
}

export function sumRightOrders(list: Packet[][]): number {
  return list.reduce((acc, [a, b], index) => isRightOrder(a, b) ? acc + index + 1 : acc, 0);
}

export function orderPackets(list: Packet[], extra = [[[2]], [[6]]]): Packet[] {
  const outcome = [...list, ...extra];
  outcome.sort((a, b) => isRightOrder(a, b) ? -1 : 1);
  return outcome;
}

export function findDecoderKey(list: Packet[]): number {
  const orderedPackets = orderPackets(list);
  const first = orderedPackets.findIndex((p) => JSON.stringify(p) === '[[2]]') + 1;
  const second = orderedPackets.findIndex((p) => JSON.stringify(p) === '[[6]]') + 1;
  return first * second;
}
