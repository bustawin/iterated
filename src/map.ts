/**
 * If key is in the map, return its value.
 * If not, insert key with a value of default and return default.
 *
 * @mutates map
 */
export function setDefault<K, V>(map: Map<K, V>, key: K, def: V): V {
  if (!map.has(key)) map.set(key, def)
  return map.get(key)!
}

export function map<K, V>(iter: Iterable<[K, V]>): Map<K, V> {
  return new Map(iter)
}
