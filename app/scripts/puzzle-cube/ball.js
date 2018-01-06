export default class Ball {
	constructor(radius, color, point = {x: 0, y: 0}) {
		this.displayObject = new createjs.Shape();
		this.displayObject.graphics.beginFill(color).drawCircle(0, 0, radius);
		this.displayObject.x = point.x;
		this.displayObject.y = point.y;
	}
}
