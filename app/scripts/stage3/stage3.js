import main from "../main.js"
import dialogue from '../ui/dialogue.js'
import audio from "../audio";
import stage3 from "../stage3/stage3.js"

const module = {};

var slider_start_piece; // Keeps the id of the starting slider puzzle piece
var slider_puzzle = []; // Holds all sprite data for puzzle pieces
var slider_list = []; // Current position of all puzzle pieces
var empty; // Holds the position of the blank space
var piece_center = 90;
var piece_startx = 600;
var piece_starty = 180;
var slider_solved; // Prevents further interaction with puzzle and starts end sequence

module.background = "assets/images/menu_bg.jpg";

let background;

let sliderContainer = new createjs.Container();

// Menu assets
var slider_bg =       new createjs.Bitmap("assets/images/menu_bg.jpg");
var slider_board =    new createjs.Bitmap("assets/images/slider/board.png");
var slider_congrats = new createjs.Bitmap("assets/images/slider/congrats.png");

let ended = false;

module.run = function() {
  /* Dialogue */
  dialogue.actorLeft.setFrame(dialogue.sumireko);
  dialogue.actorLeft.setActive(false, 500);
  dialogue.actorRight.setVisible(false, 0);
  dialogue.actorRight.setFrame(dialogue.shinmyoumaru);
  dialogue.setVisible(true);
  dialogue.setText("[Sumireko finally arrived at the Hakurei Shrine.]");

  /*
  background = new createjs.Bitmap("assets/images/stage1/prologue.jpg");
  background.alpha = 0;
  main.background.addChild(background);
  createjs.Tween.get(background)
    .to({alpha: 1}, 1000);*/

  const timeline = [
    () => {
      dialogue.actorLeft.speak('Sumireko: "Hm? What’s with this old journal?"')
    }, () => {
      dialogue.setText('Sumireko [rang] the bell. She waited for a minute, but nobody was home. The journal started glowing again.')
    }, () => {
      dialogue.setText('[In the journal was written "Go inside and take the Miracle Mallet, the inchling will show up."]')
    }, () => {
      dialogue.setText('[Sumireko took off her shoes and entered the shrine. As soon as she entered, she was stung in the foot."]')
    }, () => {
      dialogue.actorLeft.speak('Sumireko: "Ouch! That hurts!"')
    }, () => {
      dialogue.setText('Unknown: "Hey, you! I’m right here! Don’t ignore me!"')
    }, () => {
      dialogue.actorLeft.speak('Sumireko: "Who\'s there?"')
    }, () => {
      dialogue.setText('[Sumireko felt another sting in her foot and looked down.' +
        'A small girl wearing a red kimono and holding a needle was close her feet.]');
      dialogue.actorRight.setVisible(true, 300);
    }, () => {
      dialogue.actorLeft.speak('Sumireko: "Oh, you’re the inchling Seija spoke of."')
    }, () => {
      dialogue.actorRight.speak('Shinmyoumaru: "I’m Shinmyoumaru and I’m guarding the Shrine while Reimu is out!')
    }, () => {
      dialogue.actorRight.speak('Shinmyoumaru: "Are you looking for trouble? I may be small, but I’m not half!!')
    }, () => {
      dialogue.actorLeft.speak('Sumireko: "Seija told me you know something about the Miracle Mallet, so I think maybe you could help me."')
    }, () => {
      dialogue.setText('[Shinmyoumaru stopped for a moment to think, and meanwhile Sumireko opened the journal to find more instructions.]')
    }, () => {
      dialogue.setText('[Written in the book is "Think of a way to make the inchling use the Miracle Mallet in the book"]')
    }, () => {
      dialogue.actorRight.speak('Shinmyoumaru: "Yes, I’m its former owner. The Miracle Mallet is a tool you could use to increase the size of things and grant a wish of the user.')
    }, () => {
      dialogue.actorRight.speak('Shinmyoumaru: "It must be charged before using it. We inchlings are the only ones who can activate its true power.')
    }, () => {
      dialogue.actorLeft.speak('Sumireko: "If it increases the size of things, can it also increase the quantity?"')
    }, () => {
      dialogue.actorRight.speak('Shinmyoumaru: "Hm? Quantity… I don’t know. I’ve never tried that before…')
    }, () => {
      dialogue.actorLeft.speak('Sumireko: "See this journal here, many pages are still missing and I’d like to have more pages to write on."')
    }, () => {
      dialogue.setAutoStep(false);
      dialogue.actorLeft.setVisible(false, 300);
      dialogue.actorRight.setVisible(false, 300);
      dialogue.setVisible(false);
      setTimeout(module.begin, 500);
    }
  ];

  dialogue.setTimeline(timeline);
  dialogue.setAutoStep(true);
};

module.begin = function() {
  var data = {
    images: ["assets/images/nue_puzzle.jpg"],
    frames: {width:180, height: 180, regX: 90, regY: 90},
    animations: {
      "0": 0,
      "1": 1,
      "2": 2,
      "3": 3,
      "4": 4,
      "5": 5,
      "6": 6,
      "7": 7,
      "8": 8,
      "9": 9,
      "10": 10,
      "11": 11,
      "12": 12,
      "13": 13,
      "14": 14,
      "15": 15,
      "16": 16,
      "17": 17,
      "18": 18,
      "19": 19,
      "20": 20,
      "21": 21,
      "22": 22,
      "23": 23,
      "24": 24
    }
  };
  var spritesheet = new createjs.SpriteSheet(data);

  // Asset coordinates
  slider_board.x = 960;
  slider_board.y = 540;
  slider_board.regX = 525;
  slider_board.regY = 525;

  // Hide congrats message
  slider_congrats.alpha = 0;
  slider_congrats.scaleX = .5;
  slider_congrats.scaleY = .5;
  slider_congrats.x = 960;
  slider_congrats.y = 540;
  slider_congrats.regX = 250;
  slider_congrats.regY = 45;

  /*
  menu_title.x = 960;
  menu_title.y = 280;
  menu_title.regX = 520;
  menu_title.alpha = 0;
  menu_title.scaleX = .5;
  menu_title.scaleY = .5;
  */

  // Add assets to stage
  sliderContainer.addChild(slider_bg);
  sliderContainer.addChild(slider_board);
  sliderContainer.addChild(slider_congrats);

  sliderContainer.alpha = 0;
  main.foreground.addChild(sliderContainer);
  createjs.Tween.get(sliderContainer)
    .to({alpha: 1}, 1000);

  // Define initial placement of puzzle pieces
  for(var i=0;i<25;i++) {
    slider_puzzle.push(new createjs.Sprite(spritesheet, i));
    if(i==0) {
      // Get starting id for puzzle pieces
      slider_start_piece = slider_puzzle[i].id;
    }
    // Check for last piece, turn alpha to 0
    if(i==24) {
      slider_puzzle[i].alpha = 0;
    }
  }

  const tileCount = 25;

  // Shuffle puzzle
  shuffle(slider_puzzle);
  // Verify the puzzle is solvable
  for(let i=0;(i<1000);i++) {
    if(!isSolvable()) {
      console.log("re-shuffling!");
      shuffle(slider_puzzle);
    }
    else {
      break;
    }
  }

  // Add pieces to board
  for(let i=0;i<25;i++) {
    const col = i % 5;
    const row = Math.floor(i / 5);

    // Find blank space position
    if(slider_puzzle[i] == 24) {
      emptyspace = i;
    }

    slider_puzzle[i].x = (piece_startx + ((piece_center*2)*col));
    slider_puzzle[i].y = (piece_starty + ((piece_center*2)*row));

    sliderContainer.addChild(slider_puzzle[i]);
    slider_puzzle[i].stop(); // Prevent animation for each piece

    // Define mouse interactions for pieces
    slider_puzzle[i].addEventListener("click", handleMouseEvent);

    // Populate starting list of slider puzzle pieces after shuffle
    slider_list.push(slider_puzzle[i].id);
  }

  //onComplete(); // For testing
};

function onComplete() {
  //if (ended) return; // Debounce
  //ended = true;
  console.log("Completed!");

  createjs.Tween.get(sliderContainer)
    .to({y: sliderContainer.y + 50, alpha: 0}, 1000)
    .call(function() {
      main.foreground.removeChild(sliderContainer);
    });

  setTimeout(() => {
    dialogue.actorLeft.setFrame(dialogue.sumireko);
    dialogue.actorRight.setFrame(dialogue.nue);
    dialogue.setVisible(true);
    dialogue.actorRight.speak('Nue: "No way! I lost my own game!"');

    dialogue.setVisible(true);

    const timeline = [
      () => {
        dialogue.actorLeft.speak('Sumireko: "I’m tired now and I wanna go home… No more fighting with Gensōkyō weirdos for today!"');
      }, () => {
        dialogue.setText("[A familiar voice came from outside the shrine.]");
        dialogue.actorLeft.setVisible(false, 300)
      }, () => {
        dialogue.setText("Who’s there?! Shinmyoumaru?! Are you inside?!");
      }, () => {
        dialogue.actorLeft.speak('Sumireko: "Oh crap! It’s that angry maiden from before! I gotta hide quickly and…!"');
      }, () => {
        dialogue.setText("[Sumireko felt a hand on her shoulder.]");
      }, () => {
        dialogue.actorRight.setFrame(dialogue.reimu);
        dialogue.actorRight.speak('Reimu: "You gotta do what?"');
      }, () => {
        dialogue.setText("[Sumireko was fast to lay down and bow before the angry shrine maiden.]");
      }, () => {
        dialogue.actorLeft.speak('Sumireko: "Sorry for the trouble! I just want to go home!"');
      }, () => {
        dialogue.actorRight.speak('Reimu: "Why do you have all these spell cards with you? You better start speaking…"');
      }, () => {
        dialogue.actorLeft.speak('Sumireko: "I-I…"');
      }, () => {
        dialogue.actorLeft.setVisible(false, 300);
        setTimeout(() => {
          dialogue.actorLeft.setFrame(dialogue.shinmyoumaruMirrored);
          dialogue.actorLeft.setVisible(true, 300);
          dialogue.actorLeft.speak('Shinmyoumaru: "Wait Reimu! I can explain that!"');
        }, 350);
      }, () => {
        dialogue.setText("[Reimu listened while the inchling explained what happened. Reimu sighed.]");
      }, () => {
        dialogue.actorRight.speak('Reimu: "I don’t know how the Akyuu’s Spell Card Register ended up in the Human World, but we’ll more careful now!"');
      }, () => {
        dialogue.actorRight.speak('Reimu: "As for you, Sumireko, I’ll be sending you home soon."');
      }, () => {
        dialogue.actorLeft.setVisible(false, 300);
        setTimeout(() => {
          dialogue.actorLeft.setFrame(dialogue.sumireko);
          dialogue.actorLeft.setVisible(true, 300);
          dialogue.actorLeft.speak('Sumireko: "Can I come back to Gensōkyō another day?"');
        }, 350);
      }, () => {
        dialogue.actorRight.speak('Reimu: "Unfortunately not. We still don’t know how it was possible for you to come here in the first place."');
      }, () => {
        dialogue.actorRight.speak('Reimu: "I’m sorry, but we must check the barrier and make sure no outsiders get into Gensōkyō."');
      }, () => {
        dialogue.setText("[Sumireko sighed. Even though she knew what the answer would be, she had a small spark of hope inside.]");
      }, () => {
        dialogue.setText("[The girls went outside the shrine and Reimu cast a spell to open a portal.]");
      }, () => {
        dialogue.actorRight.setVisible(false, 500);
        dialogue.setText("[Sumireko got into the portal and in a blink she was back to the shrine where her adventure had started.]");
        createjs.Tween.get(main.background)
          .to({alpha: 0}, 1000)
          .call(() => {
            main.background.removeAllChildren();
            main.background.alpha = 1;
            const background = new createjs.Bitmap("assets/images/stage1/prologue.jpg");
            background.alpha = 0;
            main.background.addChild(background);
            createjs.Tween.get(background)
              .to({alpha: 1}, 1000);
          })
      }, () => {
        dialogue.actorLeft.speak('Sumireko: "It was a cool adventure, and even with all that trouble I got into, I want to go back someday… To Gensōkyō"');
      }, () => {
        dialogue.setText("The end");
        dialogue.actorLeft.setVisible(false, 500);
        dialogue.setAutoStep(false);
      }
    ];

    dialogue.setTimeline(timeline);
    dialogue.setAutoStep(true);
  }, 2000);
}


// Shuffle pieces for puzzle
function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function sumInversions() {
  var inversions = 0;
  // Loop for each number
  for(var i=0;i<25;i++) {
    // Loop for each comparison
    for(var j=(i+1);j<25;j++) {
      // Is the target number smaller than itself?
      if(slider_puzzle[i].id > slider_puzzle[j].id) {
        inversions++;
      }
    }
  }
  console.log(inversions);
  return inversions;
}

function isSolvable() {
  var sum = sumInversions();
  if(sum % 2 == 1 && sum % 5 == 0 && sum % 10 != 0 && (sum == 125 || sum == 145 || sum == 185)) {
    // Check which row the empty box is in
    for(var i=0;i<25;i++) {
      if(slider_puzzle[i].id == (24+slider_start_piece) && ((Math.floor(i / 5)) % 2 == 1) && (i%5 == 0 || i%5 == 2 || i%5 == 4)) {
        console.log("Empty grid: "+i);
        return true;
      }
    }
    return false;
  }
  else {
    return false;
  }

}

function handleMouseEvent(event) {
  if(slider_solved != 1) {
    // Initialize variables
    var clicked_grid, clicked_id, empty_grid, empty_id, clicked_key, empty_key;

    // What was selected?
    // slider_list[grid] = id;
    for(var i=0;i<25;i++) {
      if(slider_list[i] == event.target.id) {
        clicked_grid = i;
        clicked_id = event.target.id;
        break;
      }
    }

    // Where is slider_list[?] = 24? (24 + slider_start_piece)
    for(var i=0;i<25;i++) {
      if(slider_list[i] == (24 + slider_start_piece)) {
        empty_grid = i;
        empty_id = (24 + slider_start_piece);
        break;
      }
    }

    // What is the equivalent key for the matching clicked slider id?
    for(var i=0;i<25;i++) {
      if(slider_puzzle[i].id == slider_list[clicked_grid]) {
        clicked_key = i;
        break;
      }
    }

    // What is the equivalent key for the matching empty slider id?
    for(var i=0;i<25;i++) {
      if(slider_puzzle[i].id == slider_list[empty_grid]) {
        empty_key = i;
        break;
      }
    }

    // Where are they in relation to each other?
    // Move Up
    if((clicked_grid - 5) == empty_grid) {
      // Animate
      // Move clicked to empty position
      createjs.Tween.get(slider_puzzle[clicked_key], { loop: false })
        .to({y: (piece_starty+(180*(Math.floor(empty_grid/5))))}, 250, createjs.Ease.getPowInOut(2));
      // Move empty to clicked position
      createjs.Tween.get(slider_puzzle[empty_key], { loop: false })
        .to({y: (piece_starty+(180*(Math.ceil((empty_grid)/5))))}, 250, createjs.Ease.getPowInOut(2));
      // Store new values
      var old_clicked_id = slider_list[clicked_grid];
      var old_empty_id = slider_list[empty_grid];
      slider_list[clicked_grid] = old_empty_id;
      slider_list[empty_grid] = old_clicked_id;
    }
    // Move Down
    else if((clicked_grid + 5) == empty_grid) {
      // Animate
      // Move clicked to empty position
      createjs.Tween.get(slider_puzzle[clicked_key], { loop: false })
        .to({y: ((piece_starty*2)+(180*(Math.floor(clicked_grid/5))))}, 250, createjs.Ease.getPowInOut(2));
      // Move empty to clicked position
      createjs.Tween.get(slider_puzzle[empty_key], { loop: false })
        .to({y: ((piece_starty*(Math.floor(empty_grid/5))))}, 250, createjs.Ease.getPowInOut(2));
      // Store new values
      var old_clicked_id = slider_list[clicked_grid];
      var old_empty_id = slider_list[empty_grid];
      slider_list[clicked_grid] = old_empty_id;
      slider_list[empty_grid] = old_clicked_id;
    }
    // Move Left
    else if((clicked_grid - 1) == empty_grid && (clicked_grid % 5) != 0) {
      // Animate
      // Move clicked to empty position
      createjs.Tween.get(slider_puzzle[clicked_key], { loop: false })
        .to({x: (piece_startx+(180*(empty_grid % 5)))}, 250, createjs.Ease.getPowInOut(2));
      // Move empty to clicked position
      createjs.Tween.get(slider_puzzle[empty_key], { loop: false })
        .to({x: (piece_startx+(180*(clicked_grid % 5)))}, 250, createjs.Ease.getPowInOut(2));
      // Store new values
      var old_clicked_id = slider_list[clicked_grid];
      var old_empty_id = slider_list[empty_grid];
      slider_list[clicked_grid] = old_empty_id;
      slider_list[empty_grid] = old_clicked_id;
    }
    // Move Right
    else if((clicked_grid + 1) == empty_grid && (empty_grid % 5) != 0) {
      // Animate
      // Move clicked to empty position
      createjs.Tween.get(slider_puzzle[clicked_key], { loop: false })
        .to({x: (piece_startx+(180*(empty_grid % 5)))}, 250, createjs.Ease.getPowInOut(2));
      // Move empty to clicked position
      createjs.Tween.get(slider_puzzle[empty_key], { loop: false })
        .to({x: (piece_startx+(180*(clicked_grid % 5)))}, 250, createjs.Ease.getPowInOut(2));
      // Store new values
      var old_clicked_id = slider_list[clicked_grid];
      var old_empty_id = slider_list[empty_grid];
      slider_list[clicked_grid] = old_empty_id;
      slider_list[empty_grid] = old_clicked_id;
    }
    else {
      // Invalid move
      //console.log("Empty Grid: "+empty_grid+", ID: "+empty_id+" | Clicked Grid: "+clicked_grid+", ID: "+clicked_id+"; invalid move");
    }
    console.log(slider_list[0]+"-"+slider_list[1]+"-"+slider_list[2]+"-"+slider_list[3]+"-"+slider_list[4]);
    console.log(slider_list[5]+"-"+slider_list[6]+"-"+slider_list[7]+"-"+slider_list[8]+"-"+slider_list[9]);
    console.log(slider_list[10]+"-"+slider_list[11]+"-"+slider_list[12]+"-"+slider_list[13]+"-"+slider_list[14]);
    console.log(slider_list[15]+"-"+slider_list[16]+"-"+slider_list[17]+"-"+slider_list[18]+"-"+slider_list[19]);
    console.log(slider_list[20]+"-"+slider_list[21]+"-"+slider_list[22]+"-"+slider_list[23]+"-"+slider_list[24]);
    console.log("---");


    // Check if the puzzle is solved
    var puzzle_incorrect = 0;
    for(var i=0;i<24;i++) {
      if(slider_list[i] < slider_list[(i+1)]) {
        // Good, keep looping
      }
      else {
        // Incorrect entry found
        puzzle_incorrect = 1;
        break;
      }
    }
    if(puzzle_incorrect === 0) {
      // Disable interaction
      slider_solved = 1;
      // Show last piece to complete puzzle
      // Fade out all puzzle elements
      for(var i=0;i<25;i++) {
        createjs.Tween.get(slider_puzzle[i], { loop: false })
          .to({alpha: 1}, 2000, createjs.Ease.getPowInOut(2))
          .wait(3000)
          .to({alpha: 0}, 500, createjs.Ease.getPowInOut(2));
      }
      createjs.Tween.get(slider_board, { loop: false })
        .wait(5000)
        .to({alpha: 0}, 500, createjs.Ease.getPowInOut(2));
      // Congratulations message
      createjs.Tween.get(slider_congrats, { loop: false })
        .wait(5250)
        .to({scaleX: 1, scaleY: 1, alpha: 1}, 750, createjs.Ease.getPowInOut(2))
        .wait(2000)
        .to({x: -1000, alpha: 0}, 1500, createjs.Ease.getPowInOut(2));

      onComplete();
    }
  }
}

export default module;
