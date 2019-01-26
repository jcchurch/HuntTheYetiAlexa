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
 * @param t i18next.t translation function
 */
function CaveView(t, cave) {
    this.t = t;
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

    caveRepresentation += this.t('hunterMayMoveMessage');
    for (var i = 0; i < moves.length; i++) {
        caveRepresentation += this.t('directions.' + moves[i]) + " ";
    }
    caveRepresentation += "\n\n";

    return caveRepresentation;
};

/**
 * Gets the localized description of the room.
 *
 * @precondition: none
 * @postcondition: none
 * 
 * @return A localized description of the room.
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
 * @return A localized description of the room.
 */
CaveView.prototype.getLivingDescriptions = function(hunterCell) {
    var livingDescription = "";
    var allRoomObjects = this.cave.getRoomObjects(hunterCell);
    for (var j = 0; j < allRoomObjects.length; j++) { 
        var aRoomObject = allRoomObjects[j];
        if (aRoomObject != "Hunter") {
            livingDescription += this.t('objectsDescriptions.' + aRoomObject) + " ";
        }
    }

    if (allRoomObjects.length == 1) {
        livingDescription += this.t('hunterSensesNothing');
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
 * @return A localized description of the room.
 */
CaveView.prototype.getDeathDescriptions = function(hunterCell) {
    var deathDescription = "";
    var allRoomObjects = this.cave.getRoomObjects(hunterCell);
    for (var j = 0; j < allRoomObjects.length; j++) { 
        var aRoomObject = allRoomObjects[j];
        if (RoomObjects[aRoomObject].consequence == "death") {
            deathDescription += this.t('objectsDescriptions.' + aRoomObject) + " ";
        }
    }

    return deathDescription;
};

/**
 * Builds a localized description of open rooms.
 *
 * @precondition: none
 * @postcondition: none
 * 
 * @return A localized description of open rooms.
 */
CaveView.prototype.getRoomOpenings = function() {
    var hunterCell = this.cave.find("Hunter");
    var moves = this.cave.getHunterMoves(hunterCell);
    var roomDescription = "";

    roomDescription += this.t('openDirections');
    for (var i = 0; i < moves.length; i++) {
        roomDescription = roomDescription + this.t("directions."+moves[i]) + ((i==moves.length-2) ? this.t('or') : ", ");
    }

    return roomDescription;
};

module.exports = CaveView;
