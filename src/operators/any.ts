import { AIt, AnyItV, AnyIt, It, Matcher } from '../base'
import { chooseFunc, iterator, next } from '../iterators'
import { filter } from './filter'
import { toPipe } from '../pipe'

/**
 * Checks if any element in the given iterable satisfies the given condition.
 *
 * If the condition is a value, this becomes an `includes()` function.
 *
 * @param iter - The iterable to check.
 * @param condition - The condition to satisfy.
 * @return Returns true if any element satisfies the condition, otherwise false.
 */
export function any<Iter extends AnyIt<V>, V = AnyItV<Iter>>(
  iter: Iter,
  condition: V | Matcher<V>,
) {
  return chooseFunc(iter, _any, _aAny, condition)
}

any.p = toPipe(any)

function _any<V>(iter: It<V>, condition: V | Matcher<V>): boolean {
  const result = next(iterator(filter(iter, condition)))
  return !result.done
}

async function _aAny<V>(iter: AIt<V>, condition: V | Matcher<V>): Promise<boolean> {
  const result = await next(iterator(filter(iter, condition)))
  return !result.done
}
