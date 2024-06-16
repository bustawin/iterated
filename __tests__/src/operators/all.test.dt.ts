/* eslint-disable */
import { expectError, expectType } from 'tsd-lite'
import it from '@src'

const s1 = it.all('hello', 'x')
expectType<boolean>(s1)

const s2 = it.all(it.range(3), (x) => x > 4)
expectType<boolean>(s2)

const a1 = it.all(it.async(it.range(3)), 4)
expectType<Promise<boolean>>(a1)

const p1 = it.pipe('hello', it.all('h'))
expectType<boolean>(p1)

const p2 = it.pipe(
  it.range(5),
  it.all((x: number) => x === 4),
)
expectType<boolean>(p2)

const p3 = it.pipe(
  it.async(it.range(4)),
  it.all((x) => x > 4),
)
expectType<Promise<boolean>>(p3)

expectError(it.all('foo', (x: number) => x > 4))
expectError(it.all(it.async('foo'), (x: number) => x > 4))
