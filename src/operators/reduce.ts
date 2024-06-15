import { AIt, AnyIt, AnyItV, It, notDefined } from '@src/base'
import { chooseFunc, iterator, next, nextValue } from '../iterators'
import { toPipe } from '../pipe'

export function reduce<Iter extends AnyIt<unknown>, V = AnyItV<Iter>, U = V>(
  iter: Iter,
  func: (previousValue: U, currentValue: V) => U,
  initialValue:
    | (U extends typeof notDefined ? never : U)
    | typeof notDefined = notDefined,
) {
  return chooseFunc(iter, _reduce, _aReduce, func, initialValue)
}

reduce.p = toPipe(reduce)

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

reduce.p = toPipe(reduce)
