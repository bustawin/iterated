/* eslint-disable */
import it, { It } from '@src'
import { expectType } from 'tsd-lite'

const a = it.pipe(
  it.range(5),
  it.map.p((x) => x.toString()),
  it.find.p('2'),
)
expectType<string>(a)

const b = it.pipe('hello', it.group.p())
expectType<Map<string, string[]>>(b)

const c = it.pipe(
  it.set([[1], [2], [3]]),
  it.map.p((x) => [x[0] + 1]),
  it.flatten,
)
expectType<It<number>>(c)
