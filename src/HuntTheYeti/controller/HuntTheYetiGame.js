var Cave = require("../model/Cave");

/**
 * Builds the HuntTheYetiGame object, either from 
 * scratch or based on a previous game JSON object.
 *
 * @precondition none
 * @postcondition the object is built
 */
var HuntTheYetiGame = function (previousGame) {
    if (previousGame === undefined) {
        this.cave = new Cave();
        this.hasSpear = true;
        this.deadYeti = false;
        this.consequence = "";
    }
    else {
        this.cave = new Cave(previousGame.cave);
        this.hasSpear = previousGame.hasSpear;
        this.deadYeti = previousGame.deadYeti;
        this.consequence = previousGame.consequence;
    }
};

/**
 * Returns true if the player can still play, false otherwise.
 *
 * @precondition none
 * @postcondition none
 *
 * @return true if the player can still play, false otherwise.
 */
HuntTheYetiGame.prototype.isPlaying = function () {
    return this.hasSpear && !this.deadYeti && this.consequence != "death";
};

/**
 * Moves the hunter and activates the consequence. Returns true if the
 * hunter moves, false otherwise.
 *
 * @precondition aDirection is a string: north, south, east, or west.
 * @postcondition the hunter moves and the consequence to this action
 *                is stored.
 *
 * @returns true if the hunter moved, false otherwise.
 */
HuntTheYetiGame.prototype.moveHunter = function (aDirection) {
    var didMove = this.cave.moveHunter(aDirection);
    this.consequence = this.cave.activateConsequence();
    return didMove;
};

/**
 * Launches the spear in a particular direction. Internally, the hunter
 * no longer has a spear and the yeti may have died as a result.
 *
 * @precondition aDirection is a string: north, south, east, or west.
 * @postcondition this.hasSpear is set to false (because ths spear is thrown)
 *                and this.deadYeti is updated to reflect if the yeti died
 *                and the consequence is stored.
 */
HuntTheYetiGame.prototype.launchSpear = function (aDirection) {
    this.hasSpear = false;
    this.deadYeti = this.cave.launchSpear(aDirection);
    this.consequence = this.cave.activateConsequence();
};

/**
 * Returns an English description of the room the hunter is currently
 * standing in. If bats carried the hunter to this room, an added description
 * is applied describing how the hunter got to this location.
 *
 * @precondition none
 * @postcondition none
 *
 * @returns an English description of the room
 */
HuntTheYetiGame.prototype.getRoomDescription = function () {
    var description = "";
    if (this.consequence == "random_location") {
        description += "Enormous bats have picked up and dropped the hunter in a different part of the cave. ";
    }
    description += this.cave.getRoomDescription();
    return description;
};

/**
 * Returns an English description of the room openings
 * by calling the cave's getRoomOpenings method.
 *
 * @precondition none
 * @postcondition none
 *
 * @returns an English description of the room's openings
 */
HuntTheYetiGame.prototype.getRoomOpenings = function () {
    return this.cave.getRoomOpenings();
};

/**
 * Returns an English description of the current consequences
 * to the hunter's most recent actions. Most of the time, this
 * will return an empty string, since the hunter mostly moves.
 * In the event of death, there will be a death message. If the
 * hunter throws the spear and hits, there will be a victory message
 * if the hunter throws the spear and misses, there will be a
 * defenseless message.
 *
 * @precondition none
 * @postcondition none
 *
 * @returns an English description of the most recent consequence.
 */
HuntTheYetiGame.prototype.getConsequence = function () {
    if (this.consequence == "death") {
        return "The hunter has died. The game is over.";
    } else {
        if (this.deadYeti) {
            return "The spear hits the yeti! The yeti falls over dead and the hunter lives! The game is over. You win!";
        } else {
            if (!this.hasSpear) {
                return "The hunter missed the yeti and is now defenseless. The game is over.";
            }
        }
    }
    return "";
};

module.exports = HuntTheYetiGame;
