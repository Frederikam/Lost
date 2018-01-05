//initialize stage in our canvas element
var stage = new createjs.Stage("game");

var tracksContainer = new createjs.Container();
var redTrack = new createjs.Shape();
	redTrack.graphics
	.setStrokeStyle(60)
	.beginStroke("Red")
	.moveTo(0,0)
	.lineTo(300, 30)
	.lineTo(50, 500)
	.lineTo(500, 800);

tracksContainer.addChild(redTrack);
stage.addChild(tracksContainer);
stage.update();

//Drag and drop example
//TODO: Pull out functionality into something that can be applied to whatever shape we desire
//TODO: Remove updates from event handlers if we move to a tick-based system instead of a reactive one
var redBall = new createjs.Shape();
redBall.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 25);
redBall.x = 20;
redBall.y = 10;
stage.addChild(redBall);
stage.update();

redBall.on("mousedown", function(event) {
	console.log(`draggable has been picked up at x: ${redBall.x} y: ${redBall.y}`);
	redBall.graphics.beginFill("Red").drawCircle(0, 0, 20);
	redBall.held = true;
	stage.update();
});

redBall.on("pressmove", function(event) {
	if(redTrack.hitTest(event.stageX, event.stageY) && redBall.held) {
		event.target.x = event.stageX;
		event.target.y = event.stageY;		
	} else {
		redBall.held = false;
	}
	stage.update();
});

redBall.on("pressup", function(event) {
	console.log(`draggable has been released at x: ${redBall.x} y: ${redBall.y}`);
	redBall.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 25);
	stage.update();
});
