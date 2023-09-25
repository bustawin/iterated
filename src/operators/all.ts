import { It } from '../base'
import { any } from './any'
import { toPipe } from '../pipe'

export function all<IterValue>(
  iter: It<IterValue>,
  condition: IterValue | ((val: IterValue) => boolean),
): boolean {
  const negatedCondition = (val: IterValue) =>
    !(condition instanceof Function ? condition(val) : val === condition)

  return any(iter, negatedCondition)
}

all.p = toPipe(all)
