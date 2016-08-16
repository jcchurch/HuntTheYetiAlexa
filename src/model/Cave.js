var Direction = require('./Direction');
var RoomObjects = require('./RoomObjects');

/**
 * Creates the cave in which the player hunts the Yeti.
 * 
 * @precondition none
 * @postcondition the game board is initialized with bats, pits, and a
 *                single Yeti.
 */
function Cave(previousCave) {
    this.BAT_COUNT = 2;
    this.PIT_COUNT = 2;
    this.HEIGHT = 5;
    this.WIDTH = 5;

    if (previousCave === undefined) {
        this.rooms = [];

        this.initCaveRooms();
        this.initCaveObjects();
        this.initCaveEffects();
        this.placeHunterInRandomSafeRoom();
    }
    else {
        this.rooms = previousCave.rooms;
    }
};

/**
 * Returns an ArrayList of valid hunter moves
 * 
 * @precondition none
 * @postcondition none
 * 
 * @return an ArrayList of valid hunter moves
 */
Cave.prototype.getHunterMoves = function(hunterCell) {
    var hunterRow = this.getRow(hunterCell);
    var hunterCol = this.getCol(hunterCell);

    var validHunterMoves = [];
    for (var i = 0; i < Direction.Direction.length; i++) {
        var aDirection = Direction.Direction[i];
        var nextHunterCell = this.determineNextCell(aDirection, hunterRow, hunterCol);
        if (nextHunterCell != -1) {
            validHunterMoves.push(aDirection);
        }
    }

    return validHunterMoves;
};

/**
 * Based on the current game state, activates and returns the latest
 * consequence.
 * 
 * @precondition none
 * @postcondition if the consequence is "random_location", the hunter is
 *                moved to a random safe location. Otherwise, nothing
 *                changes (not even death changes the game).
 * 
 * @return a code of the latest consequence
 */
Cave.prototype.activateConsequence = function() {
    var hunterCell = this.find("Hunter");
    var consequence = this.getConsequence(hunterCell);

    if (consequence == "random_location") {
        this.transportHunterToRandomSafeRoom(hunterCell);
    }

    return consequence;
};

/**
 * Returns the cell id of a row or column (or -1 if not possible)
 * 
 * @precondition none
 * @postcondition none
 * 
 * @param row
 *            A cell row
 * @param col
 *            A cell column
 * @return returns the cell id of this row and column (or -1 if not
 *         possible)
 */
Cave.prototype.getCell = function (row, col) {
    if (row >= this.HEIGHT || row < 0 || col >= this.WIDTH || col < 0) {
        return -1;
    }
    return row * this.WIDTH + col;
};

/**
 * Returns the column of a cell (or -1 if not possible)
 * 
 * @precondition none
 * @postcondition none
 * 
 * @param cell
 *            a cell id
 * @return the column of this cell (or -1 if not possible)
 */
Cave.prototype.getCol = function(cell) {
    if (cell < 0 || cell >= this.rooms.length) {
        return -1;
    }
    return cell % this.WIDTH;
};

/**
 * Returns the row of a cell (or -1 if not possible)
 * 
 * @precondition none
 * @postcondition none
 * 
 * @param cell
 *            a cell id
 * @return the row of this cell (or -1 if not possible)
 */
Cave.prototype.getRow = function(cell) {
    if (cell < 0 || cell >= this.rooms.length) {
        return -1;
    }

    return Math.floor(cell / this.WIDTH);
};

/**
 * Launches a spear in a specified direction. The spear will either hit a 
 * Yeti (and returns true) or a wall (and returns false). It's up to the
 * game controller to decide if this is the end of the game.
 * 
 * @precondition none
 * @postcondition none
 * 
 * @param aDirection
 *            the direction in which the spear is thrown
 * @return true if a Yeti is hit, false otherwise
 */
Cave.prototype.launchSpear = function(aDirection) {
    var spearCell = this.find("Hunter");
    var spearRow = this.getRow(spearCell);
    var spearCol = this.getCol(spearCell);
    var yetiCell = this.find("Yeti");

    while (spearCell != -1) {
        spearCell = this.determineNextCell(aDirection, spearRow, spearCol);

        if (spearCell != -1) {
            spearRow = this.getRow(spearCell);
            spearCol = this.getCol(spearCell);

            if (yetiCell == this.getCell(spearRow, spearCol)) {
                return true;
            }
        }
    }

    return false;
};

/**
 * Moves the hunter in a specified direction
 * 
 * @param aDirection
 *            a direction (NORTH, SOUTH, EAST, WEST) to move.
 *
 * @precondition none
 * @postcondition If the hunter has the ability to move in the specified
 *                direction, the hunter moves 1 cell in that direction. If
 *                not, there is no postcondition.
 * 
 * @return true if the hunter moves, false otherwise.
 */
Cave.prototype.moveHunter = function(aDirection) {
    var hunterCell = this.find("Hunter");
    var hunterPosition = this.rooms[hunterCell].indexOf("Hunter");
    var hunterRow = this.getRow(hunterCell);
    var hunterCol = this.getCol(hunterCell);
    var nextHunterCell = this.determineNextCell(aDirection, hunterRow, hunterCol);

    if (nextHunterCell != -1) {
        this.moveHunterToCell(hunterCell, hunterPosition, nextHunterCell);
    }

    return nextHunterCell != -1;
};

/*
 * (non-Javadoc)
 * 
 * @see java.lang.Object#toString()
 */
Cave.prototype.toString = function() {
    var hunterCell = this.find("Hunter");
    var moves = this.getHunterMoves(hunterCell);
    var yetiCell = -1; // this.find("Yeti");
    var caveRepresentation = "";

    for (var row = 0; row < this.HEIGHT; row++) {
        caveRepresentation += " [ ";

        for (var col = 0; col < this.WIDTH; col++) {
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
Cave.prototype.getRoomDescription = function() {
    var hunterCell = this.find("Hunter");
    var moves = this.getHunterMoves(hunterCell);
    var roomDescription = "";

    var livingDescription = "";
    var deathDescription = "";

    if (this.rooms[hunterCell].length == 1) {
        roomDescription += "The hunter does not sense anything near. ";
    } else {

        for (var j = 0; j < this.rooms[hunterCell].length; j++) { 
            var aRoomObject = this.rooms[hunterCell][j];

            if (aRoomObject != "Hunter") {
                livingDescription += RoomObjects[aRoomObject].description + " ";
            }

            if (RoomObjects[aRoomObject].consequence == "death") {
                deathDescription += RoomObjects[aRoomObject].description + " ";
            }
        }
    }

    if (deathDescription != "") {
        roomDescription += deathDescription;
    }
    else {
        roomDescription += livingDescription;
    }

    return roomDescription;
}

/**
 * Builds an English description of open rooms.
 *
 * @precondition: none
 * @postcondition: none
 * 
 * @return An English description of open rooms.
 */
Cave.prototype.getRoomOpenings = function() {
    var hunterCell = this.find("Hunter");
    var moves = this.getHunterMoves(hunterCell);
    var roomDescription = "";

    roomDescription += "Rooms are open ";
    for (var i = 0; i < moves.length; i++) {
        roomDescription += moves[i] + ", ";
    }

    return roomDescription;
}

// Private methods from here down.

Cave.prototype.addEffectToRowAndColumn = function(row, col, anEffect) {
    var cell = this.getCell(row, col);
    if (cell != -1) {
        this.rooms[cell].push(anEffect);
    }
};

Cave.prototype.determineNextCell = function(aDirection, row, col) {
    var nextCell = -1;
    if (aDirection == "north") {
        nextCell = this.getCell(row - 1, col);
    }

    if (aDirection == "south") {
        nextCell = this.getCell(row + 1, col);
    }

    if (aDirection == "west") {
        nextCell = this.getCell(row, col - 1);
    }

    if (aDirection == "east") {
        nextCell = this.getCell(row, col + 1);
    }

    return nextCell;
};

Cave.prototype.find = function(toFind) {
    var room = -1;

    for (var i = 0; i < this.rooms.length; i++) {
        var position = this.rooms[i].indexOf(toFind);
        if (position != -1) {
            room = i;
        }
    }

    return room;
};

Cave.prototype.getConsequence = function(hunterCell) {
    for (var j = 0; j < this.rooms[hunterCell].length; j++) { 
        var aRoomObject = this.rooms[hunterCell][j];
        if (RoomObjects[aRoomObject].consequence != "") {
            return RoomObjects[aRoomObject].consequence;
        }
    }

    return "";
};

Cave.prototype.getRandomSafeRoom = function(safeRooms) {
    return safeRooms[Math.floor(Math.random() * safeRooms.length)];
};

Cave.prototype.initCaveEffects = function() {

    for (var i = 0; i < this.WIDTH * this.HEIGHT; i++) {
        var row = this.getRow(i);
        var col = this.getCol(i);

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

Cave.prototype.initCaveObjects = function() {
    var permutations = this.randomPermutation(this.WIDTH * this.HEIGHT);

    for (var i = 0; i < this.BAT_COUNT; i++) {
        this.rooms[permutations.shift()].push("Bat");
    }

    for (var i = 0; i < this.PIT_COUNT; i++) {
        this.rooms[permutations.shift()].push("Pit");
    }

    this.rooms[permutations.shift()].push("Yeti");
};

Cave.prototype.initCaveRooms = function() {
    for (var i = 0; i < this.WIDTH * this.HEIGHT; i++) {
        this.rooms.push([]);
    }
};

Cave.prototype.moveHunterToCell = function(hunterCell, hunterPosition, nextHunterCell) {
    var hunter = this.rooms[hunterCell].splice(hunterPosition, 1);
    this.rooms[nextHunterCell].push(hunter[0]);
};

Cave.prototype.randomPermutation = function(n) {
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

Cave.prototype.getSafeRooms = function() {
    var safeRooms = [];
    for (var i = 0; i < this.WIDTH * this.HEIGHT; i++) {
        if (this.rooms[i].length == 0) {
            safeRooms.push(i);
        }
    }
    return safeRooms;
};

Cave.prototype.transportHunterToRandomSafeRoom = function(hunterCell) {
    var hunterPosition = this.rooms[hunterCell].indexOf("Hunter");
    var safeRooms = this.getSafeRooms();
    var safeRoom = this.getRandomSafeRoom(safeRooms);

    this.moveHunterToCell(hunterCell, hunterPosition, safeRoom);
};

Cave.prototype.placeHunterInRandomSafeRoom = function() {
    var safeRooms = this.getSafeRooms();
    var safeRoom = this.getRandomSafeRoom(safeRooms);
    this.rooms[safeRoom].push("Hunter");
};

module.exports = Cave;
