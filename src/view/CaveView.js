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

var RoomObjects = require('../model/RoomObjects');

/**
 * Creates the CaveView object in which reports a
 * description of the Cave
 * 
 * @precondition a Cave object.
 * @postcondition the Cave object is saved.
 */
function CaveView(cave) {
    this.cave = cave;
};

/*
 * (non-Javadoc)
 * 
 * @see java.lang.Object#toString()
 */
CaveView.prototype.toString = function() {
    var hunterCell = this.cave.find("Hunter");
    var moves = this.getHunterMoves(hunterCell);
    var yetiCell = -1; // this.cave.find("Yeti");
    var caveRepresentation = "";

    for (var row = 0; row < this.cave.getHeight(); row++) {
        caveRepresentation += " [ ";

        for (var col = 0; col < this.cave.getWidth(); col++) {
            var cell = this.getCell(row, col);
            if (cell == hunterCell) {
                caveRepresentation += " H";
            } else if (cell == yetiCell) {
                caveRepresentation += " W";
            } else {
                caveRepresentation += " ~";
            }
        }

        caveRepresentation += " ]\n";
    }

    caveRepresentation += "\n\n";
    caveRepresentation += this.getRoomDescription();
    caveRepresentation += "\n\n";

    caveRepresentation += "The hunter may move ";
    for (var i = 0; i < moves.length; i++) {
        caveRepresentation += moves[i] + " ";
    }
    caveRepresentation += "\n\n";

    return caveRepresentation;
};

/**
 * Gets the description of the room.
 *
 * @precondition: none
 * @postcondition: none
 * 
 * @return An English description of the room.
 */
CaveView.prototype.getRoomDescription = function() {
    var hunterCell = this.cave.find("Hunter");
    var deathDescription = this.getDeathDescriptions(hunterCell);

    if (deathDescription != "") {
        return deathDescription;
    }

    return this.getLivingDescriptions(hunterCell);
};

/**
 * Gets the description of everything inside the
 * room with the hunter (except for the hunter itself).
 *
 * @precondition: the hunter's current cell
 * @postcondition: none
 * 
 * @return An English description of the room.
 */
CaveView.prototype.getLivingDescriptions = function(hunterCell) {
    var livingDescription = "";
    var allRoomObjects = this.cave.getRoomObjects(hunterCell);
    for (var j = 0; j < allRoomObjects.length; j++) { 
        var aRoomObject = allRoomObjects[j];
        if (aRoomObject != "Hunter") {
            livingDescription += RoomObjects[aRoomObject].description + " ";
        }
    }

    if (allRoomObjects.length == 1) {
        livingDescription += "The hunter does not sense anything near. ";
    }

    return livingDescription;
};

/**
 * Gets the description of elements inside
 * the room with the consequence of death.
 *
 * @precondition: the hunter's current cell
 * @postcondition: none
 * 
 * @return An English description of the room.
 */
CaveView.prototype.getDeathDescriptions = function(hunterCell) {
    var deathDescription = "";
    var allRoomObjects = this.cave.getRoomObjects(hunterCell);
    for (var j = 0; j < allRoomObjects.length; j++) { 
        var aRoomObject = allRoomObjects[j];
        if (RoomObjects[aRoomObject].consequence == "death") {
            deathDescription += RoomObjects[aRoomObject].description + " ";
        }
    }

    return deathDescription;
};

/**
 * Builds an English description of open rooms.
 *
 * @precondition: none
 * @postcondition: none
 * 
 * @return An English description of open rooms.
 */
CaveView.prototype.getRoomOpenings = function() {
    var hunterCell = this.cave.find("Hunter");
    var moves = this.cave.getHunterMoves(hunterCell);
    var roomDescription = "";

    roomDescription += "Rooms are open ";
    for (var i = 0; i < moves.length; i++) {
        roomDescription += moves[i] + ", ";
    }

    return roomDescription;
};

module.exports = CaveView;
