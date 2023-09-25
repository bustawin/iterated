import { It } from '../utils'
import { iterator, next } from '../iterators'
import { filter } from './filter'
import { toPipe } from '../pipe'

/**
 * Checks if any element in the given iterable satisfies the given condition.
 *
 * If the condition is a value, this becomes an `includes()` function.
 *
 * @param iter - The iterable to check.
 * @param condition - The condition to satisfy.
 * @return {boolean} Returns true if any element satisfies the condition, otherwise false.
 */
export function any<IterValue>(
  iter: It<IterValue>,
  condition: IterValue | ((val: IterValue) => boolean),
): boolean {
  const result = next(iterator(filter(iter, condition)))
  return !result.done
}

any.p = toPipe(any)
