import { It } from '../utils'
import { toPipe } from '../pipe'

export function* tap<IterValue, R>(
  iter: It<IterValue>,
  func: (val: IterValue) => R,
): It<IterValue> {
  for (const v of iter) {
    func(v)
    yield v
  }
}

tap.p = toPipe(tap)
