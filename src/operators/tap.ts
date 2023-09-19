import { It, Val } from '../utils'
import { toPipe } from '../pipe'

export function* tap<IterValue, R>(
  iter: It<IterValue>,
  func: (val: Val<IterValue>) => Val<R>,
): It<IterValue> {
  for (const v of iter) {
    func(v)
    yield v
  }
}

tap.p = toPipe(tap)
