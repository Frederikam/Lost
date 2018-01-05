import main from '../main.js'

const module = {};

const commonY = 620;

let dialogueBox;
let dialogueText;

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
  main.dialogue.addChild(dialogueText);

  module.actorLeft = new createjs.Bitmap("https://en.touhouwiki.net/images/8/8e/Th10Reimu2.png");
  module.actorLeft.y = commonY;
  module.actorLeft.x = -20;
  module.actorLeft.scaleX = 1.5;
  module.actorLeft.scaleY = 1.5;
  main.dialogue.addChild(module.actorLeft);

  module.actorRight = new createjs.Bitmap("https://en.touhouwiki.net/images/e/e9/14Tenshi2.png");
  module.actorRight.y = commonY;
  module.actorRight.x = 2000;
  module.actorRight.scaleX = -1;
  module.actorRight.scaleY = 1;
  main.dialogue.addChild(module.actorRight);
};

export default module;
