import main from "../main.js"
import mainMenu from './mainMenu.js'
import stage1 from "../stage1/stage1.js"
import stage2 from "../stage2/stage2.js"
import stage3 from "../stage3/stage3.js"
import audio from "../audio.js"

const module = {};
const stages = [stage1, stage2, stage3];
let stageSelected = false;
const buttons = [];
const buttonLabels = ['Stage 1', 'Stage 2', 'Stage 3'];

let stageBackground = null;

module.run = function() {
  const canvas = document.getElementById("game");
  main.ui.alpha = 0;

  for (let i = 0; i < 3; i++) {
    const buttonXPosition = canvas.width/2 - 258
    const buttonYPosition = 300 + i*150;    
    const button = new createjs.Shape();

    let buttonText = new createjs.Text(buttonLabels[i], "40px Arial", "#FFF");
    buttonText.x = buttonXPosition + 190;
    buttonText.y = buttonYPosition + 20;
    
    //TODO: Art
    button.graphics.beginFill('brown').drawRoundRect(buttonXPosition, buttonYPosition, 512, 94, 5);

    main.ui.addChild(button);
    main.ui.addChild(buttonText);
    buttons.push(button);

    button.addEventListener("mousedown", function(event) {
      if (stageSelected) return; // Debounce
      stageSelected = true;
      onSelect(i);
    })
  }

  createjs.Tween.get(main.ui)
    .to({alpha: 1}, 500);

  // Fade in, move up
  buttons.forEach(button => {
    createjs.Tween.get(main.ui)
      .to({y: button.y - 25}, 500);
  })
};

function onSelect(stageId) {
  createjs.Tween.get(main.ui)
    .to({alpha: 0}, 500)
    .wait(200)
    .call(function () {
      createjs.Tween.get(mainMenu.background)
        .to({alpha: 0}, 1000);

      // Stage background
      if (stages[stageId].background !== undefined) {
        main.background.removeChild(stageBackground);
        stageBackground = new createjs.Bitmap(stages[stageId].background);
        main.background.addChild(stageBackground);
      }

      // Render on top so it can fade out
      main.background.setChildIndex(mainMenu.background, main.background.getNumChildren()-1);

      stages[stageId].run();
    });

  // Fade out, move down
  buttons.forEach(button => {
    createjs.Tween.get(button)
      .to({y: button.y + 25}, 500);
    createjs.Tween.get(buttonText)
      .to({y: button.y + 25}, 500);
  });
}

export default module;
