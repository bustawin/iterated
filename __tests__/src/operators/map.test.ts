import it from '@src'

describe('map', () => {
  describe('When passing a sync iterable', () => {
    test('applies the function to every element of the iterable', () => {
      const result = it.map(it.range(3), (num) => num * 2)
      expect(it.array(result)).toEqual([0, 2, 4])
    })

    test('Return empty when passed empty', () => {
      const result = it.map([], it.identity)
      expect(it.array(result)).toEqual([])
    })
  })

  describe('When passing an async iterable', () => {
    test('maps async', async () => {
      const result = it.map(it.async(it.range(3)), (num) => num * 2)
      await expect(it.array(result)).resolves.toEqual([0, 2, 4])
    })
  })
})
