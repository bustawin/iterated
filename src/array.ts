import { AIt, AnyIt, It } from './base'
import { chooseFunc } from '@src/iterators'

function _array<IterValue>(iter: It<IterValue>): IterValue[] {
  return [...iter]
}

async function _aArray<IterValue>(iter: AIt<IterValue>): Promise<IterValue[]> {
  const result: IterValue[] = []
  for await (const value of iter) {
    result.push(value)
  }
  return result
}

export default function array<V, Iter extends AnyIt<unknown> = It<V>>(
  iter: Iter = [] as never,
) {
  return chooseFunc(iter, _array, _aArray)
}
