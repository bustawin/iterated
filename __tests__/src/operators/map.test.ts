import it from '@src'

describe('map', () => {
  test('maps', () => {
    const result = it.map(it.range(3), (num) => num * 2)
    expect(result).toIterEq([0, 2, 4])
  })

  test('maps async', async () => {
    const result = it.map(it.async(it.range(3)), (num) => num * 2)
    await expect(it.a.aArray(result)).resolves.toIterEq([0, 2, 4])
  })
})
