
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
	'use strict';

	it( 'should export a function', function test() {
		expect( erfc ).to.be.a( 'function' );
	});

	it( 'should throw an error if not provided a numeric value or an array', function test() {
		var values = [
				'5',
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

	it( 'should throw an error if a data array contains non-numeric values', function test() {
		var values = [
				'5',
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
		var values = [
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
			],
			val;

		for ( var i = 0; i < values.length; i++ ) {
			val = erfc( [ values[ i ] ] );
			assert.isArray( val );
			assert.isNumber( val[ 0 ] );
		}
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

});