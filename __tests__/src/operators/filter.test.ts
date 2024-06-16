import it from '@src'

describe('filter', () => {
  describe('When passing a sync iterable', () => {
    test('filters based on a function', () => {
      const result = it.filter(it.range(6), (num) => num > 3)
      expect(it.array(result)).toEqual([4, 5])
    })

    test('filters based on a value', () => {
      const result = it.filter([1, 1, 2, 3, 4, 5, 4], 4)
      expect(it.array(result)).toEqual([4, 4])
    })

    test('returns an empty iterator when nothing matches', () => {
      const result = it.filter(it.range(2), 9)
      expect(it.array(result)).toEqual([])
    })
    test('returns empty when passed empty', () => {
      const result = it.pipe('', it.filter('9'), it.array)
      expect(result).toEqual([])
    })
  })
  describe('When passing an async iterable', () => {
    test('filters based on a function', async () => {
      const result = await it.pipe(
        it.range(6),
        it.async,
        it.filter((num) => num > 3),
        it.array,
      )
      expect(result).toEqual([4, 5])
    })

    test('filters based on a value', async () => {
      const result = await it.pipe(
        [1, 1, 2, 3, 4, 5, 4],
        it.async,
        it.filter(4),
        it.array,
      )
      expect(result).toEqual([4, 4])
    })

    test('returns an empty iterator when nothing matches', async () => {
      const result = await it.pipe(it.range(2), it.async, it.filter(9), it.array)
      expect(result).toEqual([])
    })

    test('returns empty when passed empty', async () => {
      const result = await it.pipe('', it.async, it.filter('9'), it.array)
      expect(result).toEqual([])
    })
  })
})
