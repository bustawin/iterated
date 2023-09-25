import it from '@src'

describe('array', () => {
  describe('When passing a sync iterable', () => {
    test('Returns an array', () => {
      const r = it.array('foo')
      expect(r).toEqual(['f', 'o', 'o'])
    })
  })
  describe('When passing an async iterable', () => {
    test('Returns an array within a promise', async () => {
      const r = await it.array(it.async([1, 2, 3]))
      expect(r).toEqual([1, 2, 3])
    })
  })
  describe('When no passing anything', () => {
    test('Returns an empty array', () => {
      const r = it.array()
      expect(r).toEqual([])
    })
  })
})
