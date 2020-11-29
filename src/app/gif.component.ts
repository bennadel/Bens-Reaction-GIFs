
// Import the core angular services.
import { Component } from "@angular/core";
import { ChangeDetectionStrategy } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "bn-gif",
	inputs: [
		"imageUrl",
		"thumbnailUrl",
		"altText",
		"tags"
	],
	host: {
		"(mouseenter)": "activateGif()",
		"(mouseleave)": "deactivateGif()"
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
	styleUrls: [ "./gif.component.less" ],
	templateUrl: "./gif.component.html"
})
export class GifComponent {

	public altText!: string;
	public imageUrl!: string;
	public imageSrc: string;
	public tags!: string[];
	public thumbnailUrl!: string;

	// I initialize the gif component.
	constructor() {

		this.imageSrc = "";

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I enable the GIF animation.
	public activateGif() : void {

		this.imageSrc = this.imageUrl;

	}


	// I disable the GIF animation, showing the static thumbnail.
	public deactivateGif() : void {

		this.imageSrc = this.thumbnailUrl;

	}


	public ngOnInit() : void {

		this.imageSrc = this.thumbnailUrl;

	}

	// ---
	// PRIVATE METHODS.
	// ---

}
