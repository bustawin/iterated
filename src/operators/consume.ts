import { AIt, AnyIt, It } from '@src'
import { chooseFunc, iterator, next } from '../iterators'

export function consume<Iter extends AnyIt<unknown>>(iter: Iter) {
  return chooseFunc(iter, _consume, _aConsume)
}

function _consume<V>(iter: It<V>): void {
  const it = iterator(iter)
  let item = next(it)

  while (!item.done) item = next(it)
}

async function _aConsume<V>(iter: AIt<V>): Promise<void> {
  const it = iterator(iter)
  let item = await next(it)

  while (!item.done) item = await next(it)
}
