import { filter } from './filter'
import { AIt, AnyIt, AnyItV, It, Matcher, notDefined, NotFound } from '../base'
import { chooseFunc, iterator, next } from '../iterators'
import { toPipe } from '../pipe'

export function find<Iter extends AnyIt<unknown>, V extends AnyItV<Iter>, D = V>(
  iter: Iter,
  condition: V | Matcher<V>,
  def: D | typeof notDefined = notDefined,
) {
  return chooseFunc(iter, _find, _aFind, condition, def)
}

find.p = toPipe(find)

function _find<V, D>(
  iter: It<V>,
  condition: V | Matcher<V>,
  def: D | typeof notDefined,
): D | V {
  const result = next(iterator(filter(iter, condition)))
  if (result.done) {
    if (def !== notDefined) {
      return def
    }

    throw new NotFound(condition, iter)
  }

  return result.value
}

async function _aFind<V, D>(
  iter: AIt<V>,
  condition: V | Matcher<V>,
  def: D | typeof notDefined,
): Promise<D | V> {
  const result = await next(iterator(filter(iter, condition)))
  if (result.done) {
    if (def !== notDefined) {
      return def
    }

    throw new NotFound(condition, iter)
  }

  return result.value
}
