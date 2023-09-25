import { AIt, AIterVal, AnyIt, It, ValFunc } from '../base'
import { chooseFunc } from '../iterators'
import { toPipe } from '../pipe'

/**
 * Returns an Iterable populated with the results of calling
 * a function for every element of the passed-in iterable.
 *
 * @param iter - The input Iterable or AsyncIterable.
 * @param func - The function used to map each element.
 * @return - An Iterable or AsyncIterable with each element
 * being the result of func.
 */
export function map<Iter extends AnyIt<unknown>, R>(
  iter: Iter,
  func: ValFunc<AIterVal<Iter>, R>,
) {
  return chooseFunc(iter, _map, _amap, func)
}

map.p = toPipe(map)

function* _map<IterValue, R>(iter: It<IterValue>, func: ValFunc<IterValue, R>): It<R> {
  for (const v of iter) {
    yield func(v)
  }
}

async function* _amap<IterValue, R>(
  iter: AIt<IterValue>,
  func: ValFunc<IterValue, R>,
): AIt<R> {
  for await (const v of iter) {
    yield func(v)
  }
}
