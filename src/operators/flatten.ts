import { It } from '@src'
import { toPipe } from '../pipe'

export function* flatten<IterValue>(iter: It<It<IterValue>>): It<IterValue> {
  for (const el of iter) {
    yield* el
  }
}

flatten.p = toPipe(flatten)
