import it from '@src'

describe('range function tests', () => {
  test('range with stop', () => {
    const result = it.range(5)
    expect(result).toIterEq([0, 1, 2, 3, 4])
  })

  test('range with start and stop', () => {
    const result = it.range(3, 7)
    expect(result).toIterEq([3, 4, 5, 6])
  })

  test('range with start, stop, and step', () => {
    const result = it.range(2, 8, 2)
    expect(result).toIterEq([2, 4, 6])
  })
})
