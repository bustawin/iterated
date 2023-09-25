import * as m from '../map'
import { AIt, AIterVal, AnyIt, identity, InOut, It } from '../base'
import { chooseFunc } from '../iterators'
import { toPipe } from '../pipe'

function _group<IterValue, T = IterValue>(
  iter: It<IterValue>,
  key: InOut<IterValue, T> = identity as InOut<IterValue, T>,
) {
  const grouped = new Map<T, IterValue[]>()
  for (const val of iter) {
    const groupKey = key(val)
    const values = m.setDefault(grouped, groupKey, [])
    values.push(val)
  }
  return grouped
}

async function _agroup<IterValue, T = IterValue>(
  iter: AIt<IterValue>,
  key: InOut<IterValue, T> = identity as InOut<IterValue, T>,
) {
  const grouped = new Map<T, IterValue[]>()
  for await (const val of iter) {
    const groupKey = key(val)
    const values = m.setDefault(grouped, groupKey, [])
    values.push(val)
  }
  return grouped
}

export function group<Iter extends AnyIt<unknown>, T = AIterVal<Iter>>(
  iter: Iter,
  key: InOut<AIterVal<Iter>, T> = identity as InOut<AIterVal<Iter>, T>,
) {
  return chooseFunc(iter, _group, _agroup, key)
}

group.p = toPipe(group)
