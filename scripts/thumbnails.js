
// Import core node modules.
var fs = require( "fs" );
var sharp = require( "sharp" );

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

var inputsDirectory = ( __dirname + "/../src/assets/gifs/" );
var outputsDirectory = ( __dirname + "/../src/assets/thumbnails/" );

generateThumbnailsForGIFs().then(
	( thumbnailCount ) => {

		console.log( `Generated ${ thumbnailCount } thumbnails.` );

	},
	( error ) => {

		console.warn( "An error occurred while generating thumbnails." );
		console.error( error );

	}
);

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

// I generate thumbnails if and only if they don't yet exist. Returns the number of
// thumbnails that were generated.
async function generateThumbnailsForGIFs() {

	var thumbnailCount = 0;

	for ( var inputFileName of fs.readdirSync( inputsDirectory ) ) {

		var thumbnailFileName = inputFileName.replace( /\.gif$/i, ".jpg" );
		var inputFilePath = ( inputsDirectory + inputFileName );
		var outputFilePath = ( outputsDirectory + thumbnailFileName );

		if ( fileExists( outputFilePath ) ) {

			console.warn( `Skipping "${ thumbnailFileName }", it already exists.` );

		} else {

			console.log( `Generating thumbnail for "${ thumbnailFileName }".` );

			await sharp( inputFilePath )
				.flatten()
				.jpeg({
					quality: 70
				})
				.toFile( outputFilePath )
			;

			thumbnailCount++;

		}

	}

	return( thumbnailCount );

}


// I check to see if the given file exists.
function fileExists( filePath ) {

	try {

		return( fs.accessSync( filePath ) === undefined );

	} catch ( error ) {

		return( false );

	}

}
