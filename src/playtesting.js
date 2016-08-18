'use strict';
var HuntTheYetiGame = require("./controller/HuntTheYetiGame");

for (var i = 0; i < 1000; i++) {
    var game = new HuntTheYetiGame();
    console.log("BEGIN: "+game.getRoomDescription() +" "+game.getRoomOpenings() +" "+ game.getConsequence());
    console.log("Start: north");
    game.moveHunter("north");
    console.log(game.getRoomDescription() +" "+game.getRoomOpenings() +" "+ game.getConsequence());
    if (game.isPlaying()) {
        console.log("2: north");
        game.moveHunter("north");
    }
    if (game.isPlaying()) {
        console.log(game.getRoomDescription() +" "+game.getRoomOpenings() +" "+ game.getConsequence());
        console.log("3: south");
        game.moveHunter("south");
        console.log(game.getConsequence());
    }
    if (game.isPlaying()) {
        console.log(game.getRoomDescription() +" "+game.getRoomOpenings() +" "+ game.getConsequence());
        console.log("4: throw south");
        game.launchSpear("south");
        console.log(game.getConsequence());
    }
    console.log("FINAL: "+game.getRoomDescription() +" "+ game.getConsequence());
}
