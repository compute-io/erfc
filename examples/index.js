'use strict';

var erfc = require( './../lib' );

var data = new Array( 100 );
for ( var i = 0; i < data.length; i++ ) {
	data[ i ] = Math.random()*20 - 10;
}

console.log( erfc( data ) );
// returns [...]
