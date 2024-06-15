import { AnyIt } from '@src/base'
import { reduce } from './reduce'

/**
 * Returns the size of the passed-in iterator, consuming it in the process.
 */
export function size<Iter extends AnyIt<unknown>>(iter: Iter) {
  return reduce(iter, (sum) => sum + 1, 0)
}
