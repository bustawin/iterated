# Iterated

Iterated makes working with Typescript iterables (e.g. String, Array)
feel native, productive, and fun. We provide functional building blocks
(e.g. `map`, `group`, `pipe`) and great typing support.

Although there are many libraries with a similar purpose
(e.g. [underscore](https://underscorejs.org),
[ramda](https://ramdajs.com), [iterate-iterator](https://www.npmjs.com/package/iterate-iterator),
[iterare](https://www.npmjs.com/package/iterare), [the new built-in methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator/map))
none matches all of the following:

* [`pipe` support with transparent currying](#pipe); it feels natural.
* Great Typescript typing inference, so you know the shape of
  your data all the time.
* [Uses the iterator protocol](#iterable) (i.e. `Iterator`). This means that we
  support `String`, `Array`, `Map`, and `Set` consistently and transparently.
* Functions [transform data](#promise-and-asynciterator)
  between `Promise`, `AsyncIterator`, and `Iterator` trivially.
* Just easy to use. Methods are based on Javascript functions and
  Python's itertools package, which makes them understandable, battle tested,
  and powerful to use.
* [Extensible](#extending-the-library) without coupling or polluting your code.

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

## pipe

We can work with `pipes` of data, processing sync and async iterables
transparently.

```typescript
// typescript inferences that result is an `Iterator<number>`
const result = it.pipe(
  [
    { foo: 1, baz: 'x' },
    { foo: 2, baz: 'x' },
  ],
  it.map((item) => item['foo']) // Map is magically curried
)
```

Some functions accept only an iterable:

```typescript
it.flatten([['foo']]) // First argument is iterable
it.pipe([['foo']], it.flatten)
```

Some functions accept multiple parameters, and for that have two forms
(aka overloads)—the normal one and the pipe one:

```typescript
it.map(['foo'], x => x) // First argument is iterable
it.pipe(['foo'], it.map(x => x)) // In pipes we omit the iterable
```

## Iterable

If we really want to get an array we do as follows:

```typescript
// typescript inferences that `myArray` is of type `number[]`
const myArray = await it.pipe(
  result,
  it.array
)
```

However, in many times you don't really need arrays, but just something to loop at.
Looping with iterables is natural to Javascript. We do it even if we don't think about it.
For example, when we
use [`for ... of`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of).

Working with iterables means that:

* We support `Array`, `String`, `Map`, `Set`, `TypedArray`, `Generator`, etc. out of the box.
* The library is speedy and introduces little overhead; we only iterate once.
* RAM consumption is low as we don't create intermediate data structures.
* We are compatible with any other library accepting the iterator protocol.

And we can create multiple pipes, useful when applying many functions:

```typescript
const ranged = it.pipe(it.range(5))
const result = it.pipe(ranged, it.count)
```

## Promise and AsyncIterator

`AsyncIterator` is amazing when handling promises:

```typescript
// typescript inferecnes that `result` is of 
// type `AsyncIterator<{success: boolean}>`
const result = it.pipe(
  [true, false, true],
  it.map((x) => Promise.resolve({ success: x })),  // eg. fetch something from a server
  it.await, // await each promise, returning an async iterator
  it.filter(({ success }) => success), // iterated is transparently handling the promise for you
)
```

## Reference

* [Map](http://iterated.busta.win/functions/Map)
* [all](http://iterated.busta.win/functions/all)
* [any](http://iterated.busta.win/functions/any)
* [array](http://iterated.busta.win/functions/array)
* [await](http://iterated.busta.win/functions/await_)
* [consume](http://iterated.busta.win/functions/consume)
* [count](http://iterated.busta.win/functions/count)
* [filter](http://iterated.busta.win/functions/filter)
* [find](http://iterated.busta.win/functions/find)
* [flatten](http://iterated.busta.win/functions/flatten)
* [group](http://iterated.busta.win/functions/group)
* [map](http://iterated.busta.win/functions/map)
* [pairs](http://iterated.busta.win/functions/pairs)
* [pipe](http://iterated.busta.win/functions/pipe)
* [range](http://iterated.busta.win/functions/range)
* [reduce](http://iterated.busta.win/functions/reduce)
* [size](http://iterated.busta.win/functions/size)
* [sort](http://iterated.busta.win/functions/sort)
* [toPipe](http://iterated.busta.win/functions/toPipe)

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