import { identity, It } from '../base'
import { toPipe } from '../pipe'

export function* tap<IterValue, R>(
  iter: It<IterValue>,
  func: (val: IterValue) => R = identity as never,
): It<IterValue> {
  for (const v of iter) {
    if (func !== identity) func(v)
    yield v
  }
}

tap.p = toPipe(tap)
