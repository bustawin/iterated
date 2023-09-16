import { expectType } from 'tsd-lite'
import it from '@src'

const a = it.count('hello')
expectType<Map<string, number>>(a)

const b = it.count('hello', (x) => 3)
expectType<Map<3, number>>(b)

const c = it.pipe('hello', it.count.p())
expectType<Map<string, number>>(c)

const d = it.pipe(
  it.range(5),
  it.count.p((x) => 'x'),
)
expectType<Map<'x', number>>(d)

// todo As we are forcing identity to work with the "as" keyword
//  The following is accepted by the type checker when it shouldn't
//  As identity returns type string what here is interpreted as number
const e = it.count<string, number>('hello')
expectType<Map<number, number>>(e)
