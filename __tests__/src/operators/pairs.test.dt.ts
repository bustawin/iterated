import { expectError, expectType } from 'tsd-lite'
import it, { AIt, It } from '@src'

expectError(it.pairs(123))

const s1 = it.pairs([1, 2, 3])
expectType<It<[number, number]>>(s1)

const s2 = it.pairs(it.map([1, 2, 3], it.identity))
expectType<It<[number, number]>>(s2)

const s3 = it.pairs('1234')
expectType<It<[string, string]>>(s3)

const p1 = it.pipe(it.range(5), it.pairs)
expectType<It<[number, number]>>(p1)

const a1 = it.pairs(it.async([123]))
expectType<AIt<[number, number]>>(a1)
