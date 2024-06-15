import it from '@src'

describe('size', () => {
  describe('When passing a sync iterable', () => {
    test('Computes the size', () => {
      const result = it.size(it.range(4))
      expect(result).toEqual(4)
    })

    test('Computes the size when there is no value', () => {
      const result = it.size([])
      expect(result).toEqual(0)
    })
  })

  describe('When passing an async iterable', () => {
    test('Computes the size', async () => {
      const result = await it.size(it.async(it.range(4)))
      expect(result).toEqual(4)
    })

    test('Computes the size when there is no value', async () => {
      const result = await it.size(it.async([]))
      expect(result).toEqual(0)
    })
  })
})
