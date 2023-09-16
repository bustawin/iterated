import it from '@src'

describe('iter', () => {
  describe('map', () => {
    test('Iterates through values', () => {
      const r = it.map([1, 2, 3, 4], (x) => x + 1)
      expect(r).toIterEq([2, 3, 4, 5])
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
      expect(r).toIterEq(result)
    })
  })

  describe('includes', () => {
    test('any no val', () => {
      const input = 'AAAABBBCCD'

      const x = it.any(input, 55)

      const x = it.pipe(
        [1, 2, 3],
        it.map.p((x) => x.toString()),
        it.any.p((x) => x == '2'),
      )

      const x = it.pipe(
        [1, 2, 3],
        it.map.p((x) => x.toString()),
        it.filter.p('3'),
      )

      const r = it.count(input)
      expect(r).toIterEq(result)
    })
  })
})
