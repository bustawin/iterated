import { expectType } from 'tsd-lite'
import it from '@src'

const s1 = it.array('foo')
expectType<string[]>(s1)

const a1 = it.array([1])
expectType<number[]>(a1)

const p1 = it.pipe('foo', it.filter('f'), it.array)
expectType<string[]>(p1)

const c1 = it.array<number>()
expectType<number[]>(c1)
