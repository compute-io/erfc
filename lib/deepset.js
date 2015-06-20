'use strict';

// MODULES //

var deepSet = require( 'utils-deep-set' ).factory,
	deepGet = require( 'utils-deep-get' ).factory,
	ERFC = require( './number.js' );


// COMPLEMENTARY ERROR FUNCTION //

/**
* FUNCTION: erfc( arr, path[, sep] )
*	Computes the complementary error function for each array element and deep sets the input array.
*
* @param {Array} arr - input array
* @param {String} path - key path used when deep getting and setting
* @param {String} [sep] - key path separator
* @returns {Array} input array
*/
function erfc( x, path, sep ) {
	var len = x.length,
		opts = {},
		dget,
		dset,
		i;
	if ( arguments.length > 2 ) {
		opts.sep = sep;
	}
	if ( len ) {
		dget = deepGet( path, opts );
		dset = deepSet( path, opts );
		for ( i = 0; i < len; i++ ) {
			dset( x[i], ERFC( dget( x[i] ) ) );
		}
	}
	return x;
} // end FUNCTION erfc()


// EXPORTS //

module.exports = erfc;
