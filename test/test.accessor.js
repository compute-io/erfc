/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	erfc = require( './../lib/accessor.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'accessor erfc', function tests() {

	it( 'should export a function', function test() {
		expect( erfc ).to.be.a( 'function' );
	});

	it( 'should evaluate the complementary error function using an accessor', function test() {
		var data, actual, expected, i;

		data = [
			{'x':-3},
			{'x':-2},
			{'x':-1},
			{'x':0},
			{'x':1},
			{'x':2},
			{'x':3}
		];
		actual = new Array( data.length );

		actual = erfc( actual, data, getValue );

		// Evaluated on Wolfram Alpha
		expected = [
			2,
			1.9953222,
			1.8427007,
			1,
			0.1572992,
			0.0046777,
			0
		];

		for ( i = 0; i < actual.length; i++ ) {
			assert.closeTo( actual[ i ], expected[ i ], 1e-4 );
		}

		function getValue( d ) {
			return d.x;
		}

		data = [
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

		actual = new Array( data.length );
		actual = erfc( actual, data, getValue2 );

		for ( i = 0; i < actual.length; i++ ) {
			assert.closeTo( actual[ i ], expected[ i ], 1e-4 );
		}
		function getValue2( d ) {
			return d[ 1 ];
		}
	});

	it( 'should return null if provided an empty array', function test() {
		assert.isNull( erfc( [], [], getValue ) );
		function getValue( d ) {
			return d.x;
		}
	});

});
