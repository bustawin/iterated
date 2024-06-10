import { expectError, expectType } from 'tsd-lite'
import it from '@src'

expectError(it.reduce(123))

const s1 = it.reduce(it.range(4), (prev, curr) => prev + curr)
expectType<number>(s1)

const s2 = it.reduce('foo', (prev, curr) => prev + curr)
expectType<string>(s2)

const s3 = it.reduce('foo', (prev, curr) => prev + curr, 'x')
expectType<string>(s3)

// todo this should fail when inside the expectError and outside. It now fails only when placed outside
// expectError(it.reduce([1, 2, 3], (prev, curr) => `${prev} ${curr}`))

const s4 = it.reduce([1, 2, 3], (prev, curr) => `${prev} ${curr}`, '')
expectType<string>(s4)

const p1 = it.pipe(
  [1, 2, 3],
  it.reduce.p((prev, curr) => `${prev} ${curr}`, ''),
)
expectType<string>(p1)

const p2 = it.pipe(
  ['foo', 'bar'],
  it.reduce.p((prev, curr) => `${prev} ${curr}`),
)
expectType<string>(p2)

const a1 = it.pipe(
  ['foo', 'bar'],
  it.async,
  it.reduce.p((prev, curr) => `${prev} ${curr}`),
)
expectType<Promise<string>>(a1)
