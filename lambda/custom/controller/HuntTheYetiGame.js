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

var CaveBuilder = require("../model/CaveBuilder");
var CaveView = require("../view/CaveView");
var Cave =  require("../model/Cave");

/**
 * Builds the HuntTheYetiGame object, either from 
 * scratch or based on a previous game JSON object.
 *
 * @precondition none
 * @postcondition the object is built
 * @param t i18next.t translation function
 * @param previousGame previous game in json format
 */
var HuntTheYetiGame = function (t, previousGame) {
    this.t = t;
    if (previousGame === undefined) {
        this.spearCount = 1;
        this.didMove = true;
        this.didThrow = false;
        this.didHit = false;
        this.consequence = "";
        var caveBuilder = new CaveBuilder(5, 5, 2, 2, 1);
        this.cave = caveBuilder.getCave();
    }
    else {
        this.spearCount = previousGame.spearCount;
        this.didMove = previousGame.didMove;
        this.didThrow = previousGame.didThrow;
        this.didHit = previousGame.didHit;
        this.consequence = previousGame.consequence;
        this.cave = new Cave(previousGame.cave.rooms,
                             previousGame.cave.WIDTH,
                             previousGame.cave.HEIGHT);
    }
};

/**
 * Returns the intro message.
 *
 * @precondition none
 * @postcondition none
 *
 * @returns the intro message
 */
HuntTheYetiGame.prototype.getIntroduction = function () {
    return [this.t("introMessage", {count: this.spearCount})
            + this.getRoomDescriptionAndOpenings(),
            this.getRoomDescriptionAndOpenings()];
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
    var yetiCount = this.cave.getYetiCount();
    return this.spearCount >= yetiCount
           && yetiCount > 0
           && this.consequence != "death";
};

/**
 * Moves the hunter and activates the consequence.
 *
 * @precondition aDirection is a string: NORTH, SOUTH, EAST, or WEST.
 * @postcondition the hunter moves and the consequence to this action
 *                is stored. If the hunter did move, that boolean is
 *                stored as well.
 */
HuntTheYetiGame.prototype.moveHunter = function (aDirection) {
    if (!this.isPlaying()) {
        return presentGameOverMessage();
    }

    this.didMove = this.cave.moveHunter(aDirection);
    this.consequence = this.cave.activateConsequence();
    this.didThrow = false;

    if (this.isPlaying()) {
        return [this.t("directions.confirmation." + aDirection) + ". " + this.getRoomDescriptionAndOpenings(),
                this.getRoomDescriptionAndOpenings()];
    }
    else {
        return [this.getRoomDescription() + " " + this.getConsequence()
         + this.t("playAgainMessage"),
         this.t("playAgainReprompt")];
    }
};

/**
 * Launches the spear in a particular direction. Internally, the hunter
 * no longer has a spear and the yeti may have died as a result.
 *
 * @precondition aDirection is a string: nORTH, SOUTH, EAST, or WEST.
 * @postcondition this.spearCount is reduced by 1 (because ths spear is thrown)
 *                and the consequence is stored.
 */
HuntTheYetiGame.prototype.launchSpear = function (aDirection) {
    if (!this.isPlaying()) {
        return presentGameOverMessage();
    }

    this.spearCount -= 1;
    this.didHit = this.cave.launchSpear(aDirection);
    this.consequence = this.cave.activateConsequence();
    this.didThrow = true;

    if (this.isPlaying()) {
        return [this.getConsequence()
                + " " + this.getRoomDescriptionAndOpenings(),
                this.t("stillThereMessage") + this.getRoomDescriptionAndOpenings()];
    }
    else {
        return [this.getConsequence()
                + this.t("playAgainMessage"),
                this.t("playAgainReprompt")];
    }
};

/**
 * Returns an English description of the room the hunter is currently
 * standing in. If bats carried the hunter to this room, an added description
 * is applied describing how the hunter got to this location. If the hunter
 * failed to move from the last position standing, the hunter bumps into
 * a wall.
 *
 * @precondition none
 * @postcondition none
 *
 * @returns an English description of the room
 */
HuntTheYetiGame.prototype.getRoomDescription = function () {
    var view = new CaveView(this.t, this.cave);
    var description = "";

    if (this.consequence == "random_location") {
        description += this.t("consequencesDescriptions.random_location");
    }

    if (this.didMove == false) {
        description += this.t("consequencesDescriptions.cannot_move");
    }

    description += view.getRoomDescription();
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
    var view = new CaveView(this.t, this.cave);
    return view.getRoomOpenings();
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
        return this.t("consequencesDescriptions.death");
    } else {
        if (this.didThrow) {
            if (this.cave.getYetiCount() == 0) {
                return this.t("killYetiMessage");
            }
            else if (this.didHit) {
                return this.t("didHit");
            }
            else if (this.spearCount == 0) {
                return this.t("didMiss");
            }
            else if (this.spearCount < this.cave.getYetiCount()) {
                return this.t("didMissOneAndLose");
            }
            else {
                return this.t("didMissOne");
            }
        }
    }
    return "";
};

/**
 * Presents a "pause" message. The game state does not change.
 *
 * @precondition none
 * @postcondition none
 */
HuntTheYetiGame.prototype.pause = function () {
    var speechOutput = this.t("IllWaitMessage");
    return [speechOutput + this.getRoomDescriptionAndOpenings(),
            this.t("IllWaitReprompt") + this.getRoomDescriptionAndOpenings()];
};

/**
 * Gets the room description and the openings.
 *
 * @precondition none
 * @postcondition none
 * @returns the room description and the openings.
 */
HuntTheYetiGame.prototype.getRoomDescriptionAndOpenings = function () {
    return this.getRoomDescription() + " " + this.getRoomOpenings();
}

function presentGameOverMessage() {
    var message = this.t("gameOverMessage");
    return [message, message];
}

module.exports = HuntTheYetiGame;
