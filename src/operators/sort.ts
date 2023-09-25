import { It, rArray } from '../utils'
import { toPipe } from '../pipe'

export function sort<IterValue>(
  iter: It<IterValue>,
  comparator: (a: IterValue, b: IterValue) => -1 | 0 | 1,
): rArray<IterValue> {
  return [...iter].sort(comparator)
}

sort.p = toPipe(sort)
