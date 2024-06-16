import { expectType } from 'tsd-lite'
import it from '@src'

const s1 = it.sort(it.range(5), (a, b) => a - b)
expectType<number[]>(s1)

const a1 = it.sort(it.async('foo'), (a, b) => a.length - b.length)
expectType<Promise<string[]>>(a1)

const p1 = it.pipe(
  [1, 2, 3],
  it.sort((a, b) => a - b),
)
expectType<number[]>(p1)
