/* eslint-disable */
import { expectError, expectType } from 'tsd-lite'
import it from '@src'
import exp = require('node:constants')

// Function needs two parameters
expectError(it.any(it.range(2)))

const s1 = it.any('hello', 'x')
expectType<boolean>(s1)

const s2 = it.any(it.range(3), (x) => x > 4)
expectType<boolean>(s2)

const a1 = it.any(it.async(it.range(3)), 4)
expectType<Promise<boolean>>(a1)

const p1 = it.pipe('hello', it.any.p('h'))
expectType<boolean>(p1)

const p2 = it.pipe(
  it.range(5),
  it.any.p((x: number) => x === 4),
)
expectType<boolean>(p2)

const p3 = it.pipe(
  it.async(it.range(4)),
  it.any.p((x) => x > 4),
)
expectType<Promise<boolean>>(p3)

expectError(it.any('foo', (x: number) => x > 4))
expectError(it.any(it.async('foo'), (x: number) => x > 4))
