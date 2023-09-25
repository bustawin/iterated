import * as array from './array'
import * as iter from './iterators'
import * as map from './map'
import op from './operators'
import pipe, * as pip from './pipe'
import * as base from './base'
import * as set from './set'

export { It, AIt, AnyIt, rArray, ConditionalIter, AIterVal } from './base'

const mod = {
  a: array,
  m: map,
  s: set,
  pipe,
  ...pip,
  ...base,
  ...op,
  ...iter,
}

export default mod
