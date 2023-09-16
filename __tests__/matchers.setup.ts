import {expect} from '@jest/globals'

import {It} from '@src/utils'
import it from '@src'

const toIterEq: MatcherFunction<[expected: It<unknown>]> = function (actual, expected) {
  expect(it.a.array(actual)).toEqual(expected)
  return {
    pass: true,
    message: () => '',
  }
}

const customMatchers = {
  toIterEq,
}

expect.extend(customMatchers)
