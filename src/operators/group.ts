import map from '../map'
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
import { curry } from '@src/iterators'

/**
 * Groups the passed-in iterable by the given key.
 *
 * @example
 * // Returns Map(1: [1, 1], 2: [2, 2], 3: [3])
 * it.group([1, 1, 2, 2, 3])
 *
 * @example
 * // Returns Map(true: [1, 1], false: [2, 2, 3])
 * it.group([1, 1, 2, 2, 3], x => x < 2)
 *
 *
 * @example
 * // Returns Map(1: [{id: 1}], 2: [{id: 2}])
 * it.group([{id: 1}, {id: 2}], x => x.id)
 *
 * @param iter A sync or async iterable.
 * @param key A function computing the key, such as `item => item['foo']`. Key
 * defaults to an identity function, grouping duplicated values.
 * @return A Map where each key is a group.
 */
export function group<Iter extends AnyIt<unknown>, T = AnyItV<Iter>>(
  iter: Iter,
  key?: ValFunc<AnyItV<Iter>, T>,
): AnyItResult<Iter, Map<T, AnyItV<Iter>[]>>
export function group<Iter extends AnyIt<unknown>, T = AnyItV<Iter>>(
  key?: ValFunc<AnyItV<Iter>, T>,
): CurriedAnyItResult<Iter, Map<T, AnyItV<Iter>[]>>
export function group<Iter extends AnyIt<unknown>, T = AnyItV<Iter>>(
  iter: Iter | ValFunc<AnyItV<Iter>, T> = identity as ValFunc<AnyItV<Iter>, T>,
  key: ValFunc<AnyItV<Iter>, T> = identity as ValFunc<AnyItV<Iter>, T>,
) {
  return curry(
    // @ts-ignore fix in the future
    _group,
    _agroup,
    iter,
    key,
  )
}

function _group<IterValue, T = IterValue>(
  iter: It<IterValue>,
  key: ValFunc<IterValue, T> = identity as ValFunc<IterValue, T>,
) {
  const grouped = new Map<T, IterValue[]>()
  for (const val of iter) {
    const groupKey = key(val)
    const values = map.setDefault(grouped, groupKey, [])
    values.push(val)
  }
  return grouped
}

async function _agroup<IterValue, T = IterValue>(
  iter: AIt<IterValue>,
  key: ValFunc<IterValue, T> = identity as ValFunc<IterValue, T>,
) {
  const grouped = new Map<T, IterValue[]>()
  for await (const val of iter) {
    const groupKey = key(val)
    const values = map.setDefault(grouped, groupKey, [])
    values.push(val)
  }
  return grouped
}
