export type It<T> = Iterable<T>
export type AIt<T> = AsyncIterable<T>
export type AnyIt<T> = It<T> | AIt<T>
export type AIterVal<Iter> = Iter extends AnyIt<infer U> ? U : never

export interface ValFunc<IterValue, R> {
  (val: IterValue): R
}

export function identity<V>(val: V): V {
  return val
}

export class NoValueToGet extends Error {}

export const notDefined: unique symbol = Symbol('not defined')

export class NotFound<T> extends Error {
  constructor(val: T, iterable: It<T>) {
    super(`${val} not found in ${iterable}`)
  }
}

export async function* async<IterValue>(it: It<IterValue>): AIt<IterValue> {
  for (const item of it) {
    yield item
  }
}
