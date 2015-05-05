/* global require, describe, it */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	erfc = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'compute-erfc', function tests() {

	it( 'should export a function', function test() {
		expect( erfc ).to.be.a( 'function' );
	});

	it( 'should throw an error if not provided a numeric value or an array', function test() {
		var values = [
			'5',
			new Number( 5 ),
			true,
			undefined,
			null,
			{},
			function(){}
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

	it( 'should throw an error if provided an options argument which is not an object', function test() {
		var values = [
			'5',
			5,
			true,
			undefined,
			null,
			NaN,
			[],
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				erfc( [1,2,3], value );
			};
		}
	});

	it( 'should throw an error if provided a copy option which is not a boolean primitive', function test() {
		var values = [
			'5',
			5,
			new Boolean( true ),
			undefined,
			null,
			NaN,
			[],
			{},
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				erfc( [1,2,3], {
					'copy': value
				});
			};
		}
	});

	it( 'should throw an error if provided an accessor option which is not a function', function test() {
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

	it( 'should throw an error if a data array contains non-numeric values (if not provided an accessor)', function test() {
		var values = [
			'5',
			new Number( 5 ),
			true,
			undefined,
			null,
			[],
			{},
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( [ values[i] ] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				erfc( value );
			};
		}
	});

	it( 'should throw an error if an accessed array value is not numeric', function test() {
		var values = [
			'5',
			new Number( 5 ),
			true,
			undefined,
			null,
			NaN,
			[],
			{},
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( [ values[i] ] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				var arr = [
					{'x': value}
				];
				erfc( arr, {
					'accessor': getValue
				});
			};
		}
		function getValue( d ) {
			return d.x;
		}
	});

	it( 'should return NaN if provided a NaN', function test() {
		var val = erfc( NaN );
		assert.isNumber( val );
		assert.ok( val !== val );
	});

	it( 'should return 0 if provided positive infinity', function test() {
		var inf = Number.POSITIVE_INFINITY,
			val = erfc( inf );
		assert.strictEqual( val, 0 );
	});

	it( 'should return 2 if provided negative infinity', function test() {
		var ninf = Number.NEGATIVE_INFINITY,
			val = erfc( ninf );
		assert.strictEqual( val, 2 );
	});

	it( 'should return a numeric value if provided a numeric value', function test() {
		assert.isNumber( erfc( 1 ) );
	});

	it( 'should return an array of numbers if provided an array', function test() {
		var values, out;

		values = [
			1e-306,
			-1e-306,
			1e-299,
			-1e-299,
			0.8,
			-0.8,
			1,
			-1,
			10,
			-10,
			2,
			-2,
			3,
			-3
		];

		out = erfc( values );
		assert.isArray( out );
		for ( var i = 0; i < values.length; i++ ) {
			assert.isNumber( out[ i ] );
		}
	});

	it( 'should not mutate the input array by default', function test() {
		var values, out;

		values = [
			1e-306,
			-1e-306,
			1e-299,
			-1e-299,
			0.8,
			-0.8,
			1,
			-1,
			10,
			-10,
			2,
			-2,
			3,
			-3
		];

		out = erfc( values );
		assert.ok( out !== values );
	});

	it( 'should mutate an input array if the `copy` option is `false`', function test() {
		var values, out;

		values = [
			1e-306,
			-1e-306,
			1e-299,
			-1e-299,
			0.8,
			-0.8,
			1,
			-1,
			10,
			-10,
			2,
			-2,
			3,
			-3
		];

		out = erfc( values, {
			'copy': false
		});
		assert.ok( out === values );
	});

	it( 'should evaluate the complementary error function', function test() {
		var values, expected, actual;

		values = [
			1e-306,
			-1e-306,
			1e-299,
			-1e-299,
			0.1,
			-0.1,
			0.8,
			-0.8,
			1,
			-1,
			10,
			-10,
			2,
			-2,
			3,
			-3,
			100,
			-100
		];

		// Evaluated on Wolfram Alpha:
		expected = [
			1.00000000,
			1.00000000,
			1.00000000,
			1.00000000,
			0.887537,
			1.11246,
			0.257899,
			1.74210,
			0.15729920,
			1.84270079,
			2.08848758e-45,
			2.00000000,
			0.00467773,
			1.99532226,
			0.00002209,
			1.99997791,
			0.00000000,
			2.00000000
		];

		actual = erfc( values );

		for ( var i = 0; i < actual.length; i++ ) {
			assert.closeTo( actual[ i ], expected[ i ], 1e-5 );
		}
	});

	it( 'should evaluate the complementary error function using an accessor function', function test() {
		var values, expected, actual;

		values = [
			[1,1e-306],
			[2,-1e-306],
			[3,1e-299],
			[4,-1e-299],
			[5,0.1],
			[6,-0.1],
			[7,0.8],
			[8,-0.8],
			[9,1],
			[10,-1],
			[11,10],
			[12,-10],
			[13,2],
			[14,-2],
			[15,3],
			[16,-3],
			[17,100],
			[18,-100]
		];

		// Evaluated on Wolfram Alpha:
		expected = [
			1.00000000,
			1.00000000,
			1.00000000,
			1.00000000,
			0.887537,
			1.11246,
			0.257899,
			1.74210,
			0.15729920,
			1.84270079,
			2.08848758e-45,
			2.00000000,
			0.00467773,
			1.99532226,
			0.00002209,
			1.99997791,
			0.00000000,
			2.00000000
		];

		actual = erfc( values, {
			'accessor': getValue
		});

		for ( var i = 0; i < actual.length; i++ ) {
			assert.closeTo( actual[ i ], expected[ i ], 1e-5 );
		}
		function getValue( d ) {
			return d[ 1 ];
		}
	});

});
