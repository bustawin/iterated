import { AIt, AnyIt, AnyItV, It } from '@src'
import { curry } from '@src/iterators'
import array from '@src/array'
import { AnyItResult, CurriedAnyItResult } from '@src/base'

type Comparator<V> = (a: V, b: V) => number

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
  comparator: Comparator<V>,
): AnyItResult<Iter, V[]>
export function sort<Iter extends AnyIt<unknown>, V extends AnyItV<Iter>>(
  comparator: Comparator<V>,
): CurriedAnyItResult<Iter, V[]>
export function sort<Iter extends AnyIt<unknown>, V extends AnyItV<Iter>>(
  iter: Iter | Comparator<V>,
  comparator?: Comparator<V>,
) {
  return curry(
    // @ts-ignore fix in the future
    _sort,
    _aSort,
    iter,
    comparator,
  )
}

async function _aSort<V>(iter: AIt<V>, comparator: Comparator<V>) {
  const arr = await array(iter)
  return arr.sort(comparator)
}

function _sort<V>(iter: It<V>, comparator: Comparator<V>) {
  // if we target ES2023 we could use .toSorted and avoid a temporary array
  return [...iter].sort(comparator)
}
