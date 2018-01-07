import main from "../main.js"
import Ball from "../puzzle-cube/ball.js"
import Slider from "../puzzle-cube/slider.js"
import Track from "../puzzle-cube/track.js"
import TrackGrid from "../puzzle-cube/track-grid.js"

const module = {};

module.run = function () {
	//Drag and drop example
  const stage = main.stage;

  //TODO: Remove updates from event handlers if we move to a tick-based system instead of a reactive one
  const ball = new Ball(5, "red", {x: 500, y: 200});

  const tracksContainer = new createjs.Container();
  const slidersContainer = new createjs.Container();

  const sliders = [
    new Slider({x: 706, y: 192}, 200, "vertical"),
    new Slider({x: 776, y: 192}, 400, "vertical"),
    new Slider({x: 846, y: 192}, 600, "vertical"),
    new Slider({x: 706, y: 195}, 200, "horizontal"),
    new Slider({x: 776, y: 265}, 200, "horizontal"),
    new Slider({x: 846, y: 335}, 200, "horizontal")
  ];

  sliders.forEach(function(slider) {
		slidersContainer.addChild(slider.displayObject);

		slider.displayObject.on("pressup", function(event) {
			console.log(event);
		});

		slider.displayObject.on("pressmove", function(event) {
			//console.log(slider);
			//event.target.x = event.stageX;
			if(slider.orientation === "vertical") {
				if(event.stageY > 192 && event.stageY < 1050 - slider.length) {
					event.target.y = event.stageY;
				}
			}

			if(slider.orientation === "horizontal") {
				if(event.stageX > 494 && event.stageX < 1400 - slider.length) {
					event.target.x = event.stageX;
				}
			}
			stage.update();
		});
	});

  const gridSideOne = new TrackGrid();
  tracksContainer.addChild(gridSideOne.displayObject);

  const sliderOne = new Slider({x: 706, y: 0}, 500, "vertical");
  const sliderTwo = new Slider({x: 706, y: 0}, 500, "vertical");

  console.log(slidersContainer);
	stage.addChild(tracksContainer);
	stage.addChild(ball.displayObject);
	stage.addChild(slidersContainer);
	stage.update();

	//event listeners
	ball.displayObject.on("mousedown", function(event) {
		ball.held = true;
		console.log(`draggable has been picked up at x: ${ball.displayObject.x} y: ${ball.displayObject.y}`);
		stage.update();
	});

	ball.displayObject.on("pressmove", function(event) {
		if(gridSideOne.displayObject.hitTest(event.stageX, event.stageY) && ball.held) {
			event.target.x = event.stageX;
			event.target.y = event.stageY;
		} else {
			ball.held = false;
		}
		//console.log(circle.x, circle.y);
		console.log(gridSideOne.displayObject.hitTest(ball.displayObject.x, ball.displayObject.y));
		stage.update();
	});

	ball.displayObject.on("pressup", function(event) {
		ball.held = false;
		stage.update();
	});
};

export default module;
