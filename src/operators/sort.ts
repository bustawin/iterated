import { It, rArray, Val } from '../utils'
import { toPipe } from '../pipe'

export function sort<IterValue>(
  iter: It<IterValue>,
  comparator: (a: Val<IterValue>, b: Val<IterValue>) => -1 | 0 | 1,
): rArray<IterValue> {
  return [...iter].sort(comparator)
}

sort.p = toPipe(sort)
