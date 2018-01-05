import main from '../main.js'

const module = {};

// TODO: Add actors

let dialogueBox;
let dialogueText;

module.onLoad = function() {
  main.dialogue.alpha = 0;
  dialogueBox = new createjs.Shape();
  dialogueBox.graphics.beginFill('black').drawRect(200, 850, 1520, 200);
  dialogueBox.alpha = 0.7;
  main.dialogue.addChild(dialogueBox);

  const textMargin = 20;
  dialogueText = new createjs.Text("", "40px Arial", "#FFF");
  dialogueText.x = 200 + textMargin;
  dialogueText.y = 850 + textMargin;
  dialogueText.lineWidth = 1520 - textMargin * 2;
  main.dialogue.addChild(dialogueText);
};

export default module;
