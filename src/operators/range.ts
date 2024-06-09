import { It } from '@src/base'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export function range(stop: number): It<number>
export function range(start: number, stop: number, step?: number): It<number>
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export function* range(a, b, step = 1) {
  let start = 0
  let stop

  if (b === undefined) {
    stop = a
  } else {
    start = a
    stop = b
  }

  if (step > 0) {
    for (let i = start; i < stop; i += step) {
      yield i
    }
  } else if (step < 0) {
    for (let i = start; i > stop; i += step) {
      yield i
    }
  } else {
    throw new RangeError("step value can't be 0")
  }
}
