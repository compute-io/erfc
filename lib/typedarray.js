'use strict';

// FUNCTIONS //

var ERFC = require( './number.js' );


// COMPLEMENTARY ERROR FUNCTION //

/**
* FUNCTION: erfc( out, arr )
*	Computes the complementary error function for each typed-array element.
*
* @param {Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} out - output array
* @param {Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} arr - input array
* @returns {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} output array
*/
function erfc( y, x ) {
	var len = x.length,
		i;
	for ( i = 0; i < len; i++ ) {
		y[ i ] = ERFC( x[ i ] );
	}
	return y;
} // end FUNCTION erfc()


// EXPORTS //

module.exports = erfc;