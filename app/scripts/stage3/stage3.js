import main from '../main.js'
import dialogue from "../ui/dialogue";

const module = {};

// Variables
var cm_past_guess_container = new Array(4);
for(var i=0;i<4;i++) {
  cm_past_guess_container[i] = new Array(4);
}

var cm_piece = []; // Stores values for pieces
var cm_past_guess = [[0,0,0,0],[0,0,0,0],[0,0,0,0]]; // Stores values for past guesses
var cm_spaces = []; // Empty space for player to place pieces for puzzle
var cm_space_id = []; // Stores IDs for player-interactive spaces
var clicked_last; // Stores id of the last clicked item
var cm_thumb_id = []; // Stores IDs of color thumbnails
var cm_answer = []; // Stores ran generated answer for player to guess
var cm_guess = [7,7,7,7]; // Stores player guess

// Selection pieces
var red, yellow, green, blue, purple, white;
var cm_image = []; // Stores bitmaps for main color piece placement in blank spaces

module.run = function () {
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
      dialogue.setText('Drag and drop puzzle pieces to solve the puzzle. Use the right mouse button to rotate.');
      setTimeout(module.begin, 500);
    }
  ];

  dialogue.setTimeline(timeline);
  dialogue.setAutoStep(true);
};

module.begin = function() {

  // Menu assets
  var menu_bg = new createjs.Bitmap("assets/images/menu_bg.jpg");
  
      // Puzzle assets
      cm_piece.push(""); // 0
      cm_piece.push("assets/images/colormatch/red.png"); // 1
      cm_piece.push("assets/images/colormatch/yellow.png"); // 2
      cm_piece.push("assets/images/colormatch/green.png"); // 3
      cm_piece.push("assets/images/colormatch/blue.png"); // 4
      cm_piece.push("assets/images/colormatch/purple.png"); // 5
      cm_piece.push("assets/images/colormatch/white.png"); // 6
  
      cm_piece.push("assets/images/colormatch/correct.png"); // 7
      cm_piece.push("assets/images/colormatch/incorrect.png"); // 8
      cm_piece.push("assets/images/colormatch/correct_icon.png"); // 9
      cm_piece.push("assets/images/colormatch/incorrect_icon.png"); // 10
      cm_piece.push("assets/images/colormatch/space.png"); // 11
  
      // Container coordinates
  
      // Add assets to stage
      stage.addChild(menu_bg);
      
      // Populate past guess table
      // Rows for past guesses
      for(var i=0;i<4;i++) {
          var startx = 600;
          var starty = 50;
          // Columns for past guesses
          for(var j=0;j<3;j++) {
              cm_past_guess_container[i][j] = new createjs.Bitmap(cm_piece[4]);
              cm_past_guess_container[i][j].x = (startx+(i*150));
              cm_past_guess_container[i][j].y = (starty+(j*130));
              // Alpha
              cm_past_guess_container[i][j].alpha = ((j+2)/5); // Gradually fade the earliest given answer out
              cm_past_guess_container[i][j].width = 20;
              cm_past_guess_container[i][j].height = 20;
              //cm_past_guess[i][j] = 0;
              stage.addChild(cm_past_guess_container[i][j]);
          }
      }
  
      // Populate past results table
      // Rows for past results
      for(var i=0;i<4;i++) {
          var startx = 1180;
          var starty = 70;
          // Columns for past guesses
          for(var j=0;j<3;j++) {
              cm_past_guess_container[i][j] = new createjs.Bitmap(cm_piece[10]);
              if(i<2) {
                  cm_past_guess_container[i][j].x = (startx+(i*25));
                  cm_past_guess_container[i][j].y = (starty+(j*130));
              }
              else {
                  cm_past_guess_container[i][j].x = (startx+((i-2)*25));
                  cm_past_guess_container[i][j].y = (starty+30+(j*130));
              }
              // Alpha
              cm_past_guess_container[i][j].alpha = ((j+2)/5);
              cm_past_guess_container[i][j].width = 20;
              cm_past_guess_container[i][j].height = 20;
              //cm_past_guess[i][j] = 0;
              stage.addChild(cm_past_guess_container[i][j]);
          }
      }
  
      // Draw empty circles for piece placement
      for(var i=0;i<4;i++) {
          var startx = 550;
          var starty = 550;
  
          cm_spaces[i] = new createjs.Bitmap(cm_piece[11]);
          cm_spaces[i].x = (startx + (200*i));
          cm_spaces[i].y = starty;
  
          stage.addChild(cm_spaces[i]);
  
          cm_spaces[i].addEventListener("click", handleMouseEvent);
  
          cm_space_id.push(cm_spaces[i].id);
          //console.log(cm_space_id[i]);
  
          // Generate sequence of colors to guess
          function getRandomInt(min, max) {
              return Math.floor(Math.random() * (max - min + 1)) + min;
          }
  
          cm_answer.push(getRandomInt(0,5));
          console.log(cm_answer[i]);
      }
  
      // Draw selection pieces (invisible)
      // Red - 
      red = new createjs.Shape();
      red.graphics.beginFill("red").drawCircle(0,0,20);
      red.alpha = 0;
      stage.addChild(red);
      cm_thumb_id[0] = red.id;
      red.addEventListener("click", handleMouseEvent);
      // Yellow - 2
      yellow = new createjs.Shape();
      yellow.graphics.beginFill("yellow").drawCircle(0,0,20);
      yellow.alpha = 0;
      stage.addChild(yellow);
      cm_thumb_id[1] = yellow.id;
      yellow.addEventListener("click", handleMouseEvent);
      // Green - 3
      green = new createjs.Shape();
      green.graphics.beginFill("green").drawCircle(0,0,20);
      green.alpha = 0;
      stage.addChild(green);
      cm_thumb_id[2] = green.id;
      green.addEventListener("click", handleMouseEvent);
      // Blue - 4
      blue = new createjs.Shape();
      blue.graphics.beginFill("blue").drawCircle(0,0,20);
      blue.alpha = 0;
      stage.addChild(blue);
      cm_thumb_id[3] = blue.id;
      blue.addEventListener("click", handleMouseEvent);
      // Purple - 5
      purple = new createjs.Shape();
      purple.graphics.beginFill("purple").drawCircle(0,0,20);
      purple.alpha = 0;
      stage.addChild(purple);
      cm_thumb_id[4] = purple.id;
      purple.addEventListener("click", handleMouseEvent);
      // White - 6
      white = new createjs.Shape();
      white.graphics.beginFill("white").drawCircle(0,0,20);
      white.alpha = 0;
      stage.addChild(white);
      cm_thumb_id[5] = white.id;
      white.addEventListener("click", handleMouseEvent);
  
      // Populate images for pieces
      cm_image.push(new createjs.Bitmap(cm_piece[1]));
      cm_image.push(new createjs.Bitmap(cm_piece[2]));
      cm_image.push(new createjs.Bitmap(cm_piece[3]));
      cm_image.push(new createjs.Bitmap(cm_piece[4]));
      cm_image.push(new createjs.Bitmap(cm_piece[5]));
      cm_image.push(new createjs.Bitmap(cm_piece[6]));
};


function handleMouseEvent(event) {
  // Detect which space was clicked
  var clicked = event.target.id;
  console.log(clicked);

  // Find out if a clear space button was clicked
  for(var i=0;i<4;i++) {
      if(cm_space_id[i] == event.target.id) {
          // Check if displayed
          if(red.alpha == 0 || clicked_last != clicked) {
              // Display color selector
              // Get position of clicked button
              var clickedx = (cm_spaces[i].x+60);
              var clickedy = (cm_spaces[i].y+60);
              // Red - 1
              red.x = (clickedx + 0);
              red.y = (clickedy - 80);
              red.alpha = 1;
              // Yellow - 2
              yellow.x = (clickedx + 70);
              yellow.y = (clickedy - 40);
              yellow.alpha = 1;
              // Green - 3
              green.x = (clickedx + 70);
              green.y = (clickedy + 40);
              green.alpha = 1;
              // Blue - 4
              blue.x = (clickedx + 0);
              blue.y = (clickedy + 80);
              blue.alpha = 1;
              // Purple - 5
              purple.x = (clickedx - 70);
              purple.y = (clickedy + 40);
              purple.alpha = 1;
              // White - 6
              white.x = (clickedx - 70);
              white.y = (clickedy - 40);
              white.alpha = 1;
          }
          else if(clicked_last == clicked) {
              // Hide from display
              red.alpha = 0;
              yellow.alpha = 0;
              green.alpha = 0;
              blue.alpha = 0;
              purple.alpha = 0;
              white.alpha = 0;
          }
      }
  }

  // Find out if a thumbnail was clicked
  for(var i=0;i<6;i++) {
      if(cm_thumb_id[i] == event.target.id) {
          // i cooresponds to color
          // i = 0 = red / cm_piece[1] = red (add 1 to i)
          var colornum = i;
          
          for(var j=0;j<4;j++) {
              if(cm_space_id[j] == clicked_last) {
                  // Store selected color in last clicked space
                  //console.log(cm_spaces[j].image);
                  cm_spaces[j].image = cm_image[colornum].image;
                  //console.log(cm_spaces[j].image);
                  // Remove thumbnails from view
                  red.alpha = 0;
                  yellow.alpha = 0;
                  green.alpha = 0;
                  blue.alpha = 0;
                  purple.alpha = 0;
                  white.alpha = 0;

                  // Store player guess
                  cm_guess[j] = colornum;
                  console.log("Guess: "+cm_guess[j]);


                  // Check if all spaces are filled with a color
                  var spaceimgstr = '<img src="'+cm_piece[11]+'">';
                  //console.log("var: "+spaceimgstr);
                  if(cm_guess[0] != 7 && cm_guess[1] != 7 && cm_guess[2] != 7 && cm_guess[3] != 7) {
                      console.log("GUESS: "+cm_guess[0]+", "+cm_guess[1]+", "+cm_guess[2]+", "+cm_guess[3]);
                      console.log("ANSWER: "+cm_answer[0]+", "+cm_answer[1]+", "+cm_answer[2]+", "+cm_answer[3]);
                      // Compare logic
                      var correct = 1;
                      for(var k=0;k<4;k++) {
                          if(cm_answer[k] == cm_guess[k]) {
                              // Correct, move on
                              //console.log("CORRECT Answer comparison"+cm_answer[k]+", "+cm_guess[k]);
                          }
                          else {
                              correct = 0; // incorrect answer found
                              //console.log("INCORRECT Answer comparison"+cm_answer[k]+", "+cm_guess[k]);
                              //console.log("incorrect");
                              break;
                          }
                      }
                      // Check if correct is still true
                      if(correct == 1) {
                          // WIN
                          console.log("WIN");
                      }
                      else {
                          // Compare remaining guesses
                          console.log("Not this time");
                      }

                  }
                  else {
                      console.log("spaces still exist");
                      //console.log(cm_guess[0]+", "+cm_guess[1]+", "+cm_guess[2]+", "+cm_guess[3]);
                  }
              }
          }
      }
  }

  
  // Store last clicked
  clicked_last = clicked;
}

export default module;
