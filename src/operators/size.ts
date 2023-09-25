import { It } from '../base'
import { reduce } from './reduce'

export function size<IterValue>(iter: It<IterValue>): number {
  return reduce(iter, (sum) => sum + 1, 0)
}
