/* eslint-disable */
import it from '@src'

describe('iter', () => {
  describe('map', () => {
    test('Iterates through values', () => {
      const r = it.map([1, 2, 3, 4], (x) => x + 1)
      expect(it.a.array(r)).toEqual([2, 3, 4, 5])
    })
  })

  describe('Group', () => {
    test('Groups', () => {
      const input = 'AAAABBBCCD'
      const grouped = it.m.map([
        ['A', ['A', 'A', 'A', 'A']],
        ['B', ['B', 'B', 'B']],
        ['C', ['C', 'C']],
        ['D', ['D']],
      ])

      const r = it.group(input)
      expect(r).toEqual(grouped)
    })
  })
  describe('count', () => {
    test('count', () => {
      const input = 'AAAABBBCCD'
      const result = it.m.map([
        ['A', 4],
        ['B', 3],
        ['C', 2],
        ['D', 1],
      ])

      const x = it.pipe(
        [1, 2, 3],
        it.map.p((x) => x.toString()),
        it.count.p(),
      )

      const r = it.count(input)
      expect(r).toEqual(result)
    })
  })
})
