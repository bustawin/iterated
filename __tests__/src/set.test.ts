import it from '@src'

describe('set', () => {
  describe('When passing a sync iterable', () => {
    test('Returns a set', () => {
      const r = it.set('foo')
      expect(r).toEqual(new Set('foo'))
    })
  })
  describe('When passing an async iterable', () => {
    test('Returns a set within a promise', async () => {
      const r = await it.set(it.async([1, 2, 3]))
      expect(r).toEqual(new Set([1, 2, 3]))
    })
  })
  describe('When no passing anything', () => {
    test('Returns an empty set', () => {
      const r = it.set()
      expect(r).toEqual(new Set())
    })
  })
})
