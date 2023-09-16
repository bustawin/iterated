import {AIt, It, rArray} from "./utils";

export function array<IterValue>(iter: It<IterValue>): rArray<IterValue> {
  return [...iter]
}

export async function aArray<IterValue>(
  iter: AIt<IterValue>,
): Promise<rArray<IterValue>> {
  const result: IterValue[] = []
  for await (const value of iter) {
    result.push(value)
  }
  return result
}
