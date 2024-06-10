import it from '@src'
import { NoValueToGet } from '../../src/base'

describe('iterators', () => {
  describe('iterator', () => {
    describe('when passing a sync iterable', () => {
      test('returns an iterator', () => {
        const r = it.iterator([1, 2, 3])
        expect(r.constructor.name).toEqual('Iterator')
      })
    })
    describe('when passing an async iterable', () => {
      test('returns an async iterator', async () => {
        const r = it.iterator(it.async([1, 2, 3]))
        expect(
          Object.getPrototypeOf(Object.getPrototypeOf(r))[Symbol.toStringTag],
        ).toEqual('AsyncGenerator')
      })
    })
  })
  describe('next', () => {
    describe('when passing a sync iterable', () => {
      test('returns the IteratorResult', () => {
        const r = it.next(it.iterator([1, 2, 3]))
        expect(r).toEqual({ value: 1, done: false })
      })
    })
    describe('when passing an async iterable', () => {
      test('returns the AsyncIteratorResult', async () => {
        const r = await it.next(it.iterator(it.async([1, 2, 3])))
        expect(r).toEqual({ value: 1, done: false })
      })
    })
  })
  describe('nextValue', () => {
    describe('when passing a sync iterable', () => {
      test('returns the value', () => {
        const r = it.nextValue(it.iterator([1, 2, 3]))
        expect(r).toEqual(1)
      })
      test("returns an exception when there's no value", () => {
        const iterator = it.iterator([1])
        it.nextValue(iterator)
        expect(() => it.nextValue(iterator)).toThrowError(NoValueToGet)
      })
    })
    describe('when passing an async iterable', () => {
      test('returns the value', async () => {
        const r = await it.nextValue(it.iterator(it.async([1, 2, 3])))
        expect(r).toEqual(1)
      })
      test("returns an exception when there's no value", async () => {
        const getter = async () => await it.nextValue(it.iterator(it.async([])))
        expect(getter).rejects.toThrow(NoValueToGet)
      })
    })
  })
})
