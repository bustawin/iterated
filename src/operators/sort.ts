import { It } from '../base'
import { toPipe } from '../pipe'

export function sort<IterValue>(
  iter: It<IterValue>,
  comparator: (a: IterValue, b: IterValue) => -1 | 0 | 1,
): IterValue[] {
  return [...iter].sort(comparator)
}

sort.p = toPipe(sort)
