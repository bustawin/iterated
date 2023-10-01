import { AIt, AnyItV, AnyIt, It, NoValueToGet } from './base'

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

export function isIterable<T>(value: unknown): value is Iterable<T> {
  // @ts-ignore: typescript can't understand this
  return value != null && typeof value[Symbol.iterator] === 'function'
}

export function isAsyncIterable<T>(value: object): value is AIt<T> {
  // @ts-ignore: typescript can't understand this
  return value != null && typeof value[Symbol.asyncIterator] === 'function'
}

export function isIterator<T>(value: object): value is Iterator<T> {
  return 'next' in value && value.next instanceof Function
}

/**
 * Choose function to apply based on the type of iterable provided.
 *
 * @param iter - The iterable to be processed.
 * @param  func - The function to be applied to the iterable if it is synchronous.
 * @param  afunc - The function to be applied to the iterable if it is asynchronous.
 * @param  args - Additional arguments to be passed to the chosen function.
 * @returns The result of applying the chosen function to the iterable.
 * @throws {TypeError} - If iter is not an Iterable or AsyncIterable
 */
export function chooseFunc<Iter extends AnyIt<unknown>, P extends unknown[], R, R1>(
  iter: Iter,
  func: (iter: It<AnyItV<Iter>>, ...args: P) => R,
  afunc: (iter: AIt<AnyItV<Iter>>, ...args: P) => R1,
  ...args: P
): Iter extends It<unknown> ? R : R1 {
  if (isIterable<AnyItV<Iter>>(iter)) {
    // @ts-ignore: typescript can't understand returning only R is ok here
    return func(iter, ...args)
  }
  if (isAsyncIterable(iter)) {
    // @ts-ignore: typescript can't understand returning only R1 is ok here
    return afunc(iter, ...args)
  }
  throw new TypeError('iter is not an Iterable or an AsyncIterable')
}
