import {
  AIt,
  AnyIt,
  AnyItResult,
  AnyItV,
  CurriedAnyItResult,
  It,
  notDefined,
  ValOrNotDefined,
} from '@src/base'
import { curry, iterator, next, nextValue } from '../iterators'

export type Reducer<U, V> = (previousValue: U, currentValue: V) => U

/**
 * Reducer function such as {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce|Array.reduce} but
 * accepting an iterable.
 */
export function reduce<Iter extends AnyIt<unknown>, V extends AnyItV<Iter>, U = V>(
  func: Reducer<U, V>,
  initialValue?: ValOrNotDefined<U>,
): CurriedAnyItResult<Iter, U>
export function reduce<Iter extends AnyIt<unknown>, V extends AnyItV<Iter>, U = V>(
  iter: Iter,
  func: Reducer<U, V>,
  initialValue?: ValOrNotDefined<U>,
): AnyItResult<Iter, U>
export function reduce(first: any, second: any = notDefined, third: any = notDefined) {
  return curry(_reduce, _aReduce, first, second, third)
}

async function _aReduce<V, U = V>(
  iter: AIt<unknown>,
  func: (previousValue: U, currentValue: V) => U,
  initialValue?: (U extends typeof notDefined ? never : U) | typeof notDefined,
) {
  const it = iterator(iter)
  let previousValue = initialValue === notDefined ? await nextValue(it) : initialValue
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const r = await next(it)
    if (r.done) break
    // @ts-ignore This value can be U or V
    previousValue = func(previousValue, r.value)
  }
  return previousValue as U
}

export function _reduce<V, U = V>(
  iter: It<unknown>,
  func: (previousValue: U, currentValue: V) => U,
  initialValue?: (U extends typeof notDefined ? never : U) | typeof notDefined,
) {
  const it = iterator(iter)
  let previousValue = initialValue === notDefined ? nextValue(it) : initialValue
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const r = next(it)
    if (r.done) break
    // @ts-ignore This value can be U or V
    previousValue = func(previousValue, r.value)
  }
  return previousValue as U
}
