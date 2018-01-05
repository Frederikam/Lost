import mainMenu from './ui/mainMenu.js'
const module = {};

module.stage = new createjs.Stage("game");

// Layers
module.background = new createjs.Container();
module.foreground = new createjs.Container();
module.ui         = new createjs.Container();

module.stage.addChild(module.background);
module.stage.addChild(module.foreground);
module.stage.addChild(module.ui);
module.stage.enableMouseOver(20);
createjs.Ticker.setFPS(60);
createjs.Ticker.addEventListener("tick", module.stage);

export default module
mainMenu.run(module.stage);

