var stage = new createjs.Stage("game");

//Drag and drop example
//TODO: Pull out functionality into something that can be applied to whatever shape we desire
//TODO: Remove updates from event handlers if we move to a tick-based system instead of a reactive one
var circle = new createjs.Shape();
circle.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 50);
circle.x = 100;
circle.y = 100;
stage.addChild(circle);
stage.update();

circle.on("mousedown", function(event) {
	console.log(`draggable has been picked up at x: ${circle.x} y: ${circle.y}`);
	circle.graphics.beginFill("Red").drawCircle(0, 0, 50);
	stage.update();
});

circle.on("pressmove", function(event) {
	event.target.x = event.stageX;
	event.target.y = event.stageY;
	stage.update();
});

circle.on("pressup", function(event) {
	console.log(`draggable has been released at x: ${circle.x} y: ${circle.y}`);
	circle.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 50);
	stage.update();
});