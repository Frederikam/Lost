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
let mapContainer;

module.run = function () {
  mapContainer = new createjs.Container();
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
      piece.addEventListener("mousedown", onMouseDown);
      piece.addEventListener("click", onMouseUp);

      // Custom parameters
      piece.column = x;
      piece.row = y;

      pieces.push(piece);
      i++;
    }
  }
};

// Local coordinates
function getNearestPiece(x, y) {
  const rowWidth = imgWidth/rows;
  let row = Math.floor(x / rowWidth);
  let column = Math.floor(y / rowWidth);
  row = Math.max(0, Math.min(rows, row));
  column = Math.max(0, Math.min(rows, column));
  return {row: row, column: column}
}

function findPieceByRowAndColumn(row, column) {
  let toReturn = null;
  pieces.forEach(value => {
    if (value.row === row && value.column === column) {
      toReturn = value;
    }
  });

  return toReturn;
}

let mouseDownEvent;
let misplacedTile = null;
function tick() {
  // Get mouse position relative to container
  const pt = mapContainer.globalToLocal(mapContainer.stage.mouseX, mapContainer.stage.mouseY);
  mouseDownEvent.currentTarget.x = pt.x;
  mouseDownEvent.currentTarget.y = pt.y;

  // Check if the nearest piece is not the same
  const rowWidth = imgWidth/rows;
  const tile = getNearestPiece(pt.x, pt.y);
  const fromTile = findPieceByRowAndColumn(tile.row, tile.column);

  // Restore misplaced
  if (misplacedTile !== null) {
    misplacedTile.x = misplacedTile.column * rowWidth + imgWidth/rows/2;
    misplacedTile.y = misplacedTile.row * rowWidth + imgWidth/rows/2;
    misplacedTile = null;
  }

  if (mouseDownEvent.currentTarget === null || fromTile == null) return;

  if (mouseDownEvent.currentTarget.row !== fromTile.row
    || mouseDownEvent.currentTarget.column !== fromTile.column) {
    // We are hovering over a new tile!

    misplacedTile = fromTile;
    fromTile.x = mouseDownEvent.currentTarget.row * rowWidth + imgWidth/rows/2;
    fromTile.y = mouseDownEvent.currentTarget.column * rowWidth + imgWidth/rows/2;
    console.log(fromTile.x+":"+fromTile.y);
  }
}

function onMouseDown(event) {
  mouseDownEvent = event;

  // Render on top
  mapContainer.setChildIndex(mouseDownEvent.currentTarget, mapContainer.getNumChildren()-1);
  createjs.Ticker.addEventListener("tick", tick);
}

function onMouseUp(event) {
  createjs.Ticker.removeEventListener("tick", tick);
}

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
