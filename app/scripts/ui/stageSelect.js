import main from "../main.js"

const module = {};
let stageSelected = false;
const buttons = [];

module.run = function() {
  const canvas = document.getElementById("game");
  main.ui.alpha = 0;

  for (let i = 0; i < 4; i++) {
    const button = new createjs.Shape();

    //TODO: Art
    button.graphics.beginFill('brown').drawRoundRect(canvas.width/2 - 258, 225 + i*150, 512, 94, 5);
    main.ui.addChild(button);
    buttons.push(button);

    button.addEventListener("mousedown", function(event) {
      if (stageSelected) return; // Debounce
      stageSelected = true;
      onSelect(i);
    })
  }

  createjs.Tween.get(main.ui)
    .to({alpha: 1}, 500);

  // Fade down
  buttons.forEach(button => {
    createjs.Tween.get(main.ui)
      .to({y: button.y - 25}, 500);
  })
};

function onSelect(stage) {
  createjs.Tween.get(main.ui)
    .to({alpha: 0}, 500);

  // Fade down
  buttons.forEach(button => {
    createjs.Tween.get(button)
      .to({y: button.y + 25}, 500);
  })
}

export default module;
