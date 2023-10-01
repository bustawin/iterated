import { filter } from './filter'
import { AIt, AnyIt, It, AnyItV, Matcher, notDefined, NotFound } from '../base'
import { chooseFunc, iterator, next } from '../iterators'
import { toPipe } from '../pipe'

export function find<Iter extends AnyIt<V>, V = AnyItV<Iter>, D = V>(
  iter: Iter,
  condition: Matcher<V>,
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

function handleResult<V, D>(
  result: IteratorResult<V, unknown>,
  def: D | typeof notDefined,
  condition: unknown,
  iter: AnyIt<V>,
): D | V {
  if (result.done) {
    if (def !== notDefined) {
      return def
    }

    throw new NotFound(condition, iter)
  }

  return result.value
}
