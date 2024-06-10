/* eslint-disable */
import it from '@src'
import { expectType } from 'tsd-lite'

const s1 = it.next(it.iterator([1, 2, 3]))
expectType<IteratorResult<number, any>>(s1)
const a1 = it.next(it.iterator(it.async([1, 2, 3])))
expectType<Promise<IteratorResult<number, any>>>(a1)

const s2 = it.nextValue(it.iterator(['f', 'b']))
expectType<string>(s2)
const a2 = it.nextValue(it.iterator(it.async(['f', 'b'])))
expectType<Promise<string>>(a2)
