'use strict';

// FUNCTIONS //

var ERFC = require( './number.js' );


// COMPLEMENTARY ERROR FUNCTION //

/**
* FUNCTION: erfc( out, x )
*	Evaluates the complementary error function for each matrix element.
*
* @param {Matrix} out - output matrix
* @param {Matrix} x - input matrix
* @returns {Matrix} output matrix
*/
function erfc( out, x ) {
	var len = x.length,
		i;
	if ( out.length !== len ) {
		throw new Error( 'erfc()::invalid input arguments. Input and output matrices must be the same length.' );
	}
	for ( i = 0; i < len; i++ ) {
		out.data[ i ] = ERFC( x.data[ i ] );
	}
	return out;
} // end FUNCTION erfc()


// EXPORTS //

module.exports = erfc;
