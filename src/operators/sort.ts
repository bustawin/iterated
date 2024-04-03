import { AIt, AnyIt, AnyItV, It } from '@src'
import { toPipe } from '../pipe'
import { chooseFunc } from '@src/iterators'
import array from '@src/array'

export type comparator = -1 | 0 | 1

export function sort<Iter extends AnyIt<V>, V = AnyItV<Iter>>(
  iter: Iter,
  comparator: (a: V, b: V) => comparator,
) {
  return chooseFunc(iter, _sort, _aSort, comparator)
}

sort.p = toPipe(sort)

async function _aSort<V>(
  iter: AIt<V>,
  comparator: (a: V, b: V) => comparator,
): Promise<V[]> {
  const arr = await array(iter)
  return arr.sort(comparator)
}

function _sort<V>(iter: It<V>, comparator: (a: V, b: V) => comparator): V[] {
  return [...iter].sort(comparator)
}
