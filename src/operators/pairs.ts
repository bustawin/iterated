import { It } from '../utils'
import { iterator, next } from '../iterators'
import { toPipe } from '../pipe'

export function* pairs<IterValue>(
  iter: It<IterValue>,
): It<Readonly<[IterValue, IterValue]>> {
  const it = iterator(iter)
  let result = next(it)
  while (!result.done) {
    const a = result.value
    result = next(it)
    if (result.done) {
      break
    }
    const b = result.value
    yield [a, b]
  }
}

pairs.p = toPipe(pairs)
