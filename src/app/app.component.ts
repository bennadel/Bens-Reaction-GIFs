
// Import the core angular services.
import { Component } from "@angular/core";

// Import the application components and services.
import { ClipboardService } from "./clipboard.service";
import { Entry } from "./manifest";
import { manifest } from "./manifest";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

interface SearchItem {
	isVisible: boolean;
	searchTarget: string;
	imageUrl: string;
	thumbnailUrl: string;
	sortTarget: number;
	entry: Entry;
}

@Component({
	selector: "app-root",
	styleUrls: [ "./app.component.less" ],
	templateUrl: "./app.component.html"
})
export class AppComponent {

	public isShowingNoResults: boolean;
	public isShowingToaster: boolean;
	public searchItems: SearchItem[];

	private clipboardService: ClipboardService;

	// I initialize the app component.
	constructor( clipboardService: ClipboardService ) {

		this.clipboardService = clipboardService;

		this.isShowingNoResults = false;
		this.isShowingToaster = false;
		this.searchItems = this.compileSearchItems();

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I apply the given filter to the search results.
	public applyFilter( inputFilter: string ) : void {

		var normalizedFilter = this.normalizeFilterValue( inputFilter );

		for ( var item of this.searchItems ) {

			item.isVisible = ( normalizedFilter )
				? item.searchTarget.includes( normalizedFilter )
				: true
			;

		}

		// If the filtering results in no visible items, show the "no results" message.
		this.isShowingNoResults = ! this.searchItems.some(
			( item ) => {

				return( item.isVisible );

			}
		);

		// Whenever the user changes the filter, scroll them back to the top of the
		// window so that they can see the most relevant results.
		window.scrollTo( 0, 0 );

	}


	// I copy the image URL associated with the given search item to the clipboard.
	public copyImageUrl( item: SearchItem ) : void {

		var remoteImageUrl = ( window.location.href + item.imageUrl );

		console.group( "Copying GIF Url" );
		console.log( remoteImageUrl );
		console.log( item.entry.altText );
		console.groupEnd();

		this.clipboardService
			.copy( remoteImageUrl )
			.then(
				() => {

					this.showToaster();

				},
				( error ) => {

					console.warn( "Could not copy GIF Url" );
					console.error( error );

				}
			)
		;

	}

	// ---
	// PRIVATE METHODS.
	// ---

	// I compile the manifest down into a search items collection.
	private compileSearchItems() : SearchItem[] {

		var items: SearchItem[] = manifest.map(
			( entry ) => {

				var imageUrl = `assets/gifs/${ entry.fileName }`;
				var thumbnailUrl = ( "assets/thumbnails/" + entry.fileName.replace( /\.gif$/i, ".jpg" ) );

				// Add all text-based elements to the search target.
				var searchTarget = [ entry.fileName, entry.altText, ...entry.tags ]
					.map( this.normalizeFilterValue )
					.join( "\n" )
					.toLowerCase()
				;

				// In order to bring different GIFs to your mental fore-brain, let's
				// randomly sort the search items every time the page renders. This way,
				// you'll see different GIFs at the top every time.
				var sortTarget = Math.random();

				return({
					isVisible: true,
					searchTarget: searchTarget,
					imageUrl: imageUrl,
					thumbnailUrl: thumbnailUrl,
					sortTarget: sortTarget,
					entry: entry
				});

			}
		);

		items.sort(
			( a, b ) => {

				return( b.sortTarget - a.sortTarget );

			}
		);

		return( items );

	}


	// I normalize the given search filter so that we can get better matches.
	private normalizeFilterValue( value: string ) : string {

		var normalizedValue = value
			.trim()
			.toLowerCase()
			.replace( /['",.:-]/g, "" )
		;

		return( normalizedValue );

	}


	// I show the "copied to clipboard" toaster.
	private showToaster() : void {

		this.isShowingToaster = true;

		setTimeout(
			() => {

				this.isShowingToaster = false;

			},
			3000
		);

	}

}
