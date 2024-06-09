/* eslint-disable */
import { expectType } from 'tsd-lite'
import it from '@src'

const a = it.group('hello')
expectType<Map<string, string[]>>(a)

const b = it.group('hello', (x) => 3)
expectType<Map<number, string[]>>(b)

const b1 = it.group(
  [
    { foo: 1, baz: 'x' },
    { foo: 2, baz: 'x' },
  ],
  (item) => item['foo'],
)
expectType<Map<number, { foo: number; baz: string }[]>>(b1)

const c = it.pipe('hello', it.group.p())
expectType<Map<string, string[]>>(c)

const d = it.pipe(
  it.range(5),
  it.group.p((x) => 'x'),
)
expectType<Map<string, number[]>>(d)

// todo As we are forcing identity to work with the "as" keyword
//  The following is accepted by the type checker when it shouldn't
//  As identity returns type string what here is interpreted as number
const e = it.group<string, number>('hello')
expectType<Map<number, string[]>>(e)

const a1 = it.group(it.async([1]), (x) => x.toString())
expectType<Promise<Map<string, number[]>>>(a1)

const p1 = it.pipe(it.async(it.range(4)), it.group.p())
expectType<Promise<Map<number, number[]>>>(p1)

// Group can be directly set without the pipe if there are no arguments
// due to its optional parameter, although I don't really like this
const p2 = it.pipe(it.async(it.range(4)), it.group)
expectType<Promise<Map<number, number[]>>>(p2)

const p3 = it.pipe(
  it.async(it.range(4)),
  it.group.p((x) => 'b'),
)
expectType<Promise<Map<string, number[]>>>(p3)
