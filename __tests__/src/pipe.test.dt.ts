/* eslint-disable */
import it, { AIt, It } from '@src'
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

const d = it.pipe(
  it.async([[1], [2], [3]]),
  it.map.p((x) => Promise.resolve(x)),
  it.await,
  it.map.p((x) => x),
)
expectType<AIt<number[]>>(d)

const e = it.pipe(
  [1, 2, 3],
  it.map.p((x) => Promise.resolve(x)),
  it.async,
  it.await,
  it.map.p((x) => x),
)
expectType<AIt<number>>(e)
