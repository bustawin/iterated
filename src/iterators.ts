import {
  AIt,
  AItFunc,
  AnyIt,
  AnyIterator,
  AnyIteratorV,
  AnyItV,
  CondIt,
  ItFunc,
  NoValueToGet,
} from './base'

/**
 * Returns `Iterator` from `Iterable` and `AsyncIterator` from `AsyncIterable`.
 *
 * @example
 * // Returns Iterator<number>
 * it.iterator([1, 2, 3])
 *
 * @param iter
 */
export function iterator<T>(iter: Iterable<T>): Iterator<T>
export function iterator<T>(aIter: AsyncIterable<T>): AsyncIterator<T>
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export function iterator(iter) {
  if (isIterable(iter)) return iter[Symbol.iterator]()
  return iter[Symbol.asyncIterator]()
}

/**
 * Calls the `next` method of an iterator.
 * @param iter
 */
export function next<T>(iter: Iterator<T>): IteratorResult<T>
export function next<T>(aIter: AsyncIterator<T>): Promise<IteratorResult<T>>
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export function next(iter) {
  return iter.next()
}

/**
 * Returns the next value of an iterator, or throws `NoValueToGet` if the
 * iterator is done.
 *
 * @example
 * // Returns 1
 * it.nextValue(it.iterator([1, 2, 3]))
 *
 * @example
 * // Throws NoValueToGet
 * it.nextValue(it.iterator([]))
 *
 * @throws NoValueToGet
 */
export function nextValue<Iter extends AnyIterator<V>, V = AnyIteratorV<Iter>>(
  iter: Iter,
): Iter extends Iterator<unknown> ? V : Promise<V> {
  // @ts-ignore chooseFunc typing uses iterable not iterator types
  return chooseFunc(iter, _nextValue, _aNextValue)
}

function _nextValue<T>(iter: Iterator<T>) {
  const r = next(iter)
  if (r.done) throw new NoValueToGet()

  return r.value
}

async function _aNextValue<V>(iter: AsyncIterator<V>) {
  const r = await next(iter)
  if (r.done) throw new NoValueToGet()

  return r.value
}

/**
 * Returns whether the value is `Iterable`, meaning that supports the iterator
 * protocol.
 */
export function isIterable<T>(value: unknown): value is Iterable<T> {
  // @ts-ignore: typescript can't understand this
  return value != null && typeof value[Symbol.iterator] === 'function'
}

/**
 * Returns whether the value is `AsyncIterable`, meaning that supports the async
 * iterator protocol.
 */
export function isAsyncIterable<T>(value: unknown): value is AIt<T> {
  // @ts-ignore: typescript can't understand this
  return value != null && typeof value[Symbol.asyncIterator] === 'function'
}

export function isIterator<T>(value: object): value is Iterator<T> {
  return 'next' in value && value.next instanceof Function
}

/**
 * Choose function to apply based on the type of iterable provided.
 *
 * @internal
 * @param iter - The iterable to be processed.
 * @param  func - The function to be applied to the iterable if it is synchronous.
 * @param  afunc - The function to be applied to the iterable if it is asynchronous.
 * @param  args - Additional arguments to be passed to the chosen function.
 * @returns The result of applying the chosen function to the iterable.
 * @throws {TypeError} - If iter is not an Iterable or AsyncIterable
 */
export function chooseFunc<
  Iter extends AnyIt<unknown>,
  V extends AnyItV<Iter>,
  P extends unknown[],
  R,
  R1,
>(
  iter: Iter,
  func: ItFunc<V, P, R>,
  afunc: AItFunc<V, P, R1>,
  ...args: P
): CondIt<Iter, R, R1> {
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

export function curry<
  Iter extends AnyIt<unknown> extends AnyIt<unknown> ? AnyIt<unknown> : never,
  V extends AnyItV<Iter>,
  P extends unknown[],
  R,
  R1,
>(
  func: ItFunc<V, P, R>,
  afunc: AItFunc<V, P, R1>,
  iter: Iter,
  ...args: P
): CondIt<Iter, R, R1>
export function curry<
  Iter extends AnyIt<unknown>,
  V extends AnyItV<Iter>,
  P extends unknown[],
  R,
  R1,
>(
  func: ItFunc<V, P, R>,
  afunc: AItFunc<V, P, R1>,
  ...args: P
): (iter: Iter) => CondIt<Iter, R, R1>
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function curry(func: any, afunc: any, first: any, ...args: any[]) {
  if (
    (isIterable(first) || isAsyncIterable(first)) &&
    // first could be an iterable that's not "Iter" but a condition
    args.filter((x) => x).length > 0
  ) {
    return chooseFunc(first, func, afunc, ...args)
  } else {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (iter: any) => chooseFunc(iter, func, afunc, first, ...args)
  }
}
