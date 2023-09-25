import { AIt, AIterVal, AnyIt, It, NoValueToGet } from './base'

export function iterator<T>(iter: Iterable<T>): Iterator<T>
export function iterator<T>(aIter: AsyncIterable<T>): AsyncIterator<T>
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export function iterator(iter) {
  if (isIterable(iter)) return iter[Symbol.iterator]()
  return iter[Symbol.asyncIterator]()
}

export function next<T>(iter: Iterator<T>): IteratorResult<T>
export function next<T>(aIter: AsyncIterator<T>): Promise<IteratorResult<T>>
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export function next(iter) {
  return iter.next()
}

export function nextValue<T>(iter: Iterable<T>): T {
  const r = next(iterator(iter))
  if (r.done) throw new NoValueToGet()

  return r.value
}

export function isIterable<T>(value: object): value is Iterable<T> {
  // @ts-ignore
  return value != null && typeof value[Symbol.iterator] === 'function'
}

export function isAsyncIterable<T>(value: object): value is AIt<T> {
  // @ts-ignore
  return value != null && typeof value[Symbol.asyncIterator] === 'function'
}

export function isIterator<T>(value: object): value is Iterator<T> {
  return 'next' in value && value.next instanceof Function
}

export function chooseFunc<Iter extends AnyIt<unknown>, P extends unknown[], R, R1>(
  iter: Iter,
  func: (iter: It<AIterVal<Iter>>, ...args: P) => R,
  afunc: (iter: AIt<AIterVal<Iter>>, ...args: P) => R1,
  ...args: P
): Iter extends It<any> ? R : R1 {
  if (isIterable(iter)) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return func(iter, ...args)
  } else if (isAsyncIterable(iter)) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return afunc(iter, ...args)
  }
  throw new TypeError()
}
