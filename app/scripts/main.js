import mainMenu from './ui/mainMenu.js'
import preload from './preload.js'
const module = {};

module.stage = new createjs.Stage("game");

// Layers
module.background = new createjs.Container();
module.foreground = new createjs.Container();
module.ui         = new createjs.Container();
module.dialogue   = new createjs.Container();

module.stage.addChild(module.background);
module.stage.addChild(module.foreground);
module.stage.addChild(module.ui);
module.stage.addChild(module.dialogue);

module.stage.enableMouseOver(20);
createjs.Ticker.setFPS(60);
createjs.Ticker.addEventListener("tick", module.stage);

preload.load(function() {
  mainMenu.run(module.stage);
});

export default module


