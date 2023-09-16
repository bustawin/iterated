import { expectError, expectType } from 'tsd-lite'
import it from '@src'

// Function needs two parameters
expectError(it.any(it.range(2)))

const a = it.any('hello', 'x')
expectType<boolean>(a)

const b = it.any(it.range(3), (x) => x > 4)
expectType<boolean>(b)

const c = it.pipe('hello', it.group.p())
expectType<Map<string, string[]>>(c)

const d = it.pipe(
  it.range(5),
  it.group.p((x) => 'x'),
)
expectType<Map<'x', number[]>>(d)

// todo As we are forcing identity to work with the "as" keyword
//  The following is accepted by the type checker when it shouldn't
//  As identity returns type string what here is interpreted as number
const e = it.group<string, number>('hello')
expectType<Map<number, string[]>>(e)
