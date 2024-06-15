import { AIt, AnyIt, AnyItV, isFunction, It, Matcher } from '../base'
import { any } from './any'
import { toPipe } from '../pipe'
import { chooseFunc } from '@src/iterators'

export function all<Iter extends AnyIt<unknown>, V extends AnyItV<Iter>>(
  iter: Iter,
  condition: V | Matcher<V>,
) {
  const negatedCondition = (val: V) =>
    !(isFunction(condition) ? condition(val) : val === condition)

  return chooseFunc(iter, _all, _aAll, negatedCondition)
}

function _all<V>(iter: It<V>, negatedCondition: V | Matcher<V>): boolean {
  return !any(iter, negatedCondition)
}

async function _aAll<V>(
  iter: AIt<V>,
  negatedCondition: V | Matcher<V>,
): Promise<boolean> {
  return !(await any(iter, negatedCondition))
}

all.p = toPipe(all)
