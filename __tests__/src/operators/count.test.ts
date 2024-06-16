import it from '@src'

const input = 'AAAABBBCCD'
const expectedResult = it.Map([
  ['A', 4],
  ['B', 3],
  ['C', 2],
  ['D', 1],
])
const propertyResult = it.Map([['A', input.length]])

describe('count', () => {
  describe('When passing a sync iterable', () => {
    describe('When no passing a property', () => {
      test('Returns a counter using identity', () => {
        const result = it.count(input)
        expect(result).toEqual(expectedResult)
      })
    })
    describe('When passing a property', () => {
      test('Returns a proper counter', () => {
        const result = it.count(input, () => 'A')
        expect(result).toEqual(propertyResult)
      })
    })
    describe('When passing an empty input', () => {
      test('Returns an empty counter', () => {
        const result = it.count([])
        expect(result).toEqual(it.Map([]))
      })
    })
    describe('When running in a pipe', () => {
      test('Returns a counter', () => {
        const result = it.pipe(input, it.count())
        expect(result).toEqual(expectedResult)
      })
    })
  })
  describe('when passing an async iterable', () => {
    describe('When no passing a property', () => {
      test('Returns a counter using identity', async () => {
        const result = await it.count(it.async(input))
        expect(result).toEqual(expectedResult)
      })
    })
    describe('When passing a property', () => {
      test('Returns a proper counter', async () => {
        const result = await it.count(it.async(input), () => 'A')
        expect(result).toEqual(propertyResult)
      })
    })
    describe('When passing an empty input', () => {
      test('Returns an empty counter', async () => {
        const result = await it.count(it.async(''))
        expect(result).toEqual(it.Map([]))
      })
    })
  })
})
