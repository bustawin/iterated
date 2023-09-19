import { AnyIt } from './utils'

export function toPipe<It extends AnyIt<unknown>, P extends unknown[], R>(
  fn: (iter: It, ...args: P) => R,
) {
  return (...rest: P) =>
    (iter: It) =>
      fn(iter, ...rest)
}

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
