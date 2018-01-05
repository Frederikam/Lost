import main from '../main.js'

const module = {};

const imgWidth = 700;
const rows = 4;

const spritesheet = new createjs.SpriteSheet({
  images: ["assets/images/stage3/map.png"],
  frames: {width: imgWidth / rows, height: imgWidth / rows, regX: imgWidth / rows / 2, regY: imgWidth / rows / 2},
});

module.background = "assets/images/stage3/background3.jpg";

const pieces = [];

module.run = function () {
  const mapContainer = new createjs.Container();
  mapContainer.x = 1920/2;
  mapContainer.y = 1080/2;
  mapContainer.regX = imgWidth/2;
  mapContainer.regY = imgWidth/2;
  main.foreground.addChild(mapContainer);

  const spriteOrder = [];
  for (let i = 0; i < rows*rows; i++) {spriteOrder.push(i)}
  shuffle(spriteOrder);

  let i = 0;
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < rows; x++) {
      let piece = new createjs.Sprite(spritesheet);
      piece.gotoAndStop(spriteOrder[i]);
      piece.x = x * imgWidth/rows + imgWidth/rows/2;
      piece.y = y * imgWidth/rows + imgWidth/rows/2;

      piece.rotation = Math.floor(Math.random() * 4) * 90;
      mapContainer.addChild(piece);
      pieces.push(piece);
      i++;
    }
  }
  console.log(pieces)
};

// Copy paste driven development
// https://goo.gl/pudmnX
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

export default module;
