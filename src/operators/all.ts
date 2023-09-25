import { AIt, AIterVal, AnyIt, isFunction, It, ValFunc } from '../base'
import { any } from './any'
import { toPipe } from '../pipe'
import { chooseFunc } from '@src/iterators'

export function all<Iter extends AnyIt<V>, V = AIterVal<Iter>>(
  iter: Iter,
  condition: V | ValFunc<V, boolean>,
) {
  const negatedCondition = (val: V) =>
    !(isFunction(condition) ? condition(val) : val === condition)

  return chooseFunc(iter, _all, _aAll, negatedCondition)
}

function _all<V>(iter: It<V>, negatedCondition: V | ValFunc<V, boolean>): boolean {
  return !any(iter, negatedCondition)
}

async function _aAll<V>(
  iter: AIt<V>,
  negatedCondition: V | ValFunc<V, boolean>,
): Promise<boolean> {
  return !(await any(iter, negatedCondition))
}

all.p = toPipe(all)
