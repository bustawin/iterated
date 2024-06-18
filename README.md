# Iterated

Functional methods (e.g. `pipe`, `map`, `group`) to work with Javascript Iterables—with prime
typing support.

```shell
npm install iterated
```

```typescript
import it from 'iterated'

it.map([1, 2, 3], x => x)
it.count('AAAABBBCCD')
```

We can work with `pipes` of data, processing sync and async iterables
transparently.

```typescript
const result = it.pipe(
  [
    { foo: 1, baz: 'x' },
    { foo: 2, baz: 'x' },
  ],
  it.map((item) => item['foo'])
)
```

In the case above, Typescript inferences that `result` is an `Iterator<number>`.

`AsyncIterator` is amazing when handling promises:

```typescript
const result = it.pipe(
  [true, false, true],
  it.map((x) => Promise.resolve({ success: x })),  // eg. fetch something from a server
  it.await, // await each promise, returning an async iterator
  it.filter(({ success }) => success), // now filter function doesn't have to handle any promise
)
```

In the case above, Typescript inferences that `result` is of
type `AsyncIterator<{success: boolean}>`. If we want to enforce getting an array...

```typescript
const myArray = await it.pipe(
  result,
  it.array
)
```

In the case above, Typescript inferences that `myArray` is of type `{success: boolean}[]`.

Working with iterators means that:

* The library is speedy and introduces little overhead (that's because we iterate
  with [`for ... of`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of)).
* We only iterate once.
* RAM consumption is low, as we don't compute intermediate data structures (unless required by the
  algorithm).
* We are compatible with any other library accepting the iterator protocol.
* We support arrays, strings, Maps, Sets...
* Makes extending this library easy and in a decoupled way.

Extending the library is as follows:

```typescript
function doStuffWithDevices(devices: Iterable<Device>): Iterable<Device> {
}

const result = it.pipe([{ id: 'device-1' }], doStuffWithDevices)
```

Functions with multiple arguments require adaptation to work in a pipe (i.e. curry).
You can achieve it simply by doing:

```typescript
import { toPipe } from 'iterated'

function doStuffWithDevices(devices: Iterable<Device>, aParam: () => number): Iterable<Device> {
}

const doStuffWithDevicesPipe = toPipe(doStuffWithDevices)

const result = it.pipe([{ id: 'device-1' }], doStuffWithDevicesPipe(() => 5))
```

Checkout how we curry in our code for more intricate examples.

## Reference

* [all](https://bustawin.github.io/iterated/functions/all)
* [any](https://bustawin.github.io/iterated/functions/any)
* [consume](https://bustawin.github.io/iterated/functions/consume)
* [count](https://bustawin.github.io/iterated/functions/count)
* [filter](https://bustawin.github.io/iterated/functions/filter)
* [find](https://bustawin.github.io/iterated/functions/find)
* [flatten](https://bustawin.github.io/iterated/functions/flatten)
* [group](https://bustawin.github.io/iterated/functions/group)
* [map](https://bustawin.github.io/iterated/functions/map)
* [pairs](https://bustawin.github.io/iterated/functions/pairs)
* [range](https://bustawin.github.io/iterated/functions/range)
* [reduce](https://bustawin.github.io/iterated/functions/reduce)
* [size](https://bustawin.github.io/iterated/functions/size)
* [sort](https://bustawin.github.io/iterated/functions/sort)
* [pipe](https://bustawin.github.io/iterated/functions/pipe)
* [toPipe](https://bustawin.github.io/iterated/functions/toPipe)
* [array](https://bustawin.github.io/iterated/functions/array)
* [Map](https://bustawin.github.io/iterated/functions/Map)

## Contributing

Fixes, improvements, and issues are welcomed.

We can add more functions (I am myself thinking of adding `tee` and `zip`), although I
wouldn't like to have an explosion of them, specially if there are easily composable.

Functions should allow currying and working with sync and async iterables transparently,
and have good Typescript support.

### Publishing

In order to publish this repo:

```shell
1. Ensure tests are green `npm test && npm run test:type`
2. Build the project `npm run build`
3. Publish `npm publish`
```

## License

This work is licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).