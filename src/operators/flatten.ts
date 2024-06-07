import { AIt, AnyIt, It } from '@src'
import { chooseFunc } from '@src/iterators'

export type AnyItItV<Iter> = Iter extends AnyIt<infer U>
  ? U extends It<infer V>
    ? V
    : never
  : never

/**
 * Flattens one level the passed-in nested iterable.
 */
export function flatten<Iter extends AnyIt<It<V>>, V = AnyItItV<Iter>>(iter: Iter) {
  return chooseFunc(iter, _flatten, _aFlatten)
}

async function* _aFlatten<V>(iter: AIt<It<V>>): AIt<V> {
  for await (const el of iter) {
    yield* el
  }
}

function* _flatten<V>(iter: It<It<V>>): It<V> {
  for (const el of iter) {
    yield* el
  }
}
