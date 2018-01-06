import main from '../main.js'
import Actor from './Actor.js'

const module = {};

const commonY = 620;

let dialogueBox;
let dialogueText;
const spritesheet = new createjs.SpriteSheet({
  images: ["assets/images/stage3/map.png"], //TODO: Replace placeholder
  frames: {width: 150, height: 300, regX: 0, regY: 0},
});

module.onLoad = function() {
  main.dialogue.alpha = 0;
  dialogueBox = new createjs.Shape();
  dialogueBox.graphics.beginFill('black').drawRect(200, 850, 1520, 200);
  dialogueBox.alpha = 0.7;
  main.dialogue.addChild(dialogueBox);

  const textMargin = 40;
  dialogueText = new createjs.Text("Tempora est dolor quisquam labore labore dignissimos. Non quam quisquam adipisci eligendi aut consequatur et. Nemo magni laudantium necessitatibus perferendis nulla unde." +
    "\n", "40px Arial", "#FFF");
  dialogueText.x = 200 + textMargin;
  dialogueText.y = 850 + textMargin;
  dialogueText.lineWidth = 1520 - textMargin * 2;
  module.text = dialogueText;
  main.dialogue.addChild(dialogueText);

  // TODO: Symmetry
  module.actorLeft = new Actor(spritesheet, 200, true);
  module.actorRight = new Actor(spritesheet, 1800, false);
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

export default module;
