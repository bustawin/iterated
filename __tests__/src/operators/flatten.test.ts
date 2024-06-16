import it from '@src'

describe('flatten', () => {
  describe('When passing a sync iterable', () => {
    test('flattens', () => {
      const result = it.flatten([
        [1, 2, 3],
        [4, 5, 6],
      ])
      expect(it.array(result)).toEqual([1, 2, 3, 4, 5, 6])
    })
    test('returns empty when passed empty', () => {
      const result = it.flatten([])
      expect(it.array(result)).toEqual([])
    })
    test('returns empty when passed nested empty', () => {
      const result = it.flatten([[]])
      expect(it.array(result)).toEqual([])
    })
  })
  describe('When passing an async iterable', () => {
    test('flattens', async () => {
      const result = await it.pipe(
        it.range(6),
        it.async,
        it.map((num) => [num]),
        it.flatten,
        it.array,
      )
      expect(result).toEqual([0, 1, 2, 3, 4, 5])
    })

    test('returns empty when passed empty', async () => {
      const result = await it.pipe([[]], it.async, it.flatten, it.array)
      expect(result).toEqual([])
    })
  })
})
