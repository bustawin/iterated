import it, { AIt, It } from '@src'
import { expectType } from 'tsd-lite'

const a = it.filter([1, 2, 3], 1)
expectType<It<number>>(a)

const a1 = it.filter(it.set(['foo', 'bar', 'baz']), (x) => x !== 'baz')
expectType<It<string>>(a1)

const p1 = it.pipe(
  [1, 2, 3],
  it.filter.p((x) => x > 4),
)
expectType<It<number>>(p1)

const p2 = it.pipe('foo', it.filter.p('o'))
expectType<It<string>>(p2)

const p3 = it.pipe(it.async([1, 2, 3]), it.filter.p(4))
expectType<AIt<number>>(p3)
