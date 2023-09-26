/* eslint-disable */
import it from '@src'

describe('iter', () => {
  describe('map', () => {
    test('Iterates through values', () => {
      const r = it.map([1, 2, 3, 4], (x) => x + 1)
      expect(it.array(r)).toEqual([2, 3, 4, 5])
    })
  })

  describe('Group', () => {
    test('Groups', () => {
      const input = 'AAAABBBCCD'
      const grouped = it.Map([
        ['A', ['A', 'A', 'A', 'A']],
        ['B', ['B', 'B', 'B']],
        ['C', ['C', 'C']],
        ['D', ['D']],
      ])

      const r = it.group(input)
      expect(r).toEqual(grouped)
    })
  })
})
