import main from "../main.js"
import stageSelect from "./stageSelect.js"

const module = {};

module.run = function() {

  // Menu assets
  const menu_bg = new createjs.Bitmap("assets/images/menu_bg.jpg");
  const menu_title = new createjs.Bitmap("assets/images/menu_title.png");
  const menu_start = new createjs.Bitmap("assets/images/menu_start_btn.png");
  const menu_start2 = new createjs.Bitmap("assets/images/menu_start2_btn.png");
  const menu_gj = new createjs.Bitmap("assets/images/menu_game_jam_logo.png");
  const menu_credits = new createjs.Bitmap("assets/images/menu_credits.png");
  module.background = menu_bg;

  // Asset coordinates
  menu_bg.x = 0;
  menu_bg.y = 0;
  menu_bg.width = 1920;
  menu_bg.height = 1080;
  menu_bg.alpha = 0;

  menu_title.x = 960;
  menu_title.y = 380;
  menu_title.regX = 520;
  menu_title.alpha = 0;
  menu_title.scaleX = .5;
  menu_title.scaleY = .5;

  menu_start.x = 960;
  menu_start.y = 640;
  menu_start.regX = 293;
  menu_start.alpha = 0;

  menu_start2.x = 960;
  menu_start2.y = 640;
  menu_start2.regX = 293;
  menu_start2.alpha = 0;

  menu_gj.x = 270;
  menu_gj.y = 780;
  menu_gj.alpha = 0;

  menu_credits.x = 540;
  menu_credits.y = 880;
  menu_credits.alpha = 0;

  // Create container for game buttons
  /*menu_startBtn = new createjs.Container();
  menu_startBtn.addChild(menu_start, menu_start2);
  menu_startBtn.x = 960;
  menu_startBtn.y = 540;
  menu_startBtn.regX = 520;*/

  // Add assets to UI container
  main.background.addChild(menu_bg);
  main.ui.addChild(menu_title);
  main.ui.addChild(menu_start);
  main.ui.addChild(menu_start2);
  main.ui.addChild(menu_gj);
  main.ui.addChild(menu_credits);

  // Animation for BG (Enter)
  createjs.Tween.get(menu_bg, { loop: false })
    .to({alpha: 1}, 500, createjs.Ease.getPowInOut(2));

  // Animation for Title (Enter)
  createjs.Tween.get(menu_title, { loop: false })
    .wait(500)
    .to({alpha: 1, y: 280, scaleX: 1, scaleY: 1}, 750, createjs.Ease.getPowInOut(2));

  // Animation for GJ Logo (Enter)
  createjs.Tween.get(menu_gj, { loop: false })
    .wait(1300)
    .to({alpha: 1, y: 840}, 1000, createjs.Ease.getPowInOut(2));

  // Animation for Credits (Enter)
  createjs.Tween.get(menu_credits, { loop: false })
    .wait(1700)
    .to({alpha: 1, x: 600}, 1000, createjs.Ease.getPowInOut(2));

  // Animation for Start Game Button (Enter)
  createjs.Tween.get(menu_start).wait(2000).to({alpha: 1}, 750, createjs.Ease.getPowInOut(2)).play(
    createjs.Tween.get(menu_start, { paused: true, loop: true })
      .to({ y: 630 }, 750, createjs.Ease.getPowInOut(2))
      .to({ y: 640 }, 750, createjs.Ease.getPowInOut(2))
  );

  // Animation for Start Game 2 Button (Enter, but hidden)
  createjs.Tween.get(menu_start2).wait(2000).to({}, 750, createjs.Ease.getPowInOut(2)).play(
    createjs.Tween.get(menu_start2, { paused: true, loop: true })
      .to({ y: 630 }, 750, createjs.Ease.getPowInOut(2))
      .to({ y: 640 }, 750, createjs.Ease.getPowInOut(2))
  );

  // Switch to Active Start Game button on hoverover
  menu_start.addEventListener("mouseover", function(event) {
    createjs.Tween.get(menu_start, { loop: false } )
      .to({alpha: 0}, 250, createjs.Ease.getPowInOut(2));
    createjs.Tween.get(menu_start2, { loop: false } )
      .to({alpha: 1}, 250, createjs.Ease.getPowInOut(2));
  });

  // Switch to Inactive Start Game button on hoverout
  menu_start2.addEventListener("mouseout", function(event) {
    createjs.Tween.get(menu_start, { loop: false } )
      .to({alpha: 1}, 250, createjs.Ease.getPowInOut(2));
    createjs.Tween.get(menu_start2, { loop: false } )
      .to({alpha: 0}, 250, createjs.Ease.getPowInOut(2));
  });

  // Exit Game Menu and Go To Game when button is clicked
  menu_start2.addEventListener("mousedown", function(event) {
    // Animation for BG (Exit)
    createjs.Tween.get(menu_bg, { loop: false })
      .to({x: -1920}, 1250, createjs.Ease.getPowInOut(2))
      .call(stageSelect.run);

    // Animation for Title (Enter)
    createjs.Tween.get(menu_title, { loop: false })
      .to({alpha: 1, x: menu_title.x - 1920}, 1250, createjs.Ease.getPowInOut(2));

    // Animation for GJ Logo (Enter)
    createjs.Tween.get(menu_gj, { loop: false })
      .to({alpha: 1, x: menu_gj.x - 1920}, 1250, createjs.Ease.getPowInOut(2));

    // Animation for Credits (Enter)
    createjs.Tween.get(menu_credits, { loop: false })
      .to({alpha: 1, x: menu_credits.x - 1920}, 1250, createjs.Ease.getPowInOut(2))
      .wait(1250);

    // Animation for Start Game Button (Enter)
    menu_start.removeAllEventListeners();
    createjs.Tween.get(menu_start, { loop: false })
      .to({alpha: 0}, 250, createjs.Ease.getPowInOut(2));

    // Animation for Start Game 2 Button (Enter, but hidden)
    menu_start2.removeAllEventListeners();
    createjs.Tween.get(menu_start2, { loop: false })
      .to({alpha: 0}, 250, createjs.Ease.getPowInOut(2));
  });
};

export default module;
