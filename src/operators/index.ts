import * as map from './map'
import * as filter from './filter'
import * as find from './find'
import * as any from './any'
import * as reduce from './reduce'
import * as range from './range'
import * as count from './count'
import * as size from './size'
import * as sort from './sort'
import * as consume from './consume'
import * as tap from './tap'
import * as pairs from './pairs'
import * as group from './group'
import * as flatten from './flatten'

const operators = {
  ...consume,
  ...count,
  ...filter,
  ...find,
  ...flatten,
  ...group,
  ...any,
  ...map,
  ...pairs,
  ...range,
  ...reduce,
  ...size,
  ...sort,
  ...tap,
}
export default operators
