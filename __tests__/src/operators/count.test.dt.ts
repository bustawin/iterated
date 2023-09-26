/* eslint-disable */
import { expectError, expectType } from 'tsd-lite'
import it from '@src'

const s1 = it.count('hello')
expectType<Map<string, number>>(s1)

const s2 = it.count('hello', (x) => 3)
expectType<Map<number, number>>(s2)

const p1 = it.pipe('hello', it.count.p())
expectType<Map<string, number>>(p1)

const p2 = it.pipe(
  it.range(5),
  it.count.p((x) => 'x'),
)
expectType<Map<string, number>>(p2)

const a1 = it.count(it.async(it.range(2)))
expectType<Promise<Map<number, number>>>(a1)

const p3 = it.pipe(it.async('1'), it.count.p())
expectType<Promise<Map<string, number>>>(p3)

// todo As we are forcing identity to work with the "as" keyword
//  The following is accepted by the type checker when it shouldn't
//  As identity returns type string what here is interpreted as number
const e = it.count<Iterable<string>, string, number>('hello')
expectType<Map<number, number>>(e)
