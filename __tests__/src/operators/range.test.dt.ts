import { expectType } from 'tsd-lite'
import it, { It } from '@src'

const s1 = it.range(1)
expectType<It<number>>(s1)

const s2 = it.range(1, 2)
expectType<It<number>>(s2)

const s3 = it.range(1, 1, 1)
expectType<It<number>>(s3)

const s4 = it.range(1, 1, -1)
expectType<It<number>>(s4)
