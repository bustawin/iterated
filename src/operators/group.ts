import map from '../map'
import { AIt, AnyIt, AnyItV, identity, It, ValFunc } from '../base'
import { chooseFunc } from '../iterators'
import { toPipe } from '../pipe'

/**
 * Groups the passed-in iterable by the given key.
 *
 * @param iter A sync or async iterable.
 * @param key A function computing the key, such as `item => item['foo']`. Key
 * defaults to an identity function, grouping duplicated values.
 * @return A Map where each key is a group.
 */
export function group<Iter extends AnyIt<unknown>, T = AnyItV<Iter>>(
  iter: Iter,
  key: ValFunc<AnyItV<Iter>, T> = identity as ValFunc<AnyItV<Iter>, T>,
) {
  return chooseFunc(iter, _group, _agroup, key)
}

group.p = toPipe(group)

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
