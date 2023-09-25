import it from '@src'

const iterable = [1, 2, 3, 4, 5]
const matchingCondition = (x: number) => x < 10
const nonMatchingCondition = (x: number) => x > 10

describe('all', () => {
  describe('When passing a sync iterable', () => {
    describe('When the condition matches', () => {
      test('Returns true', () => {
        const result = it.all(iterable, matchingCondition)
        expect(result).toEqual(true)
      })
    })
    describe('When the condition does not match', () => {
      test('Returns false', () => {
        const result = it.all(iterable, nonMatchingCondition)
        expect(result).toBe(false)
      })
    })
  })
  describe('when passing an async iterable', () => {
    describe('When the condition matches', () => {
      test('Returns true', async () => {
        const result = await it.all(it.async(iterable), matchingCondition)
        expect(result).toBe(true)
      })
    })
    describe('When the condition does not match', () => {
      test('Returns false', async () => {
        const result = await it.all(it.async(iterable), nonMatchingCondition)
        expect(result).toBe(false)
      })
    })
  })
  describe('When passing a value', () => {
    describe('When the value matches', () => {
      test('Returns true', () => {
        const result = it.all([1, 1, 1], 1)
        expect(result).toBe(true)
      })
    })
    describe('When the value does not match', () => {
      test('Returns false', () => {
        const result = it.all([1, 1, 1], 2)
        expect(result).toBe(false)
      })
    })
  })
})
