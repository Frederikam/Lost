const module = {};

//createjs.Sound.alternateExtensions = ["mp3"];
//createjs.Sound.on("fileload", this.loadHandler, this);
createjs.Sound.registerSound("assets/audio/menu.ogg", "menu");
createjs.Sound.registerSound("assets/audio/puzzle.ogg", "puzzle");

let currentMusic = null;
let currentMusicId = null;
module.setMusic = function(id) {
  if (currentMusicId === id) return;

  const fadeIn = () => {
    currentMusic = createjs.Sound.play(id);
    currentMusic.volume = 0;
    currentMusic.setLoop(true);
    console.log(currentMusic);
    createjs.Tween.get(currentMusic)
      .to({volume: 0.5}, 10000, createjs.Ease.sineInOut(2))
  };

  if (currentMusic !== null) {
    let oldMusic = currentMusic;
    createjs.Tween.removeTweens(oldMusic);
    createjs.Tween.get(oldMusic)
      .to({volume: 0}, 10000, createjs.Ease.sineInOut(2))
      .call(() => {
        oldMusic.stop();
      });
    setTimeout(fadeIn(), 5000)
  } else {
    fadeIn();
  }
};

export default module;
