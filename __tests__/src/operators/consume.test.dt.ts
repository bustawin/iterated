/* eslint-disable */
import { expectType } from 'tsd-lite'
import it from '@src'

const a = it.consume(it.range(5))
expectType<void>(a)

const b = it.pipe(it.range(5), it.consume)
expectType<void>(b)
