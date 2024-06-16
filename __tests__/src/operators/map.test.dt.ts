import { expectType } from 'tsd-lite'
import it, { AIt, It } from '@src'

const r1 = it.map([1, 2, 3], it.identity)
expectType<It<number>>(r1)
const r2 = it.map([1, 2, 3], (x) => x.toString())
expectType<It<string>>(r2)

const r4 = it.map(it.async([1, 2, 3]), it.identity)
expectType<AIt<number>>(r4)

const p1 = it.pipe(
  [1, 2, 3, 4],
  it.map((x) => x + 4),
)
expectType<It<number>>(p1)

const p2 = it.pipe(['foo', 'bar', 'baz'], it.async, it.map(it.identity))
expectType<AIt<string>>(p2)
