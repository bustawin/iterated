import { expectError, expectType } from 'tsd-lite'
import it from '@src'

/* Calling the function */
// Ensure func is from the same type as iter
// Or a function accepting iter val
expectError(it.find(it.range(1), (x: string) => true))

const s1 = it.find(it.range(4), (x) => x == 4, 3)
expectType<number>(s1)

const s2 = it.find('hello', (x) => x == '9', 'k')
expectType<string>(s2)

const s3 = it.find('hello', (x) => x == 'h', 8)
expectType<string | 8>(s3)

const s4 = it.find(it.range(5), (x) => x > 10, undefined)
expectType<number | undefined>(s4)

const p1 = it.pipe(
  it.range(5),
  it.find.p((x) => x == 4, null),
)
expectType<number | null>(p1)

const a1 = it.find(it.async('123'), (x) => x == '1')
expectType<Promise<string>>(a1)
