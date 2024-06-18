/* eslint-disable */
import it from '@src'

describe('iter', () => {
  describe('async', () => {
    test('Iterates through values', async () => {
      const r = await it.pipe(it.range(2), it.async, it.array)

      expect(r).toEqual([0, 1])
    })
  })

  describe('await', () => {
    test('awaits', async () => {
      const r = await it.pipe([Promise.resolve(1)], it.await, it.array)

      expect(r).toEqual([1])
    })
  })
})
