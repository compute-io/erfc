erfc
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> Complementary error function.


## Installation

``` bash
$ npm install compute-erfc
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

``` javascript
var erfc = require( 'compute-erfc' );
```

#### erfc( x[, options] )

Evaluates the [complementary error function](http://en.wikipedia.org/wiki/Error_function). The function accepts as its first argument either a single `numeric` value or an `array` of numeric values, which may include `NaN`, `+infinity`, and `-infinity`. For an input `array`, the `erfc` function is evaluated for each value.

``` javascript
erfc( -1 );
// returns ~1.8427

erfc( [ -10, -1, 0, 1, 10 ] );
// returns [ 2, 1.8427, 1, 0.1573, 2.0885e-45 ]
```

When provided an input `array`, the function accepts two `options`:

*  __copy__: `boolean` indicating whether to return a new `array` containing the `erfc` values. Default: `true`.
*  __accessor__: accessor `function` for accessing numeric values in object `arrays`.

To mutate the input `array` (e.g., when input values can be discarded or when optimizing memory usage), set the `copy` option to `false`.

``` javascript
var arr = [ -10, -1, 0, 1, 10 ];

var vals = erfc( arr, {
	'copy': false
});
// returns [ 2, 1.8427, 1, 0.1573, 2.0885e-45 ]

console.log( arr === vals );
// returns true
```

For object `arrays`, provide an accessor `function` for accessing `array` values.

``` javascript
var data = [
	['beep', -10],
	['boop', -1],
	['bip', 0],
	['bap', 1],
	['baz', 10]
];

function getValue( d, i ) {
	return d[ 1 ];
}

var vals = erfc( data, {
	'accessor': getValue
});
// returns [ 2, 1.8427, 1, 0.1573, 2.0885e-45 ]
```

__Note__: the function returns an `array` with a length equal to the original input `array`.



## Examples

``` javascript
var erfc = require( 'compute-erfc' );

var data = new Array( 100 );
for ( var i = 0; i < data.length; i++ ) {
	data[ i ] = Math.random()*20 - 10;
}

console.log( erfc( data ) );
// returns [...]
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


---
## License

[MIT license](http://opensource.org/licenses/MIT). 


## Copyright

Copyright &copy; 2014-2015. Athan Reines.


[npm-image]: http://img.shields.io/npm/v/compute-erfc.svg
[npm-url]: https://npmjs.org/package/compute-erfc

[travis-image]: http://img.shields.io/travis/compute-io/erfc/master.svg
[travis-url]: https://travis-ci.org/compute-io/erfc

[coveralls-image]: https://img.shields.io/coveralls/compute-io/erfc/master.svg
[coveralls-url]: https://coveralls.io/r/compute-io/erfc?branch=master

[dependencies-image]: http://img.shields.io/david/compute-io/erfc.svg
[dependencies-url]: https://david-dm.org/compute-io/erfc

[dev-dependencies-image]: http://img.shields.io/david/dev/compute-io/erfc.svg
[dev-dependencies-url]: https://david-dm.org/dev/compute-io/erfc

[github-issues-image]: http://img.shields.io/github/issues/compute-io/erfc.svg
[github-issues-url]: https://github.com/compute-io/erfc/issues
