import { AIt, AnyIt, AnyItV, It } from '@src'
import { toPipe } from '../pipe'
import { chooseFunc } from '@src/iterators'
import array from '@src/array'

export type comparator = number

/**
 * Return a new sorted array from the passed-in iterable. This function
 * internally calls the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort|Array.sort}
 * method, passing `comparator`.
 *
 * @param iter
 * @param comparator
 */
export function sort<Iter extends AnyIt<unknown>, V extends AnyItV<Iter>>(
  iter: Iter,
  comparator: (a: V, b: V) => comparator,
) {
  return chooseFunc(iter, _sort, _aSort, comparator)
}

sort.p = toPipe(sort)

async function _aSort<V>(iter: AIt<V>, comparator: (a: V, b: V) => comparator) {
  const arr = await array(iter)
  return arr.sort(comparator)
}

function _sort<V>(iter: It<V>, comparator: (a: V, b: V) => comparator) {
  return [...iter].sort(comparator)
}
