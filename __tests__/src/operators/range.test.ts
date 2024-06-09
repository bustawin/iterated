import it from '@src'

describe('range function tests', () => {
  test('range with stop', () => {
    const result = it.range(5)
    expect(it.array(result)).toEqual([0, 1, 2, 3, 4])
  })

  test('range with start and stop', () => {
    const result = it.range(3, 7)
    expect(it.array(result)).toEqual([3, 4, 5, 6])
  })

  test('range with start, stop, and step', () => {
    const result = it.range(2, 8, 2)
    expect(it.array(result)).toEqual([2, 4, 6])
  })

  test('range when going backwards', () => {
    const result = it.range(5, -2, -1)
    expect(it.array(result)).toEqual([5, 4, 3, 2, 1, 0, -1])
  })
})
