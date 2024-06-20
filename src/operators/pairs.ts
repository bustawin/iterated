import { AIt, AnyIt, It } from '@src/base'
import { chooseFunc, iterator, next } from '@src/iterators'

/**
 * Pairs the passed-in elements of the iterable. If the iterable has less than
 * two values it returns empty.
 *
 * @example
 * // Returns an iterable representing ['AB','BC','CD','DE','EF','FG']
 * pairs('ABCDEFG')
 *
 * @param iter A sync or async iterable.
 * @return Returns an iterable whose values are lists of two elements.
 */
export function pairs<Iter extends AnyIt<unknown>>(iter: Iter) {
  return chooseFunc(iter, _pairs, _aPairs)
}

function* _pairs<V>(iter: It<V>): It<[V, V]> {
  const it = iterator(iter)
  let result = next(it)
  while (!result.done) {
    const a = result.value
    result = next(it)
    if (result.done) {
      break
    }
    const b = result.value
    yield [a, b]
  }
}

async function* _aPairs<V>(iter: AIt<V>): AIt<[V, V]> {
  const it = iterator(iter)
  let result = await next(it)
  while (!result.done) {
    const a = result.value
    result = await next(it)
    if (result.done) {
      break
    }
    const b = result.value
    yield [a, b]
  }
}
