import { chooseFunc } from '@src/iterators'
import { AIt, AIterVal, AnyIt, It } from '@src/base'

/**
 * If key is in the map, return its value.
 * If not, insert key with a value of default and return default.
 *
 * @mutates map
 */
function setDefault<K, V>(map: Map<K, V>, key: K, def: V): V {
  if (!map.has(key)) map.set(key, def)
  return map.get(key)!
}

async function _aMap<K, V>(iter: AIt<[K, V]>): Promise<Map<K, V>> {
  const result: Map<K, V> = new Map()
  for await (const [key, value] of iter) {
    result.set(key, value)
  }
  return result
}

function _map<K, V>(iter: Iterable<[K, V]>): Map<K, V> {
  return new Map(iter)
}

export default function map<K, V, Iter extends AnyIt<[K, V]> = It<[K, V]>>(
  iter: Iter = [] as never,
): Iter extends It<[unknown, unknown]>
  ? Map<AIterVal<Iter>[0], AIterVal<Iter>[1]>
  : Promise<Map<AIterVal<Iter>[0], AIterVal<Iter>[1]>> {
  // @ts-ignore: typescript can't infer correctly this
  return chooseFunc(iter, _map, _aMap)
}

map.setDefault = setDefault
