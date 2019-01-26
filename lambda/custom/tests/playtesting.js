/**

This file is part of Hunt the Yeti.

Hunt the Yeti is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.

*/

'use strict';
const localize = require('../i18n/localize');
const t = localize('fr');
const HuntTheYetiGame = require("../controller/HuntTheYetiGame");

for (var i = 0; i < 1000; i++) {
    var game = new HuntTheYetiGame(t);
    console.log("BEGIN: "+game.getRoomDescription() +" "+game.getRoomOpenings() +" "+ game.getConsequence());
    console.log("Start: NORTH");
    game.moveHunter("NORTH");
    console.log(game.getRoomDescription() +" "+game.getRoomOpenings() +" "+ game.getConsequence());
    if (game.isPlaying()) {
        console.log("2: NORTH");
        game.moveHunter("NORTH");
    }
    if (game.isPlaying()) {
        console.log(game.getRoomDescription() +" "+game.getRoomOpenings() +" "+ game.getConsequence());
        console.log("3: SOUTH");
        game.moveHunter("SOUTH");
        console.log(game.getConsequence());
    }
    if (game.isPlaying()) {
        console.log(game.getRoomDescription() +" "+game.getRoomOpenings() +" "+ game.getConsequence());
        console.log("4: throw SOUTH");
        game.launchSpear("SOUTH");
        console.log(game.getConsequence());
    }
    console.log("FINAL: "+game.getRoomDescription() +" "+ game.getConsequence());
}
