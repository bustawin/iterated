import {It, notDefined} from "../utils";
import {nextValue} from "../iterators";
import {toPipe} from "../pipe";

export function reduce<IterValue>(
  iter: It<IterValue>,
  func: (previousValue: IterValue, currentValue: IterValue) => IterValue,
  initialValue: IterValue | typeof notDefined,
): IterValue
export function reduce<IterValue, U>(
  iter: It<IterValue>,
  func: (previousValue: U, currentValue: IterValue) => U,
  initialValue: U,
): U
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export function reduce(iter, func, initialValue?) {
  let previousValue = initialValue === notDefined ? nextValue(iter) : initialValue
  for (const val of iter) {
    previousValue = func(previousValue, val)
  }
  return previousValue
}

reduce.p = toPipe(reduce)
