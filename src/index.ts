import array from './array'
import * as iter from './iterators'
import map from './map'
import op from './operators'
import pipe, * as pip from './pipe'
import * as base from './base'
import set from './set'

export { It, AIt, AnyIt, AnyItV } from './base'

const mod = {
  array,
  Map: map,
  set,
  pipe,
  ...pip,
  ...base,
  await: base.await_,
  ...op,
  ...iter,
}

export default mod
