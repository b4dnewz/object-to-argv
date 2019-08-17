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

You can also add positional arguments setting the value to `null`

```js
objectToArgv({
  foo: null,
  bar: true
})

// ["foo", "--bar"]
```

## Options

Here a list of options that can be used when converting objects to argv array, simply pass them as second argument to the conversion function.

__normalize__

When enabled it will normalize the object key names and the final argv flags to kebab-case, by default is true.

```js
objectToArgv({ fooBar: true })
// ["--foo-bar"]

objectToArgv({ fooBar: true }, {
  normalize: false
})
// ["--fooBar"]
```

__booleanNegation__

When enabled it will add `--no` prefix before the boolean flags, otherwise if disabled it will simply omit the keys that have a falsy value, by default is true.

```js
objectToArgv({ foo: false })
// ["--no-foo"]

objectToArgv({ foo: false }, {
  booleanNegation: false
})
// []
```

__arraySeparator__

This option allow to customize the separator used for array values, when false it will output each array element in it's own place, otherwise if is a string it will be used as separator.

```js
objectToArgv({ foo: ["bar", "baz"] })
// ["--foo", "bar", "baz"]

objectToArgv({ foo: ["bar", "baz"] }, {
  arraySeparator: ","
})
// ["--foo", "bar,baz"]
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
