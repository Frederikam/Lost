import main from '../main.js'
import dialogue from '../ui/dialogue.js'
import audio from "../audio"
import stage2 from "../stage2/stage2.js"

const module = {};

const imgWidth = 700;
const rows = 4;

const spritesheet = new createjs.SpriteSheet({
  images: ["assets/images/stage1/map.jpg"],
  frames: {width: imgWidth / rows, height: imgWidth / rows, regX: imgWidth / rows / 2, regY: imgWidth / rows / 2},
});

//module.background = "assets/images/stage1/prologue.jpg";

const pieces = [];
let mapContainer;
let ended = false;

let background = null;

module.run = function () {
  /* Dialogue */
  dialogue.actorLeft.setFrame(dialogue.sumireko);
  dialogue.actorLeft.setActive(false, 500);
  dialogue.actorRight.setVisible(false, 0);
  dialogue.actorRight.setFrame(dialogue.reisen);
  dialogue.setVisible(true);
  dialogue.setText("[ This was just another day in Sumireko's boring life spent looking for ways to go back to Gensōkyō. " +
    "One night, upon visiting a Shrine, she found an old, handmade journal. ]");

  background = new createjs.Bitmap("assets/images/stage1/prologue.jpg");
  background.alpha = 0;
  main.background.addChild(background);
  createjs.Tween.get(background)
    .to({alpha: 1}, 1000);

  const timeline = [
    () => {
      dialogue.actorLeft.speak('Sumireko: "Hm? What’s with this old journal?"')
    }, () => {
      dialogue.setText('[Sumireko opened the journal to look on the inside.]')
    }, () => {
      dialogue.actorLeft.speak('Sumireko: "Spell cards? And several pages are missing. Someone must have ripped them off for a reason…"');
    }, () => {
      dialogue.setText('[As the girl flipped through the pages, the journal started emitting a strong blinding light.]')
    }, () => {
      dialogue.actorLeft.speak('Sumireko: "What the hell?! Waaaah!!"');
      createjs.Tween.get(main.background)
        .to({alpha: 0}, 1000);
    }, () => {
      dialogue.setText('[Sumireko is asleep on the floor. She slowly awoke in response to birds chirping and the morning sunlight.]')
    }, () => {
      dialogue.setText('[After picking her glasses up from the floor, she looks around to see an endless bamboo grove.]');
      // Remove old bg
      main.background.removeChild(background);

      background = new createjs.Bitmap("assets/images/stage1/background1.jpg");
      main.background.alpha = 0;
      main.background.addChild(background);
      createjs.Tween.get(main.background)
        .to({alpha: 1}, 1000)
    }, () => {
      dialogue.actorLeft.speak('Sumireko: "Is this… Gensōkyō?"');
    }, () => {
      dialogue.setText('[Sumireko noticed the journal opened on the ground and picked it up to take another look.]')
    }, () => {
      dialogue.actorLeft.speak('Sumireko: "Not a single note in this book?"');
    }, () => {
      dialogue.setText('[She sighed and stood back up again. It was time for another adventure!]')
    }, () => {
      dialogue.setText('[...]');
      createjs.Tween.get(main.background)
        .to({alpha: 0}, 500)
    }, () => {
      dialogue.setText('[......]')
    }, () => {
      dialogue.setText('[.........]')
    }, () => {
      dialogue.actorLeft.speak('Sumireko: "I’ve had enough! I’ve been walking for three hours in a single direction and it’s the same broken bamboo again!"');
      createjs.Tween.get(main.background)
        .to({alpha: 1}, 500)

    }, () => {
      dialogue.setText('[Sumireko sits on a stone and pulls out her smartphone.]')
    }, () => {
      dialogue.actorLeft.speak('Sumireko: "I guess I’ll take a picture and try to walk in another direction."');
    }, () => {
      dialogue.setText('[She pointed her phone to the broken bamboo and…]')
    }, () => {
      dialogue.actorLeft.speak('Sumireko: "Hm? A rabbit in the bamboo?"');
    }, () => {
      dialogue.setText('[She raised her head and saw a small group of white rabbits.]')
    }, () => {
      dialogue.setText('[Sumireko ran towards the rabbits. Frightened, they begin to flee.]')
    }, () => {
      dialogue.actorLeft.speak('Sumireko: "If I can’t find a way out by myself, at least I could use some help from these rabbits!"');
    }, () => {
      dialogue.setText('[Sumireko ran into a clearing, and encountered a familiar face.]')
    }, () => {
      dialogue.actorRight.speak('Reisen: "You’re that human from before. What are you doing here in the Bamboo Forest of the Lost?"');
    }, () => {
      dialogue.actorLeft.speak('Sumireko: "Well… I’m lost! I can’t find my way out here… Can you help me?"');
    }, () => {
      dialogue.actorRight.speak('Reisen: "You were chasing the rabbits, weren\'t you? Why should I help you?"');
    }, () => {
      dialogue.actorLeft.speak('Sumireko: "I was not chasing them! I followed them to find an exit, until I ran into you!"');
    }, () => {
      dialogue.actorRight.speak('Reisen: "You’re deep inside the Bamboo Forest and chasing the rabbits, I’ll stop you from going any further!"');
    }, () => {
      dialogue.actorLeft.speak('Sumireko: "I’m not looking for a fight here, but you’re asking for it! Get ready!"');
    }, () => {
      dialogue.actorRight.speak('Reisen: "Since you don’t look so threatening, let’s see if you can solve this super complex puzzle. I’ve spent nights working on it!"');
    }, () => {
      dialogue.actorLeft.speak('Sumireko: "Bring it on!"');
    }, () => {
      dialogue.setAutoStep(false);
      dialogue.actorLeft.setVisible(false, 300);
      dialogue.actorRight.setVisible(false, 300);
      dialogue.setText('Drag and drop puzzle pieces to solve the puzzle. Use the right mouse button to rotate.');
      setTimeout(module.begin, 500);
    }
  ];

  dialogue.setTimeline(timeline);
  dialogue.setAutoStep(true);
};

module.begin = function() {
  audio.setMusic("puzzle");

  /* Begin gameplay */
  ended = false;
  mapContainer = new createjs.Container();
  mapContainer.x = 1920 / 2;
  mapContainer.y = 450;
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

  //onComplete(); // For testing
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

function onComplete() {
  if (ended) return; // Debounce
  ended = true;
  console.log("Completed!");

  createjs.Tween.get(mapContainer)
    .to({y: mapContainer.y + 50, alpha: 0}, 1000)
    .call(function() {
      main.foreground.removeChild(mapContainer);
    });

  dialogue.actorRight.speak('Reisen: "It looks like you won… (And I’ll get Tewi later for this!!)"');

  audio.setMusic("menu");

  const timeline = [
    () => {
      dialogue.actorLeft.speak('Sumireko: "Now please show me the exit."');
    }, () => {
      dialogue.setText('[Sumireko then finds her way out with Reisen\'s help.]');
    }, () => {
      dialogue.actorRight.setVisible(false, 500);
      dialogue.setText('[The journal started glowing inside, and Sumireko opened it, curious at whatever was happening.]');
    },() => {
      dialogue.actorLeft.speak('Sumireko: "A page was restored!"');
    }, () => {
      dialogue.actorLeft.speak('Sumireko: "If I fill the missing pages, will you bring me back home?"');
    }, () => {
      dialogue.setText('[The journal started glowing again as if to nod.]');
    }, () => {
      dialogue.setVisible(false);
      dialogue.actorLeft.setVisible(false, 300);
      dialogue.setAutoStep(false);
      createjs.Tween.get(background)
        .to({alpha: 0}, 1000)
        .call(() => {
          main.background.removeChild(background);
          stage2.run();
        });
    }
  ];

  dialogue.setTimeline(timeline);
  dialogue.setAutoStep(true);
}

export default module;
