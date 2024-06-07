import { expectError, expectType } from 'tsd-lite'
import it, { AIt, It } from '@src'

expectError(it.flatten(123))

const s1 = it.flatten([[1, 2, 3]])
expectType<It<number>>(s1)

const s2 = it.flatten(it.map([[1, 2, 3]], it.identity))
expectType<It<number>>(s2)

const s3 = it.flatten(it.map(['12345'], it.identity))
expectType<It<string>>(s3)

const p1 = it.pipe(
  it.range(5),
  it.map.p((x) => [x]),
  it.flatten,
)
expectType<It<number>>(p1)

const a1 = it.flatten(it.async([[123]]))
expectType<AIt<number>>(a1)
