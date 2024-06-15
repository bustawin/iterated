import { AnyIt } from '@src/base'
import { reduce } from './reduce'

export function size<Iter extends AnyIt<unknown>>(iter: Iter) {
  return reduce(iter, (sum) => sum + 1, 0)
}
