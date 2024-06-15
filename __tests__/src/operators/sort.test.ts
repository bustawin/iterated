import it from '@src'

describe('size', () => {
  describe('When passing a sync iterable', () => {
    test('Sorts the elements', () => {
      const result = it.sort([4, 7, 1, 9], (a, b) => a - b)
      expect(result).toEqual([1, 4, 7, 9])
    })

    test('Sorts nested elements', () => {
      const result = it.sort(
        [
          { foo: 1, bar: 2 },
          {
            foo: 0,
            bar: 4,
          },
        ],
        (a, b) => a.foo - b.foo,
      )
      expect(result).toEqual([
        { bar: 4, foo: 0 },
        { bar: 2, foo: 1 },
      ])
    })
  })

  describe('When passing an async iterable', () => {
    test('Sorts the elements', async () => {
      const result = await it.sort([4, 7, 1, 9], (a, b) => a - b)
      expect(result).toEqual([1, 4, 7, 9])
    })

    test('Sorts nested elements', async () => {
      const result = await it.sort(
        [
          { foo: 1, bar: 2 },
          {
            foo: 0,
            bar: 4,
          },
        ],
        (a, b) => a.foo - b.foo,
      )
      expect(result).toEqual([
        { bar: 4, foo: 0 },
        { bar: 2, foo: 1 },
      ])
    })
  })
})
