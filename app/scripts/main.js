import mainMenu from './ui/mainMenu.js'
//import mainMenu from './stage2/stage2.js'
import dialogue from './ui/dialogue.js'
import preload from './preload.js'
import audio from './audio.js'
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

const spinnerContainer = new createjs.Container();
spinnerContainer.x = 1920/2;
spinnerContainer.y = 1080/2;
const spinnerImg = new createjs.Bitmap("assets/images/loading_spinner.png");
spinnerImg.x = -64;
spinnerImg.y = -64;
spinnerImg.width = 128;
spinnerImg.height = 128;
module.stage.addChild(spinnerContainer);
spinnerContainer.addChild(spinnerImg);
createjs.Tween.get(spinnerContainer, {loop:true})
  .to({rotation: 360}, 1000);


preload.load(function() {
  audio.load(() => {
    createjs.Tween.get(spinnerContainer)
      .to({alpha: 0}, 500)
      .call(function() {
        audio.setMusic("menu");
        mainMenu.run(module.stage);
        dialogue.onLoad();
      });
  })
});

const handleViewport = function() {
  let style = document.getElementById("game").style;
  if (window.innerWidth * (1080/1920) <= window.innerHeight) {
    // By width
    const h  = window.innerWidth * (1080/1920);
    style.height = h + "px";
    style.width = window.innerWidth  + "px";
    style.marginTop = (window.innerHeight - h) / 2 + "px";
  } else {
    // By height
    style.height = window.innerHeight + "px";
    style.width = window.innerHeight * (1929/1080) + "px";
    style.marginTop = null;
  }
};
window.addEventListener('resize', handleViewport);
handleViewport();

export default module
