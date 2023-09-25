import { AIt, AnyIt, It, rArray } from './base'
import { chooseFunc } from '@src/iterators'

export function _array<IterValue>(iter: It<IterValue>): rArray<IterValue> {
  return [...iter]
}

export async function _aArray<IterValue>(
  iter: AIt<IterValue>,
): Promise<rArray<IterValue>> {
  const result: IterValue[] = []
  for await (const value of iter) {
    result.push(value)
  }
  return result
}

export function array<Iter extends AnyIt<unknown>>(iter: Iter) {
  return chooseFunc(iter, _array, _aArray)
}
