import { filter } from './filter'
import {
  AIt,
  AnyIt,
  AnyItResult,
  AnyItV,
  CurriedAnyItResult,
  It,
  Matcher,
  notDefined,
  NotFound,
} from '../base'
import { curry, iterator, next } from '../iterators'

/**
 * Returns the first matching value. If the value is not found return `def`,
 * and if `def` is not defined throw `NotFound`.
 *
 * @example
 * // Returns 2
 * it.filter([1, 2, 3], x => x == 2)
 *
 * @example
 * // Returns 2
 * it.filter([1, 2, 3], 2)
 *
 * @example
 * // Returns 10
 * it.filter([1, 2, 3], -1, 10)
 *
 * @example
 * // Throws NotFound
 * it.filter([1, 2, 3], -1)
 *
 * @param iter - The iterable to find against.
 * @param condition - A value or a matcher function.
 * @param def - The default value to return if no value has been found.
 * @throws NotFound - No value has been found and `def` is not defined.
 */
export function find<Iter extends AnyIt<unknown>, V extends AnyItV<Iter>, D = V>(
  iter: Iter,
  condition: V | Matcher<V>,
  def?: D | typeof notDefined,
): AnyItResult<Iter, D | V>
export function find<Iter extends AnyIt<unknown>, V extends AnyItV<Iter>, D = V>(
  condition: V | Matcher<V>,
  def?: D | typeof notDefined,
): CurriedAnyItResult<Iter, D | V>
export function find<Iter extends AnyIt<unknown>, V extends AnyItV<Iter>, D = V>(
  iter: Iter | V | Matcher<V>,
  condition?: V | Matcher<V>,
  def: D | typeof notDefined = notDefined,
) {
  return curry(
    // @ts-ignore fix in the future
    _find,
    _aFind,
    iter,
    condition,
    def,
  )
}

function _find<V, D>(
  iter: It<V>,
  condition: V | Matcher<V>,
  def: D | typeof notDefined,
): D | V {
  const result = next(iterator(filter(iter, condition)))
  if (result.done) {
    if (def !== notDefined) {
      return def
    }

    throw new NotFound(condition, iter)
  }

  return result.value
}

async function _aFind<V, D>(
  iter: AIt<V>,
  condition: V | Matcher<V>,
  def: D | typeof notDefined,
): Promise<D | V> {
  const result = await next(iterator(filter(iter, condition)))
  if (result.done) {
    if (def !== notDefined) {
      return def
    }

    throw new NotFound(condition, iter)
  }

  return result.value
}
