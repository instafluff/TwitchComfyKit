var fs = require('fs');
var archiver = require('archiver');

var output = fs.createWriteStream( __dirname + "/uploadthis.zip" );
var archive = archiver( "zip", {
	zlib: { level: 9 } // Set the compression level
});

output.on( "close", () => {
	console.log( "Saved to uploadthis.zip (" + archive.pointer() + " bytes)" );
});

archive.on( "warning", ( err ) => {
	if( err.code === "ENOENT" ) {
		console.warn( "Archive Warning" );
	}
	else {
		throw err;
	}
});

archive.on( "error", ( err ) => {
	throw err;
});

archive.pipe( output );
archive.directory( "your_files/", false );
archive.finalize();
