import it from '@src'

describe('map', () => {
  test('maps', () => {
    const result = it.map(it.range(3), (num) => num * 2)
    expect(it.a.array(result)).toEqual([0, 2, 4])
  })

  test('maps async', async () => {
    const result = it.map(it.async(it.range(3)), (num) => num * 2)
    await expect(it.a.array(result)).resolves.toEqual([0, 2, 4])
  })
})