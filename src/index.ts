import array from './array'
import * as iter from './iterators'
import map from './map'
import op from './operators'
import pipe, * as pip from './pipe'
import * as base from './base'
import set from './set'

export { It, AIt, AnyIt, AIterVal } from './base'

const mod = {
  array,
  Map: map,
  set,
  pipe,
  ...pip,
  ...base,
  ...op,
  ...iter,
}

export default mod
