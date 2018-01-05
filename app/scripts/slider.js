function init() {
    slider();
}

function slider() {
    var stage = new createjs.Stage("gameCanvas");
    stage.enableMouseOver(20);

    // Menu assets
    var slider_bg =             new createjs.Bitmap("assets/images/menu_bg.jpg");
    var slider_board =          new createjs.Bitmap("assets/images/slider/board.png");
    var slider_puzzle = [];

    var data = {
        images: ["assets/images/slider/full.png"],
        frames: {width:180, height: 180, regX: 90, regY: 90},
        animations: {
            0: { frames: 0, next: false },
            1: { frames: 1, next: false },
            2: { frames: 2, next: false },
            3: { frames: 3, next: false },
            4: { frames: 4, next: false },
            5: { frames: 5, next: false },
            6: { frames: 6, next: false },
            7: { frames: 7, next: false },
            8: { frames: 8, next: false },
            9: { frames: 9, next: false },
            10: { frames: 10, next: false },
            11: { frames: 11, next: false },
            12: { frames: 12, next: false },
            13: { frames: 13, next: false },
            14: { frames: 14, next: false },
            15: 15,
            16: 16,
            17: 17,
            18: 18,
            19: 19,
            20: 20,
            21: 21,
            22: 22,
            23: 23,
            24: 24
        }
    };
    var spritesheet = new createjs.SpriteSheet(data);

    // Asset coordinates
    slider_board.x = 960;
    slider_board.y = 540;
    slider_board.regX = 525;
    slider_board.regY = 525;

    var piece_center = 90;
    var piece_startx = 600;
    var piece_starty = 180;

    /*
    menu_title.x = 960;
    menu_title.y = 280;
    menu_title.regX = 520;
    menu_title.alpha = 0;
    menu_title.scaleX = .5;
    menu_title.scaleY = .5;
    */

    // Create container for game buttons
    /*menu_startBtn = new createjs.Container();
    menu_startBtn.addChild(menu_start, menu_start2);
    menu_startBtn.x = 960;
    menu_startBtn.y = 540;
    menu_startBtn.regX = 520;*/

    // Add assets to stage
    stage.addChild(slider_bg);
    stage.addChild(slider_board);

    createjs.Ticker.setFPS(2);
    createjs.Ticker.addEventListener("tick", stage);

    // Define initial placement of puzzle pieces
    for(var i=0;i<24;i++) {
        slider_puzzle.push(new createjs.Sprite(spritesheet, i));
    }

    // Shuffle pieces for puzzle
    function shuffle(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }
    
    shuffle(slider_puzzle);

    for(var i=0;i<24;i++) {
        var col = i % 5;
        var row = Math.floor(i / 5);

        slider_puzzle[i].x = (piece_startx + ((piece_center*2)*col));
        slider_puzzle[i].y = (piece_starty + ((piece_center*2)*row));

        stage.addChild(slider_puzzle[i]);
        //slider_puzzle[i].onAnimationEnd = null;
        slider_puzzle[i].stop();
    }
}

function game() {
    // Beginning of game goes here
}