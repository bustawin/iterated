import { expectType } from 'tsd-lite'
import it from '@src'

const s1 = it.size(it.range(5))
expectType<number>(s1)

const s2 = it.size(it.async(''))
expectType<Promise<number>>(s2)
