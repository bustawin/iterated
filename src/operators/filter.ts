import {
  AIt,
  AnyIt,
  AnyItResultIt,
  AnyItV,
  CurriedAnyItResultIt,
  isFunction,
  It,
  Matcher,
} from '../base'
import { curry } from '@src/iterators'

/**
 * Filters elements from an iterable on a value or a filtering function.
 *
 * @param iter - The iterable or async iterable to filter.
 * @param condition - The value or filtering function used for filtering elements.
 * @return The filtered iterable.
 */
export function filter<Iter extends AnyIt<unknown>, V extends AnyItV<Iter>>(
  iter: Iter,
  condition: V | Matcher<V>,
): AnyItResultIt<Iter, V>
/**
 * This is the curried form of filter.
 * @param condition
 */
export function filter<Iter extends AnyIt<unknown>, V extends AnyItV<Iter>>(
  condition: V | Matcher<V>,
): CurriedAnyItResultIt<Iter, V>
export function filter<Iter extends AnyIt<unknown>, V extends AnyItV<Iter>>(
  iter: Iter | V | Matcher<V>,
  condition?: V | Matcher<V>,
) {
  return curry(
    // @ts-ignore fix in the future
    _filter,
    _aFilter,
    iter,
    condition,
  )
}

async function* _aFilter<V>(iter: AIt<V>, condition: V | Matcher<V>): AIt<V> {
  const f = matcher(condition)
  for await (const v of iter) {
    if (f(v)) {
      yield v
    }
  }
}

function* _filter<V>(iter: It<V>, condition: V | Matcher<V>): It<V> {
  const f = matcher(condition)
  for (const v of iter) {
    if (f(v)) {
      yield v
    }
  }
}

function matcher<V>(condition: V | Matcher<V>) {
  return isFunction(condition) ? condition : (v: V) => v === condition
}
