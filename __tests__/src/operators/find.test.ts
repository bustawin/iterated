import it from '@src'

describe('find', () => {
  describe('When passing a sync iterable', () => {
    describe('When passing a function whose result exists in the iterable', () => {
      test('Returns the correct value', () => {
        const result = it.find([1, 2, 3], (x) => x == 1)
        expect(result).toEqual(1)
      })
    })
    describe('When passing a function whose result does not exist in the iterable', () => {
      describe('When def is not defined', () => {
        test('Throws an error', () => {
          expect(() => it.find('foo', (x) => x == 'l')).toThrow(it.NotFound)
        })
      })
      describe('When def is defined', () => {
        test('Returns def', () => {
          const result = it.find('foo', (x) => x == 'l', 4)
          expect(result).toEqual(4)
        })
      })
    })
  })
  describe('When passing an async iterable', () => {
    test('Works the same as with a sync iterable', async () => {
      const result = await it.find(it.async(it.range(4)), (x) => x == 2)
      expect(result).toEqual(2)
    })
  })
})
