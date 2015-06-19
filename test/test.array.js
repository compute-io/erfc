/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	erfc = require( './../lib/array.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'array erfc', function tests() {

	it( 'should export a function', function test() {
		expect( erfc ).to.be.a( 'function' );
	});

	it( 'should evaluate the complementary error function', function test() {
		var data, actual, expected, i;

		data = [
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
		actual = new Array( data.length );

		actual = erfc( actual, data );

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

		for ( i = 0; i < actual.length; i++ ) {
			assert.closeTo( actual[ i ], expected[ i ], 1e-4, i );
		}

		// Typed arrays...
		data = new Float64Array( data );
		actual = new Float64Array( data.length );

		actual = erfc( actual, data );
		expected = new Float64Array( expected );

		for ( i = 0; i < actual.length; i++ ) {
			assert.closeTo( actual[ i ], expected[ i ], 1e-4, i );
		}

	});

	it( 'should return null if provided an empty array', function test() {
		assert.isNull( erfc( [], [] ) );
		assert.isNull( erfc( new Int8Array(), new Int8Array() ) );
	});

});
