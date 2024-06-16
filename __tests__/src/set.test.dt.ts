import { expectError, expectType } from 'tsd-lite'
import it from '@src'

const s1 = it.set([1, 2])
expectType<Set<number>>(s1)

const a1 = it.set(it.async('foo'))
expectType<Promise<Set<string>>>(a1)

const p1 = it.pipe([1, 2], it.map(it.identity), it.set)
expectType<Set<number>>(p1)

const c1 = it.set<number>()
expectType<Set<number>>(c1)

expectError(it.set<number>(['foo']))
