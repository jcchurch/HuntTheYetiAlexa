'use strict';
var HuntTheYetiGame = require("./controller/HuntTheYetiGame");

for (var i = 0; i < 1000; i++) {
    var game = new HuntTheYetiGame();
    game.moveHunter("north");
    console.log(game.getRoomDescription() +" "+game.getRoomOpenings() +" "+ game.getConsequence());
    if (game.isPlaying()) {
        game.moveHunter("south");
        console.log(game.getConsequence());
    }
    if (game.isPlaying()) {
        game.launchSpear("south");
        console.log(game.getConsequence());
    }
}
