var Direction = require('./Direction');
var Hunter = require('./roomobjects/Hunter');
var Bat = require('./roomobjects/Bat');
var Pit = require('./roomobjects/Pit');
var Yeti = require('./roomobjects/Yeti');

/**
 * Creates the cave in which the player hunts the Yeti.
 * 
 * @precondition none
 * @postcondition the game board is initialized with bats, pits, and a
 *                single Yeti.
 */
function Cave() {
    this.BAT_COUNT = 2;
    this.PIT_COUNT = 2;
    this.HEIGHT = 5;
    this.WIDTH = 5;
    this.rooms = [];
    this.safeRooms = [];

    this.initCaveRooms();
    this.initCaveObjects();
    this.initCaveEffects();
};

/**
 * Returns the hunter's current cell id. Use getRow and getCol to get the
 * row and column based on this cell id.
 * 
 * @precondition none
 * @postcondition none
 * 
 * @return the hunter's current cell id
 */
Cave.prototype.getHunterCell = function() {
    return this.find("Hunter");
};

/**
 * Returns an ArrayList of valid hunter moves
 * 
 * @precondition none
 * @postcondition none
 * 
 * @return an ArrayList of valid hunter moves
 */
Cave.prototype.getHunterMoves = function() {
    var hunterCell = this.find("Hunter");
    var hunterRow = this.getRow(hunterCell);
    var hunterCol = this.getCol(hunterCell);

    var validHunterMoves = [];

    for (aDirection in Direction) {
        var nextHunterCell = this.determineNextCell(aDirection, hunterRow, hunterCol);
        if (nextHunterCell != -1) {
            validHunterMoves.push(aDirection);
        }
    }

    return validHunterMoves;
};

/**
 * Returns an ArrayList of the other objects in the room with the hunter
 * 
 * @precondition none
 * @postcondition none
 * 
 * @return an ArrayList of the other objects in the room with the hunter
 */
Cave.prototype.getHuntersRoomObjects = function() {
    var hunterCell = this.find("Hunter");
    var otherRoomObjects = [];

    for (aRoomObject in this.rooms[hunterCell]) {
        if (aRoomObject.getName() != "Hunter") {
            otherRoomObjects.push(aRoomObject);
        }
    }

    return otherRoomObjects;
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
    var consequence = this.getConsequence();

    if (consequence == "random_location") {
        this.transportHunterToRandomSafeRoom();
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
 * @precondition none
 * @postcondition If the hunter has the ability to move in the specified
 *                direction, the hunter moves 1 cell in that direction. If
 *                not, there is no postcondition.
 * 
 * @param aDirection
 *            a direction (NORTH, SOUTH, EAST, WEST) to move.
 */
Cave.prototype.moveHunter = function(aDirection) {
    var hunterCell = this.find("Hunter");
    var hunterPosition = this.findHunterPosition(hunterCell);
    var hunterRow = this.getRow(hunterCell);
    var hunterCol = this.getCol(hunterCell);
    var nextHunterCell = this.determineNextCell(aDirection, hunterRow, hunterCol);

    if (nextHunterCell != -1) {
        this.moveHunterToCell(hunterCell, hunterPosition, nextHunterCell);
    }
};

/*
 * (non-Javadoc)
 * 
 * @see java.lang.Object#toString()
 */
Cave.prototype.toString = function() {
    var hunterCell = this.find("Hunter");
    var moves = this.getHunterMoves();
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

    caveRepresentation += "The hunter may move in these directions. ";
    for (var move in moves) {
        caveRepresentation += move + " ";
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
    var roomDescription = "";

    if (this.rooms[hunterCell].length == 1) {
        roomDescription += "The hunter does not sense anything near.\n";
    } else {

        for (var j = 0; j < this.rooms[hunterCell].length; j++) {
            var aRoomObject = this.rooms[hunterCell][j];
            if (aRoomObject.getName() != "Hunter") {
                roomDescription += aRoomObject.getDescription() + "\n";
            }
        }
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
    var cell = -1;

    for (var i = 0; i < this.rooms.length; i++) {
        for (var j = 0; j < this.rooms[i].length; j++) {
            var aRoomObject = this.rooms[i][j];
            if (aRoomObject.getName() == toFind) {
                cell = i;
            }
        }
    }

    return cell;
};

Cave.prototype.findHunterPosition = function(hunterCell) {
    var aRoom = this.rooms[hunterCell];
    var position = 0;

    for (var i = 0; i < aRoom.length; i++) {
        var aRoomObject = aRoom[i];
        if (aRoomObject.getName() == "Hunter") {
            position = i;
        }
    }

    return position;
};

Cave.prototype.getConsequence = function() {
    var hunterCell = this.find("Hunter");

    for (aRoomObject in this.rooms[hunterCell]) {
        if (aRoomObject.getConsequence() != "") {
            return aRoomObject.getConsequence();
        }
    }

    return "";
};

Cave.prototype.getRandomSafeRoom = function() {
    return this.safeRooms[Math.floor(Math.random() * this.safeRooms.length)];
};

Cave.prototype.initCaveEffects = function() {

    for (var i = 0; i < this.WIDTH * this.HEIGHT; i++) {
        var row = this.getRow(i);
        var col = this.getCol(i);

        for (var j = 0; j < this.rooms[i].length; j++) {
            var aRoomObject = this.rooms[i][j];
            var anEffect = aRoomObject.getEffect();

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
        this.rooms[permutations.shift()].push(new Bat());
    }

    for (var i = 0; i < this.PIT_COUNT; i++) {
        this.rooms[permutations.shift()].push(new Pit());
    }

    this.rooms[permutations.shift()].push(new Yeti());

    this.safeRooms = permutations;

    this.rooms[permutations[0]].push(new Hunter());
};

Cave.prototype.initCaveRooms = function() {
    for (var i = 0; i < this.WIDTH * this.HEIGHT; i++) {
        this.rooms.push([]);
    }
};

Cave.prototype.moveHunterToCell = function(hunterCell, hunterPosition, nextHunterCell) {
    var hunter = this.rooms[hunterCell].splice(hunterPosition, 1);
    this.rooms[nextHunterCell].push(hunter);
};

Cave.prototype.randomPermutation = function(n) {
    var list = [];
    var randomList = [];

    for (var i = 0; i < n; i++) {
        list.push(i);
    }

    while (list.length > 0) {
        var randomIndex = Math.floor(Math.random() * list.length);
        var room = list.splice(randomIndex, 1);
        randomList.push(room);
    }

    return randomList;
};

Cave.prototype.transportHunterToRandomSafeRoom = function() {
    var hunterCell = this.find("Hunter");
    var hunterPosition = this.findHunterPosition(hunterCell);
    var safeRoom = this.getRandomSafeRoom();

    while (safeRoom == hunterCell) {
        safeRoom = this.getRandomSafeRoom();
    }

    this.moveHunterToCell(hunterCell, hunterPosition, safeRoom);
};

module.exports = Cave;
