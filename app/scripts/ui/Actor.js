import dialogue from "./dialogue";
import main from "../main";

const commonY = 650;
const inactiveAlpha = 0.8;

class Actor {

  constructor(spritesheet, baseX, isLeft) {
    this.entity = new createjs.Sprite(spritesheet);
    this.baseX = baseX;
    this.isLeft = isLeft;
    this.entity.x = baseX;
    this.entity.y = commonY;
    this.entity.alpha = 0;
    this.visible = false;
    this.active = false;

    main.dialogue.addChild(this.entity);
  }

  setFrame(frame) {
    this.entity.gotoAndStop(frame);
  }

  speak(text) {
    this.setActive(true, 200);
    dialogue.text.text = text;

    dialogue.actors.forEach(a => {
      if (a !== this && a.active) a.setActive(false, 200);
    });
  }

  // Indicates who is speaking. Inactive actors lose alpha
  // Also implies that we are visible
  setActive(bool, time) {
    this.visible = true;
    this.active = bool;
    if (bool) {
      createjs.Tween.get(this.entity)
        .to({alpha: 1, x: this.baseX + (this.isLeft ? 20 : -20)}, time);
    } else {
      createjs.Tween.get(this.entity)
        .to({alpha: inactiveAlpha, x: this.baseX}, time);
    }
  }

  setVisible(bool, time) {
    this.visible = bool;
    if (bool) {
      createjs.Tween.get(this.entity)
        .to({alpha: 1}, time);
    } else {
      this.active = false;
      createjs.Tween.get(this.entity)
        .to({alpha: 0, x: this.baseX}, time);
    }
  }

}

export default Actor;
