# object-to-argv

> Convert an object to a suitable argv array

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage percentage][coveralls-image]][coveralls-url]

## Install

```
npm install @b4dnewz/object-to-argv
```

## Usage

```js
import objectToArgv from "@b4dnewz/object-to-argv"

objectToArgv({
  c: true,
  baz: false,
  foo: "bar",
  arr: ["a", "b"]
})

// ["-c", "--no-baz", "--foo", "bar", "--arr", "a", "b"]
```

---

## License

MIT © [Filippo Conti](https://b4dnewz.github.io/)

[npm-image]: https://badge.fury.io/js/%40b4dnewz%2Fobject-to-argv.svg
[npm-url]: https://npmjs.org/package/@b4dnewz/object-to-argv
[travis-image]: https://travis-ci.org/b4dnewz/object-to-argv.svg?branch=master
[travis-url]: https://travis-ci.org/b4dnewz/object-to-argv
[coveralls-image]: https://coveralls.io/repos/b4dnewz/object-to-argv/badge.svg
[coveralls-url]: https://coveralls.io/r/b4dnewz/object-to-argv
