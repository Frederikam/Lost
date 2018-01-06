//initialize stage in our canvas element
var stage = new createjs.Stage("game");



//Drag and drop example
//TODO: Pull out functionality into something that can be applied to whatever shape we desire
//TODO: Remove updates from event handlers if we move to a tick-based system instead of a reactive one
var circle = new createjs.Shape();
circle.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 25);
circle.x = 100;
circle.y = 100;
stage.addChild(circle);
stage.update();

circle.on("mousedown", function(event) {
	console.log(`draggable has been picked up at x: ${circle.x} y: ${circle.y}`);
	circle.graphics.beginFill("Red").drawCircle(0, 0, 20);
	stage.update();
});

circle.on("pressmove", function(event) {
	if(boundLine.hitTest(event.stageX, event.stageY)) {
		event.target.x = event.stageX;
		event.target.y = event.stageY;		
	}
	stage.update();
});

circle.on("pressup", function(event) {
	console.log(`draggable has been released at x: ${circle.x} y: ${circle.y}`);
	circle.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 25);
	stage.update();
});

var boundsContainer = new createjs.Container();
var boundLine = new createjs.Shape();
	boundLine.graphics
	.setStrokeStyle(10, "round")
	.beginStroke("Red")
	.moveTo(0,0)
	.lineTo(300, 30)
	.lineTo(50, 500)
	.lineTo(500, 500);

boundsContainer.addChild(boundLine);
stage.addChild(boundsContainer);
stage.update();