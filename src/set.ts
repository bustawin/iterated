import { AIt, AnyIt, It } from '@src/base'
import { chooseFunc } from '@src/iterators'

async function _aSet<IterValue>(iter: AIt<IterValue>): Promise<Set<IterValue>> {
  const result: Set<IterValue> = new Set()
  for await (const value of iter) {
    result.add(value)
  }
  return result
}

function _set<V>(iter: Iterable<V>): Set<V> {
  return new Set(iter)
}

export default function set<V, Iter extends AnyIt<unknown> = It<V>>(
  iter: Iter = [] as never,
) {
  return chooseFunc(iter, _set, _aSet)
}
