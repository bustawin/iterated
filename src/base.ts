export type It<T> = Iterable<T>
export type AIt<T> = AsyncIterable<T>
export type AnyIt<T> = It<T> | AIt<T>
export type AnyItV<Iter> = Iter extends AnyIt<infer U> ? U : never

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

export async function* async<V>(it: It<V>): AIt<V> {
  for (const item of it) {
    yield item
  }
}
