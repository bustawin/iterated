import it from '@src'

const newMap = () =>
  it.Map([
    [1, 'a'],
    [2, 'b'],
    [3, 'c'],
  ])
describe('map', () => {
  describe('setDefault', () => {
    describe('When the key is in the map', () => {
      let r: ReturnType<typeof it.Map.setDefault>
      let map: ReturnType<typeof newMap>
      beforeAll(() => {
        map = newMap()
      })
      test('Return its value', () => {
        r = it.Map.setDefault(map, 2, null)
        expect(r).toEqual('b')
      })

      test('Keeps the original map intact', () => {
        r = it.Map.setDefault(map, 2, null)
        expect(map).toEqual(newMap())
      })
    })
    describe('When the key is not in the map', () => {
      let r: ReturnType<typeof it.Map.setDefault>
      let map: ReturnType<typeof newMap>
      beforeAll(() => {
        map = newMap()
      })
      test('Insert key with a value of default', () => {
        r = it.Map.setDefault(map, -1, 'z')
        expect(map).not.toEqual(newMap())
        expect(map.get(-1)).toEqual('z')
      })
      test('return default', () => {
        r = it.Map.setDefault(map, -1, 'z')
        expect(r).toEqual('z')
      })
    })
  })
  describe('constructor', () => {
    describe('When passing a sync iterable', () => {
      test('Returns a map', () => {
        const r = it.Map([[1, 2]])
        expect(r).toEqual(new Map([[1, 2]]))
      })
    })
    describe('When passing an async iterable', () => {
      test('Returns a map within a promise', async () => {
        const r = await it.Map(it.async([[1, 2]]))
        expect(r).toEqual(new Map([[1, 2]]))
      })
    })
    describe('When no passing anything', () => {
      test('Returns an empty map', () => {
        const r = it.Map()
        expect(r).toEqual(new Map())
      })
    })
  })
})
