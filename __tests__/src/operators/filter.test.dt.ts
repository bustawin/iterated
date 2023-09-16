import it from '@src'
import { It } from '@adapters/iter/utils'
import { expectType } from 'tsd-lite'

// todo these are wrong, because we are removing
const a = it.filter([1, 2, 3], 1)
expectType<It<1 | 2 | 3>>(a)

const a1 = it.filter(it.s.set(['foo', 'bar', 'baz']), (x) => x !== 'baz')
expectType<It<'foo' | 'bar' | 'baz'>>(a1)

const a2 = it.filter.p(5)([1, 2, 3])
expectType<It<number>>(a2)

const p1 = it.pipe(
  [1, 2, 3],
  it.filter.p((x) => x > 4),
)
expectType<It<number>>(p1)

const p2 = it.pipe('foo', it.filter.p('o'))
expectType<It<string>>(p2)
