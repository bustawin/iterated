import it from '@src'

describe('consume', () => {
  describe('When passing a sync iterable', () => {
    test('Consumes the iterable', () => {
      const iterable = it.range(5)
      it.consume(iterable)
      const result = it.next(it.iterator(iterable))
      expect(result.done).toEqual(true)
    })
  })
  describe('When passing an async iterable', () => {
    test('Consumes the iterable', async () => {
      const iterable = it.async(it.range(5))
      await it.consume(iterable)
      const result = await it.next(it.iterator(iterable))
      expect(result.done).toEqual(true)
    })
  })
})
