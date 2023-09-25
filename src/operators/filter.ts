import { It } from '../base'
import { toPipe } from '../pipe'

interface Matcher<T> {
  (val: T): boolean
}

export function* filter<IterValue>(
  iter: It<IterValue>,
  valOrFunc: IterValue | Matcher<IterValue>,
): It<IterValue> {
  const f = valOrFunc instanceof Function ? valOrFunc : (v: IterValue) => v === valOrFunc

  for (const v of iter) {
    if (f(v)) {
      yield v
    }
  }
}

filter.p = toPipe(filter)
