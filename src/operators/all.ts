import {
  AIt,
  AnyIt,
  AnyItResult,
  AnyItV,
  CurriedAnyItResult,
  isFunction,
  It,
  Matcher,
} from '../base'
import { any } from './any'
import { curry } from '@src/iterators'

/**
 * Return `true` if, for each element of the iterable,
 * the result of executing `condition` is truthy.
 * @param iter - A sync or async iterable.
 * @param condition - Either a function that accepts an element of
 * the iterable and returns a boolean, or directly a value to check equality against.
 *
 * @example
 * // Returns true
 * it.all([1, 2, 3], x => x < 10)
 *
 * @example
 * // Returns true
 * it.all([1, 1, 1], 1)
 *
 */
export function all<Iter extends AnyIt<unknown>, V extends AnyItV<Iter>>(
  iter: Iter,
  condition: V | Matcher<V>,
): AnyItResult<Iter, boolean>
/**
 * Pipe version of `all`.
 *
 * @example
 * // Returns true
 * it.pipe(it.range(2), it.all(x => x < 4))
 *
 * @param condition
 */
export function all<Iter extends AnyIt<unknown>, V extends AnyItV<Iter>>(
  condition: V | Matcher<V>,
): CurriedAnyItResult<Iter, boolean>
export function all<Iter extends AnyIt<unknown>, V extends AnyItV<Iter>>(
  iter: Iter | V | Matcher<V>,
  condition?: V | Matcher<V>,
) {
  const negatedCondition = (val: V) =>
    !(isFunction(condition) ? condition(val) : val === condition)

  return curry(
    // @ts-ignore fix in the future
    _all,
    // @ts-ignore fix in the future
    _aAll,
    iter,
    negatedCondition,
  )
}

function _all<V>(iter: It<V>, negatedCondition: V | Matcher<V>): boolean {
  return !any(iter, negatedCondition)
}

async function _aAll<V>(
  iter: AIt<V>,
  negatedCondition: V | Matcher<V>,
): Promise<boolean> {
  return !(await any(iter, negatedCondition))
}
