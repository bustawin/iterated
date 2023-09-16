import * as array from './array'
import * as iter from './iterators'
import * as map from './map'
import op from './operators'
import pipe, * as pip from './pipe'
import * as utils from './utils'
import * as set from './set'

const mod = {
  a: array,
  m: map,
  s: set,
  pipe,
  ...pip,
  ...utils,
  ...op,
  ...iter,
}

export default mod
