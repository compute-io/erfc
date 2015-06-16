'use strict';

// MODULES //

var ERFC = require( './number.js' );

// COMPLEMENTARY ERROR FUNCTION //

/**
* FUNCTION: erfc( out, matrix )
*	Evaluates the complementary error function for each matrix element.
*
* @param {Matrix} out - output matirx
* @param {Matrix} arr - input matrix
* @returns {Matrix|Null} output matrix or null
*/
function erfc( y, x ) {
	var len = x.length,
		i;
	if ( !len ) {
		return null;
	}
	if ( y.length !== len ) {
		throw new Error( 'erfc()::invalid input arguments. Input and output matrices must be the same length.' );
	}
	for ( i = 0; i < len; i++ ) {
		y.data[ i ] = ERFC( x.data[ i ] );
	}
	return y;
} // end FUNCTION erfc()


// EXPORTS //

module.exports = erfc;
