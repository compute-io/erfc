/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	erfc = require( './../lib/deepset.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'deepset erfc', function tests() {

	it( 'should export a function', function test() {
		expect( erfc ).to.be.a( 'function' );
	});

	it( 'should compute the error function and deep set', function test() {
		var data, expected, i;

		data = [
			{'x':-3},
			{'x':-2},
			{'x':-1},
			{'x':0},
			{'x':1},
			{'x':2},
			{'x':3}
		];

		data = erfc( data, 'x' );

		// Evaluated on Wolfram Alpha:
		expected = [
			{'x':2},
			{'x':1.9953222},
			{'x':1.8427007},
			{'x':1},
			{'x':0.1572992},
			{'x':0.0046777},
			{'x':0}
		];

		for ( i = 0; i < data.length; i++ ) {
			assert.closeTo( data[ i ].x, expected[ i ].x, 1e-4, i );
		}

		// Custom separator...
		data = [
			{'x':[9,-3]},
			{'x':[9,-2]},
			{'x':[9,-1]},
			{'x':[9,0]},
			{'x':[9,1]},
			{'x':[9,2]},
			{'x':[9,3]}
		];

		data = erfc( data, 'x/1', '/' );
		expected = [
			{'x':[9,2]},
			{'x':[9,1.9953222]},
			{'x':[9,1.8427007]},
			{'x':[9,1]},
			{'x':[9,0.1572992]},
			{'x':[9,0.0046777]},
			{'x':[9,0]}
		];

		for ( i = 0; i < data.length; i++ ) {
			assert.closeTo( data[ i ].x[ 1 ], expected[ i ].x[ 1 ], 1e-4, 'Custom: ' + i );
		}
	});

	it( 'should return null if provided an empty array', function test() {
		assert.isNull( erfc( [], 'x' ) );
		assert.isNull( erfc( [], 'x', '/' ) );
	});

});
