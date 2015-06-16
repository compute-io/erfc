erfc
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> Computes the complementary error function.

The [complementary error function](https://en.wikipedia.org/wiki/Error_function) is defined as

<div class="equation" align="center" data-raw-text="
\operatorname{erfc}(x) = 1-\operatorname{erf}(x) = \frac{2}{\sqrt\pi} \int_x^{\infty} e^{-t^2}\,\mathrm dt" data-equation="eq:complementary_error_function">
	<img src="https://cdn.rawgit.com/compute-io/erfc/6ac020746a3ab1978a868f0fe48c91df9ec45b9b/docs/img/eqn.svg" alt="Equation of the complementary error function.">
	<br>
</div>

Equivalently, it is calculated by Craig's formula as follows:

<div class="equation" align="center" data-raw-text="\operatorname{erfc}(x) & = \frac{2}{\pi} \int_0^{\frac{\pi}{2}} \exp \left( - \frac{x^2}{\sin^2 \theta} \right) d\theta." data-equation="eq:craigs_formula">
	<img src="https://cdn.rawgit.com/compute-io/erfc/6ac020746a3ab1978a868f0fe48c91df9ec45b9b/docs/img/eqn2.svg" alt="Craig's formula of the complementary error function.">
	<br>
</div>


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

Evaluates the [complementary error function](http://en.wikipedia.org/wiki/Error_function). `x` may be either a [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number), an [`array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array), a [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays), or a [`matrix`](https://github.com/dstructs/matrix).

Values may include `NaN`, `+infinity`, and `-infinity`. For an input `array` and `matrix`, the `erfc` function is evaluated for each value.


``` javascript
var matrix = require( 'dstructs-matrix' ),
	data,
	mat,
	out,
	i;

out = erfc( -1 );
// returns ~1.8427

out = erfc( [ -10, -1, 0, 1, 10 ] );
// returns [ 2, 1.8427, 1, 0.1573, 2.0885e-45 ]

data = [ 0, 1, 2 ];
out = erf( data );
// returns [ 1, ~0.1573, ~0.0047 ]

data = new Int8Array( data );
out = erf( data );
// returns Float64Array( [ 1, ~0.1573, ~0.0047 ] )

data = new Float64Array( 6 );
for ( i = 0; i < 6; i++ ) {
	data[ i ] = i / 2;
}
mat = matrix( data, [3,2], 'float64' );
/*
	[  0  0.5
	   1  1.5
	   2  2.5 ]
*/

out = erf( mat );
/*
	[  1    ~0.48
	  ~0.16 ~0.03
	  ~0    ~0 ]
*/
```


The function accepts the following `options`:

* 	__accessor__: accessor `function` for accessing `array` values.
* 	__dtype__: output [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) or [`matrix`](https://github.com/dstructs/matrix) data type. Default: `float64`.
*	__copy__: `boolean` indicating if the `function` should return a new data structure. Default: `true`.
*	__path__: [deepget](https://github.com/kgryte/utils-deep-get)/[deepset](https://github.com/kgryte/utils-deep-set) key path.
*	__sep__: [deepget](https://github.com/kgryte/utils-deep-get)/[deepset](https://github.com/kgryte/utils-deep-set) key path separator. Default: `'.'`.

For object `arrays`, provide an accessor `function` for accessing `array` values.

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

To [deepset](https://github.com/kgryte/utils-deep-set) an object `array`, provide a key path and, optionally, a key path separator.

``` javascript
var data = [
	{'x':[0,-10]},
	{'x':[1,-1]},
	{'x':[2,0]},
	{'x':[3,1]},
	{'x':[4,10]}
];

var out = erfc( data, 'x|1', '|' );
/*
	[
		{'x':[0,2]},
		{'x':[1,1.8427]},
		{'x':[2,1]},
		{'x':[3,0.1573]},
		{'x':[4,2.0885e-45]}
	]
*/

var bool = ( data === out );
// returns true
```

By default, when provided a [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) or [`matrix`](https://github.com/dstructs/matrix), the output data structure is `float64` in order to preserve precision. To specify a different data type, set the `dtype` option (see [`matrix`](https://github.com/dstructs/matrix) for a list of acceptable data types).

``` javascript
var data, out;

data = new Int8Array( [0, 1, 2] );

out = erf( data, {
	'dtype': 'int32'
});
// returns Int32Array( [1,0,0] )

// Works for plain arrays, as well...
out = erf( [0, 1, 2], {
	'dtype': 'uint8'
});
// returns Uint8Array( [1,0,0] )
```

By default, the function returns a new data structure. To mutate the input data structure (e.g., when input values can be discarded or when optimizing memory usage), set the `copy` option to `false`.

``` javascript
var data,
	bool,
	mat,
	out,
	i;

var data = [ -10, -1, 0, 1, 10 ];

var out = erfc( data, {
	'copy': false
});
// returns [ 2, 1.8427, 1, 0.1573, 2.0885e-45 ]

bool = (arr === vals );
// returns true

data = new Float64Array( 6 );
for ( i = 0; i < 6; i++ ) {
	data[ i ] = i / 2;
}
mat = matrix( data, [3,2], 'float64' );
/*
	[  0  0.5
	   1  1.5
	   2  2.5 ]
*/

out = erfc( mat, {
	'copy': false
});
/*
	[  1    ~0.48
	  ~0.16 ~0.03
	  ~0    ~0 ]
*/

bool = ( mat === out );
// returns true
```

## Examples

``` javascript
var matrix = require( 'dstructs-matrix' ),
	erf = require( 'compute-erf' );

var data,
	mat,
	out,
	tmp,
	i;

// Plain arrays...
data = new Array( 10 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = Math.random()*20 - 10;
}
out = erf( data );

// Object arrays (accessors)...
function getValue( d ) {
	return d.x;
}
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = {
		'x': data[ i ]
	};
}
out = erf( data, {
	'accessor': getValue
});

// Deep set arrays...
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = {
		'x': [ i, data[ i ].x ]
	};
}
out = erf( data, {
	'path': 'x/1',
	'sep': '/'
});

// Typed arrays...
data = new Int32Array( 10 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = Math.random() * 100;
}
tmp = erf( data );
out = '';
for ( i = 0; i < data.length; i++ ) {
	out += tmp[ i ];
	if ( i < data.length-1 ) {
		out += ',';
	}
}

// Matrices...
mat = matrix( data, [5,2], 'int32' );
out = erf( mat );

// Matrices (custom output data type)...
out = erf( mat, {
	'dtype': 'uint8'
});
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

Copyright &copy; 2014-2015. The [Compute.io](https://github.com/compute-io) Authors.


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
