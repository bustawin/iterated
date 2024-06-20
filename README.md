# Iterated

Functional methods (e.g. `map`, `group`, `pipe`) to work with
Javascript Iterables—such as String and Array—with prime typing support.

Although there are many libraries with a similar purpose (
e.g. [underscore](https://underscorejs.org),
[ramda](https://ramdajs.com), [iterate-iterator](https://www.npmjs.com/package/iterate-iterator),
[iterare](https://www.npmjs.com/package/iterare), [the new built-in methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator/map))
none matches all of the following:

* Great Typescript typing inference.
* `pipe` support with sensible currying.
* Uses the iterator protocol—`Iterator` and `AsyncIterator`—handling
  it transparently. This means that we support `String`, `Array`,
  `Map`, and `Set` consistently.
* Just easy to use.
* Extensible without coupling your code.

```shell
npm install iterated
```

Then, run it as follows:

```typescript
import it from 'iterated'

it.map([1, 2, 3], x => x)
it.count('AAAABBBCCD')
```

Read [the docs](http://iterated.busta.win).

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
  it.filter(({ success }) => success), // iterated is transparently handling the promise for you
)
```

In the case above, Typescript inferences that `result` is of
type `AsyncIterator<{success: boolean}>`. If we really want to
get an array we do as follows:

```typescript
const myArray = await it.pipe(
  result,
  it.array
)
```

In the case above, Typescript inferences that `myArray` is of type `{success: boolean}[]`.

Working with iterables means that:

* The library is speedy and introduces little overhead.
* Looping with iterables is natural to Javascript. We do it even if we don't think about it. For
  example,
  when we
  use [`for ... of`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of).
* We only iterate once.
* RAM consumption is low as we don't create intermediate data structures.
* We are compatible with any other library accepting the iterator protocol.
* We support Array, String, Map, Set, TypedArray, Generator, etc.

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

## Extending the library

You can create functions to be used with `pipe`:

```typescript
function doStuffWithDevices(devices: Iterable<Device>): Iterable<Device> {
  // Loop devices and so something with them
}

const result = it.pipe([{ id: 'device-1' }], doStuffWithDevices)
```

Functions with multiple arguments require adaptation to work in a pipe (i.e. curry).
You can achieve it simply by doing:

```typescript
import { toPipe } from 'iterated'

function doStuffWithDevices(devices: Iterable<Device>, aParam: () => number): Iterable<Device> {
  // Loop devices and so something with them
}

const doStuffWithDevicesPipe = toPipe(doStuffWithDevices)

const result = it.pipe([{ id: 'device-1' }], doStuffWithDevicesPipe(() => 5))
```

Checkout how we curry in our code for more intricate examples, like auto-handling
`Iterator` and `AsyncIterator`.

## Contributing

Fixes, improvements, and issues are welcomed.

We can add more functions (I am myself thinking of adding `tee` and `zip`), although I
wouldn't like to have an explosion of them, specially if there are easily composable.

Functions should allow currying and working with sync and async iterables transparently,
and have good Typescript support.

* Author: [bustawin](https://busta.win)

### Publishing

todo: CI/CD, github actions...

In order to publish this repo:

1. Ensure tests are green `npm test && npm run test:type`
2. Bump the version with a git tag and by adding it to `package.json`
3. Build the project `npm run build`
4. Publish `npm publish`

### Documenting

1. `npm run doc`
2. Publish to main branch and let the github action run, publishing
   the documentation as a github page.

## License

This work is licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).