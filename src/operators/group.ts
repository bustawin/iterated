import map from '../map'
import { AIt, AIterVal, AnyIt, identity, It, ValFunc } from '../base'
import { chooseFunc } from '../iterators'
import { toPipe } from '../pipe'

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

export function group<Iter extends AnyIt<unknown>, T = AIterVal<Iter>>(
  iter: Iter,
  key: ValFunc<AIterVal<Iter>, T> = identity as ValFunc<AIterVal<Iter>, T>,
) {
  return chooseFunc(iter, _group, _agroup, key)
}

group.p = toPipe(group)
