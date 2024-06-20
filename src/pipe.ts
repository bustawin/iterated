import { AnyIt } from './base'

/**
 * Curries a function so it can be used in a pipe. Functions must have
 * an iterable as a first argument.
 */
export function toPipe<It extends AnyIt<unknown>, P extends unknown[], R>(
  fn: (iter: It, ...args: P) => R,
) {
  return (...rest: P) =>
    (iter: It) =>
      fn(iter, ...rest)
}

/**
 * Creates a pipeline of functions, where the output of each function is
 * passed as input to the next.
 * The pipe starts by receiving an iterable as the first argument.
 *
 * @example
 * // Returns an Iterable<array> representing ['0', '1', '2', '3', '4']
 * const a = it.pipe(
 *   it.range(5),
 *   it.map((x) => x.toString()),
 * )
 *
 * @param value - An iterable or AsyncIterable, like an Array or String.
 * @param fns - Functions to be executed in sequence.
 */
export default function pipe<It extends AnyIt<unknown>, RA>(
  value: It,
  a: (value: It) => RA,
): RA
export default function pipe<It extends AnyIt<unknown>, RA, RB>(
  value: It,
  a: (value: It) => RA,
  b: (value: RA) => RB,
): RB
export default function pipe<It extends AnyIt<unknown>, RA, RB, RC>(
  value: It,
  a: (value: It) => RA,
  b: (value: RA) => RB,
  c: (value: RB) => RC,
): RC
export default function pipe<It extends AnyIt<unknown>, RA, RB, RC, RD>(
  value: It,
  a: (value: It) => RA,
  b: (value: RA) => RB,
  c: (value: RB) => RC,
  d: (value: RC) => RD,
): RD
export default function pipe<It extends AnyIt<unknown>, RA, RB, RC, RD, RE>(
  value: It,
  a: (value: It) => RA,
  b: (value: RA) => RB,
  c: (value: RB) => RC,
  d: (value: RC) => RD,
  e: (value: RD) => RE,
): RE
export default function pipe<It extends AnyIt<unknown>, RA, RB, RC, RD, RE, RF>(
  value: It,
  a: (value: It) => RA,
  b: (value: RA) => RB,
  c: (value: RB) => RC,
  d: (value: RC) => RD,
  e: (value: RD) => RE,
  f: (value: RE) => RF,
): RF
export default function pipe<It extends AnyIt<unknown>, RA, RB, RC, RD, RE, RF, RG>(
  value: It,
  a: (value: It) => RA,
  b: (value: RA) => RB,
  c: (value: RB) => RC,
  d: (value: RC) => RD,
  e: (value: RD) => RE,
  f: (value: RE) => RF,
  g: (value: RF) => RG,
): RG
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default function pipe(value, ...fns) {
  return fns.reduce((previousValue, fn) => fn(previousValue), value)
}
