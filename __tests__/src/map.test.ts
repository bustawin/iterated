import it from '@src'

const newMap = () =>
  it.m.map([
    [1, 'a'],
    [2, 'b'],
    [3, 'c'],
  ])
describe('map', () => {
  describe('setDefault', () => {
    describe('When the key is in the map', () => {
      let r: ReturnType<typeof it.m.setDefault>
      let map: ReturnType<typeof newMap>
      beforeAll(() => {
        map = newMap()
        r = it.m.setDefault(map, 2, null)
      })
      test('Return its value', () => {
        expect(r).toEqual('b')
      })
      test('Keeps the original map intact', () => {
        expect(map).toEqual(newMap())
      })
    })
    describe('When the key is not in the map', () => {
      let r: ReturnType<typeof it.m.setDefault>
      let map: ReturnType<typeof newMap>
      beforeAll(() => {
        map = newMap()
        r = it.m.setDefault(map, -1, 'z')
      })

      test('Insert key with a value of default', () => {
        expect(map).not.toEqual(newMap())
        expect(map.get(-1)).toEqual('z')
      })
      test('return default', () => {
        expect(r).toEqual('z')
      })
    })
  })
})
