import it from '@src'
import { NoValueToGet } from '../../../src/base'

describe('reduce', () => {
  describe('When passing a sync iterable', () => {
    test('applies function of two arguments cumulatively to the items of iterable', () => {
      const result = it.reduce(it.range(4), (num, acc) => num + acc)
      expect(result).toEqual(6)
    })

    test("Throws NoValueToGet when there's no value", () => {
      expect(() => it.reduce([], it.identity)).toThrow(NoValueToGet)
    })

    test("Returns the first element when there's only a single value and no initializer", () => {
      const result = it.reduce([1], (x, y) => x + y)
      expect(result).toEqual(1)
    })

    test('applies function of tow arguments cumulatively to the items of iterable starting with an initializer', () => {
      const result = it.reduce([1, 2], (x, y) => `${x} + ${y}`, '0')
      expect(result).toEqual('0 + 1 + 2')
    })

    test('works with pipe', () => {
      const result = it.pipe(
        [1, 2, 3],
        it.reduce((a, b) => `${a}${b}`, '0'),
      )
      expect(result).toEqual('0123')
    })
  })

  describe('When passing an async iterable', () => {
    test('applies function of two arguments cumulatively to the items of iterable', async () => {
      const result = await it.reduce(it.async(it.range(4)), (num, acc) => num + acc)
      expect(result).toEqual(6)
    })

    test("Throws NoValueToGet when there's no value", async () => {
      expect(async () => await it.reduce(it.async([]), it.identity)).rejects.toThrow(
        NoValueToGet,
      )
    })

    test("Returns the first element when there's only a single value and no initializer", async () => {
      const result = await it.reduce(it.async([1]), (x, y) => x + y)
      expect(result).toEqual(1)
    })

    test('applies function of tow arguments cumulatively to the items of iterable starting with an initializer', async () => {
      const result = await it.reduce(it.async([1, 2]), (x, y) => `${x} + ${y}`, '0')
      expect(result).toEqual('0 + 1 + 2')
    })

    test('works with pipe', async () => {
      const result = await it.pipe(
        [1, 2, 3],
        it.async,
        it.reduce((a, b) => `${a}${b}`, '0'),
      )
      expect(result).toEqual('0123')
    })
  })
})
