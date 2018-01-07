import main from '../main.js'
import dialogue from '../ui/dialogue.js'

const module = {};

const imgWidth = 700;
const rows = 4;

const spritesheet = new createjs.SpriteSheet({
  images: ["assets/images/stage1/map.png"],
  frames: {width: imgWidth / rows, height: imgWidth / rows, regX: imgWidth / rows / 2, regY: imgWidth / rows / 2},
});

//module.background = "assets/images/stage1/background1.jpg";

const pieces = [];
let mapContainer;
let ended = false;

module.run = function () {
  /* Dialogue */
  dialogue.actorLeft.setFrame(0);
  dialogue.actorLeft.setActive(false, 500);
  dialogue.actorRight.setVisible(false, 0);
  dialogue.setVisible(true);
  dialogue.setText("[Sumireko was in her everyday boring life, looking for ways to go back to Gensoukyou." +
    " One night, she was visiting a Shrine when she found an old handmade journal.]");

  const timeline = [
    () => {
      dialogue.actorLeft.speak('Sumireko: "Hm? What’s with this old journal?"')
    },
    () => {
      dialogue.setText('[Sumireko opened the journal to look on the inside.]')
    },
    () => {
      dialogue.actorLeft.speak('Sumireko: "Spell cards? And several pages are missing. Someone must have ripped them off for a reason…"');
    },
    () => {
      dialogue.setAutoStep(false);
      dialogue.actorLeft.setVisible(false, 300);
      dialogue.setText('Drag and drop puzzle pieces to solve the puzzle. Use the right mouse button to rotate.');
      setTimeout(module.begin, 500);
    }
  ];

  dialogue.setTimeline(timeline);
  dialogue.setAutoStep(true);
};

module.begin = function() {
  /* Begin gameplay */
  ended = false;
  mapContainer = new createjs.Container();
  mapContainer.x = 1920 / 2;
  mapContainer.y = 1080 / 2;
  mapContainer.regX = imgWidth / 2;
  mapContainer.regY = imgWidth / 2;
  main.foreground.addChild(mapContainer);
  main.foreground.alpha = 1;
  createjs.Tween.get(main.foreground)
    .wait(2200)
    .to({alpha: 1}, 2000);

  const spriteOrder = [];
  for (let i = 0; i < rows * rows; i++) {
    spriteOrder.push(i)
  }
  shuffle(spriteOrder);

  let i = 0;
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < rows; x++) {
      let piece = new createjs.Sprite(spritesheet);
      piece.gotoAndStop(spriteOrder[i]);
      piece.x = x * imgWidth / rows + imgWidth / rows / 2;
      piece.y = y * imgWidth / rows + imgWidth / rows / 2;

      piece.rotation = Math.floor(Math.random() * 4) * 90;
      mapContainer.addChild(piece);
      piece.addEventListener("mousedown", function (event) {
        if (isComplete()) return;

        if (event.nativeEvent.button === 2) {
          onRightMouseDown(event)
        } else {
          onLeftMouseDown(event)
        }
      });
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
  let column = Math.floor(x / rowWidth);
  let row = Math.floor(y / rowWidth);
  column = Math.max(0, Math.min(rows, column));
  row = Math.max(0, Math.min(rows, row));
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

  restorePosition(misplacedTile);

  if (mouseDownEvent.currentTarget === null || fromTile == null) return;

  if (mouseDownEvent.currentTarget.row !== fromTile.row
    || mouseDownEvent.currentTarget.column !== fromTile.column) {
    // We are hovering over a new tile!

    misplacedTile = fromTile;
    fromTile.x = mouseDownEvent.currentTarget.column * rowWidth + imgWidth/rows/2;
    fromTile.y = mouseDownEvent.currentTarget.row * rowWidth + imgWidth/rows/2;
  }
}

function onLeftMouseDown(event) {
  mouseDownEvent = event;

  restorePosition(misplacedTile);

  // Render on top
  mapContainer.setChildIndex(mouseDownEvent.currentTarget, mapContainer.getNumChildren()-1);
  createjs.Ticker.addEventListener("tick", tick);
}

let isRotating = false;
function onRightMouseDown(event) {
  if (isRotating) return;
  isRotating = true;
  createjs.Tween.get(event.currentTarget)
    .to({rotation: event.currentTarget.rotation + 90}, 200)
    .call(function() {
      isRotating = false;
      if (isComplete()) setTimeout(onComplete, 2000)
    })
}

function onMouseUp(event) {
  if (event.nativeEvent.button !== 0 || isComplete()) return;

  createjs.Ticker.removeEventListener("tick", tick);
  const pt = mapContainer.globalToLocal(mapContainer.stage.mouseX, mapContainer.stage.mouseY);
  const newTilePos = getNearestPiece(pt.x, pt.y);
  const otherPiece = findPieceByRowAndColumn(newTilePos.row, newTilePos.column);

  if (otherPiece === null) {
    restorePosition(mouseDownEvent.currentTarget);
  } else {
    otherPiece.row = mouseDownEvent.currentTarget.row;
    otherPiece.column = mouseDownEvent.currentTarget.column;
    restorePosition(otherPiece);
    mouseDownEvent.currentTarget.row = newTilePos.row;
    mouseDownEvent.currentTarget.column = newTilePos.column;
    restorePosition(mouseDownEvent.currentTarget);
  }

  if (isComplete()) setTimeout(onComplete, 2000)
}

function restorePosition(piece) {
  // Restore misplaced
  const rowWidth = imgWidth/rows;
  if (piece !== null) {
    piece.x = piece.column * rowWidth + imgWidth/rows/2;
    piece.y = piece.row * rowWidth + imgWidth/rows/2;
  }
}

function isComplete() {
  for (let i = 0; i < rows*rows; i++) {
    let piece = pieces[i];
    if (piece.currentFrame !== piece.row * rows + piece.column || piece.rotation % 360 !== 0) return false;
  }
  return true;
}

function onComplete() {
  if (ended) return; // Debounce
  ended = true;
  console.log("Completed!");

  // TODO: Dialogue

  createjs.Tween.get(mapContainer)
    .to({y: mapContainer.y + 50, alpha: 0}, 1000)
    .call(function() {
      main.foreground.removeChild(mapContainer);
    })

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
