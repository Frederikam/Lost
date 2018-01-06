import Track from "./track.js"

export default class TrackGrid {
	constructor() {
		let color = "White";
		//track thickness
		let thickness = 14;
		//width of a grid square
		let width = 70;
		let tracks = [];

		for(let i = 0; i < 13; i++) { //should draw 13 lines for a 12x12 grid
			//vert line
			tracks.push(new Track(thickness, color, [
				{x: 500 + (width * i), y: 200},
				{x: 500 + (width * i), y: 1040}
			]));

			//horiz line
			tracks.push(new Track(thickness, color, [
				{x: 500, y: 200 + (width * i)},
				{x: 1340, y: 200 + (width * i)}
			]));
		}

		let trackGridContainer = new createjs.Container();
		tracks.forEach(function(track){
			trackGridContainer.addChild(track.displayObject);
		});

		this.displayObject = trackGridContainer;
	}
}