import it from '@src'

describe('pairs', () => {
  describe('When passing a sync iterable', () => {
    test('pairs values', () => {
      const result = it.pairs(it.range(4))
      expect(it.array(result)).toEqual([
        [0, 1],
        [1, 2],
        [2, 3],
      ])
    })

    test('returns no elements when a single element is passed-in', () => {
      const result = it.pairs([1])
      expect(it.array(result)).toEqual([])
    })

    test('returns an empty iterator when passed-in empty iterable', () => {
      const result = it.pairs([])
      expect(it.array(result)).toEqual([])
    })
  })
  describe('When passing an async iterable', () => {
    test('pairs values', async () => {
      const result = await it.pipe(
        it.range(6),
        it.async,
        it.filter((num) => num > 3),
        it.array,
      )
      expect(result).toEqual([4, 5])
    })

    test('returns a single element when a single element is passed-in', async () => {
      const result = it.pairs(it.async([1]))
      expect(await it.array(result)).toEqual([])
    })

    test('returns an empty iterator when passed-in empty iterable', async () => {
      const result = await it.pairs(it.async([]))
      expect(await it.array(result)).toEqual([])
    })
  })
})
