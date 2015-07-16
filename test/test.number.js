/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	erfc = require( './../lib/number.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'number erfc', function tests() {

	it( 'should export a function', function test() {
		expect( erfc ).to.be.a( 'function' );
	});

	it( 'should evaluate the complementary error function', function test() {
		assert.closeTo( erfc( 9 ), 0, 1e-4 );
		assert.closeTo( erfc( 900 ), 0, 1e-4 );
		assert.closeTo( erfc( 1 ), 0.157299, 1e-4 );
		assert.closeTo( erfc( 0.1 ), 0.887537, 1e-4 );
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

});
