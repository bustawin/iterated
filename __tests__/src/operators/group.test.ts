import it from '@src'

describe('group', () => {
  describe('When passing a sync iterable', () => {
    test('groups based on a function', () => {
      const result = it.group(it.range(6), (num) => num < 3)

      expect(result).toEqual(
        it.Map([
          [true, [0, 1, 2]],
          [false, [3, 4, 5]],
        ]),
      )
    })

    test('groups objects based on a function', () => {
      const result = it.group(
        [
          { foo: 1, baz: 'x' },
          { foo: 2, baz: 'x' },
        ],
        (item) => item['foo'],
      )

      expect(result).toEqual(
        it.Map([
          [1, [{ foo: 1, baz: 'x' }]],
          [2, [{ foo: 2, baz: 'x' }]],
        ]),
      )
    })

    test('returns empty when passed empty', () => {
      const result = it.pipe('', it.group.p())
      expect(result).toEqual(it.Map())
    })

    test('returns the element unchanged when no key is passed', () => {
      const result = it.group(it.range(4))
      expect(result).toEqual(
        it.Map([
          [0, [0]],
          [1, [1]],
          [2, [2]],
          [3, [3]],
        ]),
      )
    })
  })
  describe('When passing an async iterable', () => {
    test('groups based on a function', async () => {
      const result = await it.pipe(
        [
          { foo: 1, bar: 2 },
          { foo: 1, bar: 3 },
          { foo: 2, bar: 4 },
        ],
        it.async,
        it.group.p((x) => x['foo']),
      )
      expect(result).toEqual(
        it.Map([
          [
            1,
            [
              { bar: 2, foo: 1 },
              { bar: 3, foo: 1 },
            ],
          ],
          [2, [{ bar: 4, foo: 2 }]],
        ]),
      )
    })
  })
})
