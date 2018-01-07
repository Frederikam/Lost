import main from "../main.js"

const module = {};

const imgWidth = 700;
module.background = "assets/images/stage3/background3.jpg";

let gridContainer;

module.run = function () {
	gridContainer = new createjs.Container();
	gridContainer.x = 1920/2;
  	gridContainer.y = 1080/2;
  	gridContainer.regX = imgWidth/2;
  	gridContainer.regY = imgWidth/2;
	main.foreground.addChild(gridContainer);
  	main.foreground.alpha = 0;
  	createjs.Tween.get(main.foreground)
    	.wait(2200)
    	.to({alpha: 1}, 2000);

	const rows = 8;
	const columns = 9;

	let grid = {};
	let points = [];

	for (let x = 0; x < rows; x++) {
		for (let y = 0; y < columns; y++) {
			let point = new createjs.Shape();

			point.graphics.beginFill("#FFF").drawCircle(0,0,3);
			point.set({x: x * imgWidth/rows, y: y * imgWidth/columns});

			gridContainer.addChild(point);
			points.push(point);
		}
	}	
	main.stage.update();

	let ball = {x: 0, y: 5};
	let sliders = [
		//x,y to x,y
		//0,1 to 1,1
		//4,1 to 5,1
		//6,0 to 6,1
		//7,1 to 8,1
		//4,2 to 6,2
		//2,3 to 2,6
		//3,3 to 5,3
		//6,3 to 6,6
		//7,3 to 8,3
		//3,6 to 5,6
		//7,6 to 8,6
		//1,8 to 3,8
		//3,8 to 3,9
		//6,8 to 8,8
	];

	let locks = [
		{x: 8, y: 0, color: "yellow"},
		{x: 6, y: 7, color: "yellow"}
	];

	let unlocks = [
		{x: 8, y: 0, color: "yellow"},
		{x: 8, y: 9, color: "red"},
	];
};

function tick() {
  // Get mouse position relative to container
  const pt = mapContainer.globalToLocal(mapContainer.stage.mouseX, mapContainer.stage.mouseY);
  mouseDownEvent.currentTarget.x = pt.x;
  mouseDownEvent.currentTarget.y = pt.y;

}

export default module;
