import Track from './track.js';
import TrackGrid from './track-grid.js';

//Drag and drop example
//TODO: Pull out functionality into something that can be applied to whatever shape we desire
//TODO: Remove updates from event handlers if we move to a tick-based system instead of a reactive one
var ball = new createjs.Shape();
ball.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 25);
ball.x = 100;
ball.y = 100;
stage.addChild(ball);
stage.update();

ball.on("mousedown", function(event) {
	console.log(`draggable has been picked up at x: ${ball.x} y: ${ball.y}`);
	ball.graphics.beginFill("Red").drawCircle(0, 0, 20);
	ball.held = true; 
	stage.update();
});

ball.on("pressmove", function(event) {
	if(boundLine.hitTest(event.stageX, event.stageY)) {
		event.target.x = event.stageX;
		event.target.y = event.stageY;		
	}
	stage.update();
});

ball.on("pressup", function(event) {
	console.log(`draggable has been released at x: ${ball.x} y: ${ball.y}`);
	ball.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 25);
	stage.update();
});

var tracksContainer = new createjs.Container();

var track1Points = [
	{x: 0, y: 0},
	{x: 100, y: 10},
	{x: 200, y: 300},
	{x: 500, y: 800}
];

var track1 = new Track(30, "Red", track1Points);

var gridSideOne = new TrackGrid();
console.log(gridSideOne);
tracksContainer.addChild(track1.displayObject);
tracksContainer.addChild(gridSideOne.displayObject);
stage.addChild(tracksContainer);
stage.update();