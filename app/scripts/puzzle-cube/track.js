export default class Track {
	constructor(thickness, color, points) { //points is an array of objects with an x and y
		this.displayObject = new createjs.Shape();

		this.displayObject.graphics
			.setStrokeStyle(thickness)
			.beginStroke(color)
			.moveTo(points[0].x, points[0].y);

		points.forEach(point => {
			this.displayObject.graphics.lineTo(point.x, point.y);
		});
	}
}