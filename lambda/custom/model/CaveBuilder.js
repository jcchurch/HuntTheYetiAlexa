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

var Direction = require('./Direction');
var RoomObjects = require('./RoomObjects');
var Cave = require('./Cave');

/**
 * Builds a cave in which the player can play.
 * 
 * @precondition none
 * @postcondition the game board is initialized with bats, pits, and Yeti.
 */
function CaveBuilder(width, height, batCount, pitCount, yetiCount) {
    this.WIDTH = width;
    this.HEIGHT = height;
    this.rooms = [];

    this.initCaveRooms();
    this.initCaveObjects(batCount, pitCount, yetiCount);
    this.initCaveEffects();
};

CaveBuilder.prototype.getCave = function() {
    return new Cave(this.rooms, this.WIDTH, this.HEIGHT);
}

CaveBuilder.prototype.addEffectToRowAndColumn = function(row, col, anEffect) {
    if (row >= 0 && row < this.HEIGHT && col >= 0 && col < this.WIDTH) {
        var cell = row * this.WIDTH + col;
        this.rooms[cell].push(anEffect);
    }
};

CaveBuilder.prototype.initCaveEffects = function() {

    for (var i = 0; i < this.WIDTH * this.HEIGHT; i++) {
        var row = Math.floor(i / this.WIDTH);
        var col = i % this.WIDTH;

        for (var j = 0; j < this.rooms[i].length; j++) {
            var aRoomObject = this.rooms[i][j];
            var anEffect = RoomObjects[aRoomObject].effect;
            if (anEffect != null) {
                this.addEffectToRowAndColumn(row + 1, col, anEffect);
                this.addEffectToRowAndColumn(row - 1, col, anEffect);
                this.addEffectToRowAndColumn(row, col + 1, anEffect);
                this.addEffectToRowAndColumn(row, col - 1, anEffect);
            }
        }
    }
};

CaveBuilder.prototype.initCaveObjects = function(batCount, pitCount, yetiCount) {
    var permutations = this.randomPermutation(this.WIDTH * this.HEIGHT);

    for (var i = 0; i < batCount; i++) {
        this.rooms[permutations.shift()].push("Bat");
    }

    for (var i = 0; i < pitCount; i++) {
        this.rooms[permutations.shift()].push("Pit");
    }

    for (var i = 0; i < yetiCount; i++) {
        this.rooms[permutations.shift()].push("Yeti");
    }
};

CaveBuilder.prototype.initCaveRooms = function() {
    for (var i = 0; i < this.WIDTH * this.HEIGHT; i++) {
        this.rooms.push([]);
    }
};

CaveBuilder.prototype.randomPermutation = function(n) {
    var list = [];
    var randomList = [];

    for (var i = 0; i < n; i++) {
        list.push(i);
    }

    while (list.length > 0) {
        var randomIndex = Math.floor(Math.random() * list.length);
        var roomNumber = list.splice(randomIndex, 1);
        randomList.push(roomNumber[0]);
    }

    return randomList;
};

module.exports = CaveBuilder;
