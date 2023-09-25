import it from '@src'

describe('filter', () => {
  test('filters based on a function', () => {
    const result = it.filter(it.range(6), (num) => num > 3)
    expect(it.array(result)).toEqual([4, 5])
  })

  test('filters based on a value', () => {
    const result = it.filter([1, 1, 2, 3, 4, 5, 4], 4)
    expect(it.array(result)).toEqual([4, 4])
  })

  test('returns an empty iterator when nothing matches', () => {
    const result = it.filter(it.range(2), 9)
    expect(it.array(result)).toEqual([])
  })
})
