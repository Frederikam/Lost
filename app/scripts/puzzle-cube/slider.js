export default class Slider {
	constructor(startPoint, length, orientation, thickness = 2, color = "Blue") {
		this.orientation = orientation;
		this.length = length;

		this.displayObject = new createjs.Shape();

		this.displayObject.graphics
			.setStrokeStyle(thickness)
			.beginFill(color)
			.beginStroke(color);
		
		if(orientation === "vertical") {
			this.displayObject.graphics.drawRect(0, 0, 8, length);
		}

		if(orientation === "horizontal") {
			this.displayObject.graphics.drawRect(0, 0, length, 8);
		}

		this.displayObject.x = startPoint.x;
		this.displayObject.y = startPoint.y;
	}
}