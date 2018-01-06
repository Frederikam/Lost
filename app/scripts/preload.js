const module = {};

// Put a URL here and we'll load it. This will put them in the cache
const manifestRaw = [
  "assets/images/menu_bg.jpg",
  "assets/images/menu_title.png",
  "assets/images/menu_start_btn.png",
  "assets/images/menu_start2_btn.png",
  "assets/images/menu_game_jam_logo.png",
  "assets/images/menu_credits.png",
  "assets/images/slider/board.png",
  "assets/images/slider/full.png"
];

const queue = new createjs.LoadQueue();

// Make life ez on us and just take the file name (excl. extension) as id
manifestRaw.forEach(value => {
  queue.loadFile({
    id: /(\w+)(?:\.[\w]+)?$/.exec(value)[1],
    src: value
  });
});

module.load = function(handleComplete) {
  queue.on("complete", handleComplete, this);
  queue.load();
};

export default module;
