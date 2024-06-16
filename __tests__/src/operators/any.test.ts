import it from '@src'

const iterable = [1, 22]
const matchingCondition = (x: number) => x < 10
const nonMatchingCondition = (x: number) => x > 100

describe('any', () => {
  describe('When passing a sync iterable', () => {
    describe('When the condition matches', () => {
      test('Returns true', () => {
        const result = it.any(iterable, matchingCondition)
        expect(result).toEqual(true)
      })
    })
    describe('When the condition does not match', () => {
      test('Returns false', () => {
        const result = it.any(iterable, nonMatchingCondition)
        expect(result).toBe(false)
      })
    })
    describe('When running in a pipe', () => {
      test('Returns correctly', () => {
        const result = it.pipe(iterable, it.any(3))
        expect(result).toBe(false)
      })
    })
  })
  describe('when passing an async iterable', () => {
    describe('When the condition matches', () => {
      test('Returns true', async () => {
        const result = await it.any(it.async(iterable), matchingCondition)
        expect(result).toBe(true)
      })
    })
    describe('When the condition does not match', () => {
      test('Returns false', async () => {
        const result = await it.any(it.async(iterable), nonMatchingCondition)
        expect(result).toBe(false)
      })
    })
  })
  describe('When passing a value', () => {
    describe('When the value matches', () => {
      test('Returns true', () => {
        const result = it.any([1, 1, 1], 1)
        expect(result).toBe(true)
      })
    })
    describe('When the value does not match', () => {
      test('Returns false', () => {
        const result = it.any([1, 1, 1], 2)
        expect(result).toBe(false)
      })
    })
  })
})
