import { identity, It, ValFunc } from '../base'
import Map from './../map'
import { toPipe } from '../pipe'

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
export function count<IterValue, T = IterValue>(
  iter: It<IterValue>,
  key: ValFunc<IterValue, T> = identity as ValFunc<IterValue, T>,
) {
  const counter = Map<T, number>()
  for (const val of iter) {
    const groupKey = key(val)
    const count = Map.setDefault(counter, groupKey, 0)
    counter.set(groupKey, count + 1)
  }
  return counter
}

count.p = toPipe(count)
