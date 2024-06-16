import {
  AIt,
  AnyIt,
  AnyItResult,
  AnyItV,
  CurriedAnyItResult,
  identity,
  It,
  ValFunc,
} from '../base'
import it from '@src'
import { curry } from '@src/iterators'

/**
 * Counts the number of occurrences of each value in an iterable.
 *
 * ```typescript
 * it.count('hello') == it.m.map([['h', 1], ['e', 1], ['l', 2], ['o', 1]])
 * ```
 *
 * Use the second parameter to get the key used to count.
 *
 * ```typescript
 * const input = [{x: 'a'}, {x: 'b'}]
 * it.count(input, obj => obj.x) == it.m.map([[true, 2], [false, 0]])
 * ```
 *
 * @param iter - The iterable to count the occurrences from.
 * @param key - The function used to determine the group key. Defaults to the identity function.
 * @returns - A Map containing the count of each value.
 *
 */
export function count<Iter extends AnyIt<unknown>, V extends AnyItV<Iter>, T = V>(
  iter: Iter,
  key?: ValFunc<V, T>,
): AnyItResult<Iter, Map<T, number>>
export function count<Iter extends AnyIt<unknown>, V extends AnyItV<Iter>, T = V>(
  key?: ValFunc<V, T>,
): CurriedAnyItResult<Iter, Map<T, number>>
export function count<Iter extends AnyIt<unknown>, V extends AnyItV<Iter>, T = V>(
  iter: Iter | ValFunc<V, T> = identity as ValFunc<V, T>,
  key: ValFunc<V, T> = identity as ValFunc<V, T>,
) {
  return curry(
    // @ts-ignore fix in the future
    _count,
    _aCount,
    iter,
    key,
  )
}

function _count<V, T = V>(iter: It<V>, key: ValFunc<V, T>) {
  const counter = it.Map<T, number>()
  for (const val of iter) {
    const groupKey = key(val)
    const count = it.Map.setDefault(counter, groupKey, 0)
    counter.set(groupKey, count + 1)
  }
  return counter
}

async function _aCount<V, T = V>(iter: AIt<V>, key: ValFunc<V, T>) {
  const counter = it.Map<T, number>()
  for await (const val of iter) {
    const groupKey = key(val)
    const count = it.Map.setDefault(counter, groupKey, 0)
    counter.set(groupKey, count + 1)
  }
  return counter
}
