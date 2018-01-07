import main from '../main.js'
import Actor from './Actor.js'

const module = {};

module.sumireko = 0;
module.reisen = 1;
module.seija = 2;
module.shinmyoumaru = 3;
module.nue = 4;
module.reimu = 5;
module.shinmyoumaruMirrored = 6;

const boxAlpha = 0.7;
const boxWidth = 1000;

let dialogueBox;
let dialogueText;
const spritesheet = new createjs.SpriteSheet({
  images: ["assets/images/slider/full.png"], //TODO: Replace placeholder
  frames: {width: 300, height: 400},
});

module.onLoad = function() {
  dialogueBox = new createjs.Shape();
  dialogueBox.graphics.beginFill('black').drawRect(0, 850, boxWidth, 200);
  dialogueBox.x = (1920-boxWidth)/2;
  dialogueBox.width = boxWidth;
  dialogueBox.alpha = 0;
  main.dialogue.addChild(dialogueBox);

  const textMargin = 30;
  dialogueText = new createjs.Text("Tempora est dolor quisquam labore labore dignissimos. Non quam quisquam adipisci eligendi aut consequatur et. Nemo magni laudantium necessitatibus perferendis nulla unde." +
    "\n", "40px Arial", "#FFF");
  dialogueText.x = dialogueBox.x + textMargin;
  dialogueText.y = 850 + textMargin;
  dialogueText.alpha = 0;
  dialogueText.lineWidth = boxWidth - textMargin * 2;
  module.text = dialogueText;
  main.dialogue.addChild(dialogueText);

  // TODO: Symmetry
  module.actorLeft = new Actor(spritesheet, dialogueBox.x - 320, true);
  module.actorRight = new Actor(spritesheet, dialogueBox.x + dialogueBox.width, false);
  module.actors = [module.actorLeft, module.actorRight];
};

let timeline = [];
let step = -1;

module.setTimeline = function(t) {
  timeline = t;
  step = -1;
};

module.step = function() {
  step++;
  timeline[step]();
};

module.setText = function(text) {
  module.text.text = text;

  module.actors.forEach((a) =>{
    if (a.visible) a.setActive(false, 300)
  })
};

let visible = false;
module.setVisible = function(bool) {
  if (bool === visible) return;
  visible = bool;

  if (bool) {
      createjs.Tween.get(dialogueBox).to({alpha: boxAlpha}, 300);
      createjs.Tween.get(dialogueText).to({alpha: 1}, 300);
  } else {
    createjs.Tween.get(dialogueBox).to({alpha: 0}, 300);
    createjs.Tween.get(dialogueText).to({alpha: 0}, 300);
  }
};

let clickListener = () => module.step();
module.setAutoStep = function(bool) {
  if (bool) {
    document.getElementById("game").addEventListener("click", clickListener);
  } else {
    document.getElementById("game").removeEventListener("click", clickListener);
  }
};

// Dialogue example
/*
setTimeout(temp, 5000);
let clickListener = () => dialogue.step();
function temp() {
  dialogue.actorLeft.setFrame(0);
  dialogue.actorLeft.setFrame(1);
  dialogue.setVisible(true);

  dialogue.actorRight.speak("Knock knock");
  let timeline = [
    () => {
      dialogue.actorLeft.speak("Who's there?");
    },
    () => {
      dialogue.actorRight.speak("Nobel");
    },
    () => {
      dialogue.actorLeft.speak("Nobel who?");
    },
    () => {
      dialogue.actorRight.speak("No bell, that's why I knocked!");
    },
    () => {
      dialogue.setVisible(false);
      dialogue.actorLeft.setVisible(false, 300);
      dialogue.actorRight.setVisible(false, 300);
      document.getElementById("game").removeEventListener("click", clickListener)
    },
  ];

  dialogue.setTimeline(timeline);
  document.getElementById("game").addEventListener("click", clickListener);
}
*/

export default module;
