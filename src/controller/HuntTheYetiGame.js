var CaveBuilder = require("../model/CaveBuilder");
var CaveView = require("../view/CaveView");
var Cave =  require("../model/Cave");

/**
 * Builds the HuntTheYetiGame object, either from 
 * scratch or based on a previous game JSON object.
 *
 * @precondition none
 * @postcondition the object is built
 */
var HuntTheYetiGame = function (previousGame) {
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
    var spearCountEnglish = "a spear";
    if (this.spearCount > 1) {
        spearCountEnglish = this.spearCount + " spears";
    }

    return ["The hunter, armed with "
            + spearCountEnglish
            + ", is lost in a cave. Help the hunter escape. "
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
 * @precondition aDirection is a string: north, south, east, or west.
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
        return [aDirection + ". " + this.getRoomDescriptionAndOpenings(),
                this.getRoomDescriptionAndOpenings()];
    }
    else {
        return [this.getRoomDescription() + " " + this.getConsequence()
         + " If you would like to play again, say 'Begin Game' or say 'Stop'",
         "The game is over. Say 'Begin Game' or 'Stop'."];
    }
};

/**
 * Launches the spear in a particular direction. Internally, the hunter
 * no longer has a spear and the yeti may have died as a result.
 *
 * @precondition aDirection is a string: north, south, east, or west.
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
                "Are you still there? " + this.getRoomDescriptionAndOpenings()];
    }
    else {
        return [this.getConsequence()
                + " If you would like to play again, say 'Begin Game' or say 'Stop'",
                "The game is over. Say 'Begin Game' or 'Stop'."];
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
    var view = new CaveView(this.cave);
    var description = "";

    if (this.consequence == "random_location") {
        description += "<audio src='https://s3.amazonaws.com/yetihuntaudio/bat_screech.mp3'/> Enormous bats have picked up and dropped the hunter in a different part of the cave. ";
    }

    if (this.didMove == false) {
        description += "<audio src='https://s3.amazonaws.com/yetihuntaudio/hunter_bumps_into_wall.mp3'/> The hunter bumps into a wall. ";
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
    var view = new CaveView(this.cave);
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

    var spearHitAudio = "<audio src='https://s3.amazonaws.com/yetihuntaudio/spear_throw.mp3'/> <audio src='https://s3.amazonaws.com/yetihuntaudio/yeti_death.mp3'/>";
    var spearMissesAudio = "<audio src='https://s3.amazonaws.com/yetihuntaudio/spear_throw.mp3'/> <audio src='https://s3.amazonaws.com/yetihuntaudio/spear_hits_wall.mp3'/>";

    if (this.consequence == "death") {
        return "The hunter has died. The game is over.";
    } else {
        if (this.didThrow) {
            if (this.cave.getYetiCount() == 0) {
                return spearHitAudio + " The spear hits the yeti! The yeti falls over dead and the hunter lives! <audio src='https://s3.amazonaws.com/yetihuntaudio/victory.mp3'/> The game is over. You win!";
            }
            else if (this.didHit) {
                return spearHitAudio + " The spear hits the yeti! Keep hunting. There are still more yeti lurking in the cave.";
            }
            else if (this.spearCount == 0) {
                return spearMissesAudio + " The hunter missed the yeti and is now defenseless. The game is over.";
            }
            else if (this.spearCount < this.cave.getYetiCount()) {
                return spearMissesAudio + " The hunter missed the yeti. The hunter lacks enough spears to defeat the remaining yeti. The game is over.";
            }
            else {
                return spearMissesAudio + " The hunter missed the yeti. Your spear count is dwindling. Keep going.";
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
    var speechOutput = "I'll wait. ";
    return [speechOutput + this.getRoomDescriptionAndOpenings(),
            "Are you still there? " + this.getRoomDescriptionAndOpenings()];
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
    var message = "The game is over. Say 'Begin Game' or 'Stop'.";
    return [message, message];
}

module.exports = HuntTheYetiGame;
