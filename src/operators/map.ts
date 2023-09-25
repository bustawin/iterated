import { AIt, AIterVal, AnyIt, ConditionalIter, It, ValFunc } from '../base'
import { chooseFunc } from '../iterators'
import { toPipe } from '../pipe'

function* _map<IterValue, R>(iter: It<IterValue>, func: ValFunc<IterValue, R>): It<R> {
  for (const v of iter) {
    yield func(v)
  }
}

async function* _amap<IterValue, R>(
  iter: AIt<IterValue>,
  func: ValFunc<IterValue, R>,
): AIt<R> {
  for await (const v of iter) {
    yield func(v)
  }
}

export function map<Iter extends AnyIt<unknown>, R>(
  iter: Iter,
  func: ValFunc<AIterVal<Iter>, R>,
): ConditionalIter<Iter, R> {
  return chooseFunc(iter, _map, _amap, func)
}

map.p = toPipe(map)
