export type It<T> = Iterable<T>
export type AIt<T> = AsyncIterable<T>
export type AnyIt<T> = It<T> | AIt<T>
export type AnyItV<Iter> = Iter extends AnyIt<infer U> ? U : never
export type AnyIterator<V> = Iterator<V> | AsyncIterator<V>
export type AnyIteratorV<Iter> = Iter extends AnyIterator<infer U> ? U : never
export type CondIt<Iter, A, B> = Iter extends It<unknown> ? A : B
export type AnyItResult<Iter, A> = Iter extends It<unknown> ? A : Promise<A>
export type AnyItResultIt<Iter, A> = Iter extends It<unknown> ? It<A> : AIt<A>
export type CurriedAnyItResult<Iter, A> = (
  iter: Iter,
) => Iter extends It<unknown> ? A : Promise<A>
export type CurriedAnyItResultIt<Iter, A> = (
  iter: Iter,
) => Iter extends It<unknown> ? It<A> : AIt<A>
export type ItFunc<V, P extends unknown[], R> = (iter: It<V>, ...args: P) => R
export type AItFunc<V, P extends unknown[], R> = (iter: AIt<V>, ...args: P) => R
export type ValOrNotDefined<V> =
  | (V extends typeof notDefined ? never : V)
  | typeof notDefined

export interface ValFunc<V, R> {
  (val: V): R
}

export interface Matcher<V> {
  (val: V): boolean
}

export function identity<V>(val: V): V {
  return val
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function isFunction(val: unknown): val is Function {
  return val instanceof Function
}

export class NoValueToGet extends Error {}

export const notDefined: unique symbol = Symbol('not defined')

export class NotFound<T> extends Error {
  constructor(val: T, iterable: AnyIt<T>) {
    super(`${val} not found in ${iterable}`)
  }
}

/**
 * Transforms an `Iterable` to an `AsyncIterable`.
 */
export async function* async<V>(it: It<V>): AIt<V> {
  for (const item of it) {
    yield item
  }
}

/**
 * Given an async iterator whose values are promises, returns an async iterator
 * that awaits each promise.
 */
export async function* await_<V>(it: AnyIt<Promise<V>>): AIt<V> {
  for await (const value of it) {
    yield value
  }
}
