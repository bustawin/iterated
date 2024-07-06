# Iterated

A minimalist library that offers lazy functions to work with JavaScript
collections (e.g., arrays, strings).

There are many libraries that reinvent how you transform
collections of data in JS by using so many patterns and
functions<sup>[1](#similar-libraries)</sup>
which are challenging to master, costly to execute, and
alien to the [Standard JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript).

Iterated offers a distinct and minimalist approach by providing:

* A [set of **lazy** functions](#reference) that you already know how to use:
  `map`, `filter`, `group`, etc.
  ```typescript
  import it from 'iterated'
  
  it.map([1, 2, 3], x => x * 2)
  it.count('AAAABBBCCD')
  ```
* A `pipe` function to transform data in a **functional** way.
  ```typescript
  const result: Iterator<number> = it.pipe(
    [
      { foo: 1, baz: 'x' },
      { foo: 2, baz: 'x' },
    ],
    it.map(item => item['foo']) // Functions are auto-curried to be used in pipes
  )
  ```
* Prime **TypeScript support**, so you can reason how your data changes,
  and your IDE can warn you when types mismatch mid-pipe.
* **Only Standard JavaScript** protocols to process collections. This means:
  * Avoid reinventing the wheel.
  * Avoid you from learning niche patterns alien to Standard JavaScript.
  * Reduce your dependency on this library.
  * Zero dependencies, zero polyfills,
    and targeting ES2020—fully supported by browsers since 2021.
* We internally use the
  [Standard JS Iterator protocol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#the_iterator_protocol)
  so each function (e.g., `map`)
  works exactly the same for `arrays`, `strings`, `sets`, `maps`,
  and any future or custom data collection.
  ```typescript
  it.find([1, 2, 3], 3)
  it.find('123', '3')
  ```
* We internally use
  the [Standard JS Generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator)
  to increase
  performance, reduce RAM usage, and allow huge and infinite data streams by:
  * Using lazy functions that **only iterate once**.
  * Generally **avoiding intermediate collections**.
* Prime `async` support.
  For example, you can fetch data from an API in the middle of a
  pipe, and let Iterated internally transform your `Iterator` to an
  `AsyncIterator` and continue processing the pipe.
  ```typescript
  const result: AsyncIterator<{ ... }> = it.pipe(
    [true, false, true],
    it.map(async (x) => await fetch(...)),
    it.await, // await each promise, returning an async iterator
    it.filter(({ statusCode }) => statusCode == 200), // iterated is transparently handling the promise for you
  )
  ```
* [Extensible](#extending-the-library) without coupling or polluting your code.
  As simple as creating a function whose first parameter accepts an Iterator and add it to the
  pipe.

Checkout
the [introduction to JavaScript Iterables with Iterated](https://busta.win/posts/iterated).

## Installing

```shell
npm install iterated
```

## Running

Then, run it as follows:

```typescript
import it from 'iterated'

it.map([1, 2, 3], x => x * 2)
it.count('AAAABBBCCD')
```

With pipes:

```typescript
const result: Iterable<number> = it.pipe(
  it.range(47),
  it.pairs,
  it.map(([a, b]) => a + b),
)

const aSet: Set<number> = it.pipe(
  result,
  it.set
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

## Roadmap: towards a 1.0

First, we want to validate the usefulness of the project with some
engagement, like having a few users and feedback.

We should find together where to improve the API, ironing out inconsistencies and
adding more functions like `tee` and `zip`.

## Contributing

We are looking for the first contributors! Be an integral part of this project.
Fixes, improvements, and issues are welcomed.

Functions should allow currying and working with sync and async iterables transparently,
and have good Typescript support.

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
   the documentation as a Github page.

## License

This work is licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
The authors are:

* [bustawin](https://busta.win)

## Footnotes

#### Similar libraries

Although there are many libraries with a similar purpose, none fully
match our purpose: [underscore](https://underscorejs.org),
[ramda](https://ramdajs.com), [iterate-iterator](https://www.npmjs.com/package/iterate-iterator),
[iterare](https://www.npmjs.com/package/iterare), [the new built-in methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator/map).