
// Import the core angular services.
import { Injectable } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Injectable({
	providedIn: "root"
})
export class ClipboardService {

	private textarea: HTMLTextAreaElement;

	// I initialize the clipboard service.
	constructor() {

		// In order to execute the "Copy" command, we actually have to have a "selection"
		// in the currently rendered document. As such, we're going to inject a Textarea
		// element and .select() it in order to force a selection.
		// --
		// NOTE: This Textarea will be rendered off-screen.
		this.textarea = document.createElement( "textarea" );
		this.textarea.style.height = "0px";
		this.textarea.style.left = "-100px";
		this.textarea.style.opacity = "0";
		this.textarea.style.position = "fixed";
		this.textarea.style.top = "-100px";
		this.textarea.style.width = "0px";

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I copy the given value to the user's system clipboard. Returns a promise that
	// resolves to the given value on success or rejects with the raised Error.
	public async copy( value: string ) : Promise<string> {

		try {

			document.body.appendChild( this.textarea );

			// Set and select the value (creating an active Selection range).
			this.textarea.value = value;
			this.textarea.select();

			// Ask the browser to copy the current selection to the clipboard.
			document.execCommand( "copy" );

			return( value );

		} finally {

			// Cleanup - remove the Textarea from the DOM if it was injected.
			if ( this.textarea.parentNode ) {

				 this.textarea.parentNode.removeChild(  this.textarea );

			}

		}

	}

}
