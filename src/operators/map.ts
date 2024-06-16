import {
  AIt,
  AnyIt,
  AnyItResultIt,
  AnyItV,
  CurriedAnyItResultIt,
  It,
  ValFunc,
} from '../base'
import { curry } from '../iterators'

/**
 * Returns an Iterable populated with the results of calling
 * a function for every element of the passed-in iterable.
 *
 * @param func - The function used to map each element.
 * @return An Iterable or AsyncIterable with each element
 * being the result of func.
 */
export function map<Iter extends AnyIt<unknown>, R>(
  func: ValFunc<AnyItV<Iter>, R>,
): CurriedAnyItResultIt<Iter, R>
export function map<Iter extends AnyIt<unknown>, R>(
  iter: Iter,
  func: ValFunc<AnyItV<Iter>, R>,
): AnyItResultIt<Iter, R>
export function map<Iter extends AnyIt<unknown>, R>(
  iter: Iter | ValFunc<AnyItV<Iter>, R>,
  func?: ValFunc<AnyItV<Iter>, R>,
) {
  return curry(
    // @ts-ignore improve this in the future
    _map,
    // @ts-ignore improve this in the future
    _amap,
    iter,
    func,
  )
}

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
