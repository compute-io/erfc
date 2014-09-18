var erfc = require( './../lib' );

// Simulate some data...
var data = new Array( 100 );

for ( var i = 0; i < data.length; i++ ) {
	data[ i ] = Math.random()*20 - 10;
}

// Evaluate the complementary error function for each datum:
console.log( erfc( data ) );
// returns [...]