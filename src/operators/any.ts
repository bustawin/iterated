import { AIt, AnyIt, AnyItResult, AnyItV, CurriedAnyItResult, It, Matcher } from '../base'
import { curry, iterator, next } from '../iterators'
import { filter } from './filter'

/**
 * Checks if any element in the given iterable satisfies the given condition.
 *
 * If the condition is a value, this becomes an `includes()` function.
 *
 * @param iter - The iterable or async iterable to check.
 * @param condition - The condition to satisfy.
 * @return Returns true if any element satisfies the condition, otherwise false.
 */
export function any<Iter extends AnyIt<unknown>, V extends AnyItV<Iter>>(
  iter: Iter,
  condition: V | Matcher<V>,
): AnyItResult<Iter, boolean>
export function any<Iter extends AnyIt<unknown>, V extends AnyItV<Iter>>(
  condition: V | Matcher<V>,
): CurriedAnyItResult<Iter, boolean>
export function any<Iter extends AnyIt<unknown>, V extends AnyItV<Iter>>(
  iter: Iter | V | Matcher<V>,
  condition?: V | Matcher<V>,
) {
  return curry(
    // @ts-ignore fix in the future
    _any,
    _aAny,
    iter,
    condition,
  )
}

function _any<V>(iter: It<V>, condition: V | Matcher<V>): boolean {
  const result = next(iterator(filter(iter, condition)))
  return !result.done
}

async function _aAny<V>(iter: AIt<V>, condition: V | Matcher<V>): Promise<boolean> {
  const result = await next(iterator(filter(iter, condition)))
  return !result.done
}
