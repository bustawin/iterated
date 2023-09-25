import { filter } from './filter'
import { It, notDefined, NotFound } from '../base'
import { iterator, next } from '../iterators'
import { toPipe } from '../pipe'

export function find<IterValue, T = IterValue>(
  iter: It<IterValue>,
  func: IterValue | ((val: IterValue) => boolean),
  def: T | typeof notDefined = notDefined,
): IterValue | T {
  const result = next(iterator(filter(iter, func)))
  if (result.done) {
    if (def !== notDefined) {
      return def
    }

    throw new NotFound(func, iter)
  }

  return result.value
}

find.p = toPipe(find)
