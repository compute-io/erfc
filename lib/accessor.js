'use strict';

// FUNCTIONS

var ERFC = require( './number.js' );


// COMPLEMENTARY ERROR FUNCTION //

/**
* FUNCTION: erfc( out, arr, accessor )
*	Computes the complementary error function for each array element using an accessor function.
*
* @param {Array} out - output array
* @param {Array} arr - input array
* @param {Function} accessor - accessor function for accessing array values
* @returns {Number[]} output array
*/
function erfc( y, x, clbk ) {
	var len = x.length,
		i;
	for ( i = 0; i < len; i++ ) {
		y[ i ] = ERFC( clbk( x[ i ], i ) );
	}
	return y;
} // end FUNCTION erfc()


// EXPORTS //

module.exports = erfc;
