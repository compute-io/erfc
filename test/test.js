/* global require, describe, it */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Matrix data structure:
	matrix = require( 'dstructs-matrix' ),

	// Module to be tested:
	erfc = require( './../lib' ),

	// Error function:
	ERFC = require( './../lib/number.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'compute-erfc', function tests() {

	it( 'should export a function', function test() {
		expect( erfc ).to.be.a( 'function' );
	});

	it( 'should throw an error if the first argument is neither a number or array-like or matrix-like', function test() {
		var values = [
			// '5', // valid as is array-like (length)
			true,
			undefined,
			null,
			NaN,
			function(){},
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				erfc( value );
			};
		}
	});

	it( 'should throw an error if provided an invalid option', function test() {
		var values = [
			'5',
			5,
			true,
			undefined,
			null,
			NaN,
			[],
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				erfc( [1,2,3], {
					'accessor': value
				});
			};
		}
	});

	it( 'should throw an error if provided an array and an unrecognized/unsupported data type option', function test() {
		var values = [
			'beep',
			'boop'
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				erfc( [1,2,3], {
					'dtype': value
				});
			};
		}
	});

	it( 'should throw an error if provided a matrix and an unrecognized/unsupported data type option', function test() {
		var values = [
			'beep',
			'boop'
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				erfc( matrix( [2,2] ), {
					'dtype': value
				});
			};
		}
	});

	it( 'should compute the error function when provided a number', function test() {
		assert.strictEqual( erfc( 0 ), 1 );
		assert.closeTo( erfc( 0.5 ), 0.479500, 1e-4 );
	});

	it( 'should evaluate the complementary error function when provided a plain array', function test() {
		var data, actual, expected, i;

		data = [ -3, -2, -1, 0, 1, 2, 3 ];

		// Evaluated on Wolfram Alpha:
		expected = [
			2,
			1.9953222,
			1.8427007,
			1,
			0.1572992,
			0.0046777,
			0
		];

		actual = erfc( data );
		assert.notEqual( actual, data );

		for ( i = 0; i < actual.length; i++ ) {
			assert.closeTo( actual[ i ], expected[ i ], 1e-4, i );
		}

		// Mutate...
		actual = erfc( data, {
			'copy': false
		});
		assert.strictEqual( actual, data );

		for ( i = 0; i < actual.length; i++ ) {
			assert.closeTo( data[ i ], expected[ i ], 1e-4, 'Mutated: ' + i );
		}
	});

	it( 'should evaluate the complementary error function when provided a typed array', function test() {
		var data, actual, expected, i;

		data = new Int8Array( [ -3, -2, -1, 0, 1, 2, 3 ] );

		expected = new Float64Array( [
			2,
			1.9953222,
			1.8427007,
			1,
			0.1572992,
			0.0046777,
			0
		]);

		actual = erfc( data );
		assert.notEqual( actual, data );

		for ( i = 0; i < actual.length; i++ ) {
			assert.closeTo( actual[ i ], expected[ i ], 1e-4 );
		}

		// Mutate:
		actual = erfc( data, {
			'copy': false
		});
		expected = new Int8Array( [ 1, 1, 1, 1, 0, 0, 0 ] );
		assert.strictEqual( actual, data );

		for ( i = 0; i < actual.length; i++ ) {
			assert.closeTo( data[ i ], expected[ i ], 1e-7 );
		}
	});

	it( 'should evaluate the complementary error function element-wise and return an array of a specific type', function test() {
		var data, actual, expected;

		data = [ -3, -2, -1, 0, 1, 2, 3 ];
		expected = new Int8Array( [ 1, 1, 1, 1, 0, 0, 0 ] );

		actual = erfc( data, {
			'dtype': 'int8'
		});

		assert.notEqual( actual, data );
		assert.strictEqual( actual.BYTES_PER_ELEMENT, 1 );
		assert.deepEqual( actual, expected );
	});

	it( 'should evaluate the complementary error function element-wise using an accessor', function test() {
		var data, actual, expected, i;

		data = [
			[0,-3],
			[1,-2],
			[2,-1],
			[3,0],
			[4,1],
			[5,2],
			[6,3]
		];

		// Evaluated on Wolfram Alpha:
		expected = [
			2,
			1.9953222,
			1.8427007,
			1,
			0.1572992,
			0.0046777,
			0
		];

		actual = erfc( data, {
			'accessor': getValue
		});
		assert.notEqual( actual, data );

		for ( i = 0; i < actual.length; i++ ) {
			assert.closeTo( actual[ i ], expected[ i ], 1e-4 );
		}

		// Mutate:
		actual = erfc( data, {
			'accessor': getValue,
			'copy': false
		});
		assert.strictEqual( actual, data );

		for ( i = 0; i < actual.length; i++ ) {
			assert.closeTo( data[ i ], expected[ i ], 1e-4 );
		}

		function getValue( d ) {
			return d[ 1 ];
		}
	});

	it( 'should evaluate the complementary error function element-wise and deep set', function test() {
		var data, actual, expected, i;

		data = [
			{'x':[0,-3]},
			{'x':[1,-2]},
			{'x':[2,-1]},
			{'x':[3,0]},
			{'x':[4,1]},
			{'x':[5,2]},
			{'x':[6,3]}
		];
		expected = [
			{'x':[0,2]},
			{'x':[1,1.9953222]},
			{'x':[2,1.8427007]},
			{'x':[3,1]},
			{'x':[4,0.1572992]},
			{'x':[5,0.0046777]},
			{'x':[6,0]}
		];

		actual = erfc( data, {
			'path': 'x.1'
		});

		assert.strictEqual( actual, data );

		for ( i = 0; i < actual.length; i++ ) {
			assert.closeTo( data[ i ].x[ 1 ], expected[ i ].x[ 1 ], 1e-4 );
		}

		// Specify a path with a custom separator...
		data = [
			{'x':[0,-3]},
			{'x':[1,-2]},
			{'x':[2,-1]},
			{'x':[3,0]},
			{'x':[4,1]},
			{'x':[5,2]},
			{'x':[6,3]}
		];
		actual = erfc( data, {
			'path': 'x/1',
			'sep': '/'
		});
		assert.strictEqual( actual, data );

		for ( i = 0; i < actual.length; i++ ) {
			assert.closeTo( actual[ i ].x[ 1 ], expected[ i ].x[ 1 ], 1e-4 );
		}
	});

	it( 'should evaluate the complementary error function element-wise when provided a matrix', function test() {
		var mat,
			out,
			d1,
			d2,
			i;

		d1 = new Float64Array( 25 );
		d2 = new Float64Array( 25 );
		for ( i = 0; i < d1.length; i++ ) {
			d1[ i ] = i / 5;
			d2[ i ] = ERFC( i / 5);
		}
		mat = matrix( d1, [5,5], 'float64' );
		out = erfc( mat );

		assert.deepEqual( out.data, d2 );

		// Mutate...
		out = erfc( mat, {
			'copy': false
		});
		assert.strictEqual( mat, out );
		assert.deepEqual( mat.data, d2 );
	});

	it( 'should evaluate the complementary error function element-wise and return a matrix of a specific type', function test() {
		var mat,
			out,
			d1,
			d2,
			i;

		d1 = new Float64Array( 25 );
		d2 = new Float32Array( 25 );
		for ( i = 0; i < d1.length; i++ ) {
			d1[ i ] = i / 5;
			d2[ i ] = ERFC( i / 5 );
		}
		mat = matrix( d1, [5,5], 'float64' );
		out = erfc( mat, {
			'dtype': 'float32'
		});

		assert.strictEqual( out.dtype, 'float32' );
		assert.deepEqual( out.data, d2 );
	});

	it( 'should return `null` if provided an empty data structure', function test() {
		assert.isNull( erfc( [] ) );
		assert.isNull( erfc( matrix( [0,0] ) ) );
		assert.isNull( erfc( new Int8Array() ) );
	});

});
