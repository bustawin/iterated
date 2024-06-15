import { It } from '@src/base'

/**
 * Returns an iterable representing a sequence of numbers, from `start` to `stop`.
 *
 * This function can be called in three different ways:
 *
 * 1. Passing only a `stop` variable counts from zero until stop, in increments of 1.
 * 2. Passing a `start` and `stop` counts from start until stop, in increments of 1.
 * 3. Passing a `start`, `stop`, and `step` counts from `start` until `stop` in
 *   increments of `step`. `step` can be positive or negative.
 */
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
