import main from '../main.js'

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

// Selection pieces
var red, yellow, green, blue, purple, white;
var r_img, y_img, g_img, b_img, p_img, w_img;

module.run = function () {

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
  main.background.addChild(menu_bg);

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
      main.foreground.addChild(cm_past_guess_container[i][j]);
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
      main.foreground.addChild(cm_past_guess_container[i][j]);
    }
  }

  // Draw empty circles for piece placement
  for(var i=0;i<4;i++) {
    var startx = 550;
    var starty = 550;

    cm_spaces[i] = new createjs.Bitmap(cm_piece[11]);
    cm_spaces[i].x = (startx + (200*i));
    cm_spaces[i].y = starty;

    main.foreground.addChild(cm_spaces[i]);

    cm_spaces[i].addEventListener("click", handleMouseEvent);

    cm_space_id.push(cm_spaces[i].id);
    //console.log(cm_space_id[i]);
  }

  // Draw selection pieces (invisible)
  // Red -
  red = new createjs.Shape();
  red.graphics.beginFill("red").drawCircle(0,0,20);
  red.alpha = 0;
  main.foreground.addChild(red);
  cm_thumb_id[0] = red.id;
  red.addEventListener("click", handleMouseEvent);
  // Yellow - 2
  yellow = new createjs.Shape();
  yellow.graphics.beginFill("yellow").drawCircle(0,0,20);
  yellow.alpha = 0;
  main.foreground.addChild(yellow);
  cm_thumb_id[1] = yellow.id;
  yellow.addEventListener("click", handleMouseEvent);
  // Green - 3
  green = new createjs.Shape();
  green.graphics.beginFill("green").drawCircle(0,0,20);
  green.alpha = 0;
  main.foreground.addChild(green);
  cm_thumb_id[2] = green.id;
  green.addEventListener("click", handleMouseEvent);
  // Blue - 4
  blue = new createjs.Shape();
  blue.graphics.beginFill("blue").drawCircle(0,0,20);
  blue.alpha = 0;
  main.foreground.addChild(blue);
  cm_thumb_id[3] = blue.id;
  blue.addEventListener("click", handleMouseEvent);
  // Purple - 5
  purple = new createjs.Shape();
  purple.graphics.beginFill("purple").drawCircle(0,0,20);
  purple.alpha = 0;
  main.foreground.addChild(purple);
  cm_thumb_id[4] = purple.id;
  purple.addEventListener("click", handleMouseEvent);
  // White - 6
  white = new createjs.Shape();
  white.graphics.beginFill("white").drawCircle(0,0,20);
  white.alpha = 0;
  main.foreground.addChild(white);
  cm_thumb_id[5] = white.id;
  white.addEventListener("click", handleMouseEvent);

  // Populate images for pieces
  r_img = new createjs.Bitmap
};


function handleMouseEvent(event) {
  // Detect which space was clicked
  var clicked = event.target.id;
  console.log(clicked);

  // Find out if a clear space button was clicked
  for(var i=0;i<4;i++) {
    if(cm_space_id[i] === event.target.id) {
      // Check if displayed
      if(red.alpha === 0 || clicked_last !== clicked) {
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
      else if(clicked_last === clicked) {
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
    if(cm_thumb_id[i] === event.target.id) {
      // i cooresponds to color
      // i = 0 = red / cm_piece[1] = red (add 1 to i)
      var colornum = (i+1);

      for(var j=0;j<4;j++) {
        if(cm_space_id[j] === clicked_last) {
          // Store selected color in last clicked space
          cm_spaces[j].image = cm_piece[colornum];
          console.log(cm_spaces[j]+": "+colornum);
        }
      }
    }
  }


  // Store last clicked
  clicked_last = clicked;
}

export default module;
