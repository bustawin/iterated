import { expectError, expectType } from 'tsd-lite'
import it from '@src'

/* Calling the function */
// Ensure func is from the same type as iter
expectError(it.find(it.range(1), '5'))
// Or a function accepting iter val
expectError(it.find(it.range(1), (x: string) => true))

const a = it.find('hello', 'h')
expectType<string>(a)

const b = it.find('hello', '9', 'k')
expectType<string>(b)

const c = it.find('hello', 'x', 8)
expectType<string | 8>(c)

const d = it.find.p(5)([1, 2, 3])
expectType<number>(d)

const e = it.find(it.range(5), (x) => x > 10, undefined)
expectType<number | undefined>(e)

const f = it.pipe(it.range(5), it.find.p(9, null))
expectType<number | null>(f)
