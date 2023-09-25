import { expectError, expectType } from 'tsd-lite'
import it from '@src'

const s1 = it.Map([
  [1, 2],
  [2, 3],
])
expectType<Map<number, number>>(s1)

const a1 = it.Map(
  it.async([
    [1, 2],
    [3, 4],
  ]),
)
expectType<Promise<Map<number, number>>>(a1)

const p1 = it.pipe(
  [
    [1, 'foo'],
    [2, 'bar'],
  ] as [number, string][],
  it.map.p(it.identity),
  it.Map,
)
expectType<Map<number, string>>(p1)

const c1 = it.Map<number, number>()
expectType<Map<number, number>>(c1)

const c2 = it.Map<number, string>([])
expectType<Map<number, string>>(c2)

expectError(it.Map(['foo']))
