var Cave = require("../model/Cave");

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

HuntTheYetiGame.prototype.isPlaying = function () {
    return this.hasSpear && !this.deadYeti && this.consequence != "death";
};

HuntTheYetiGame.prototype.moveHunter = function (aDirection) {
    this.cave.moveHunter(aDirection);
    this.consequence = this.cave.activateConsequence();
};

HuntTheYetiGame.prototype.launchSpear = function (aDirection) {
    this.hasSpear = false;
    this.deadYeti = this.cave.launchSpear(aDirection);
    this.consequence = this.cave.activateConsequence();
};

HuntTheYetiGame.prototype.getRoomDescription = function () {
    var description = "";
    if (this.consequence == "random_location") {
        description += "<audio src='http://james.church/gameAudio/bat_screech.mp3'/> Enormous bats have picked up and dropped the hunter in a different part of the cave. ";
    }
    description += this.cave.getRoomDescription();
    return description;
};

HuntTheYetiGame.prototype.getRoomOpenings = function () {
    return this.cave.getRoomOpenings();
};

HuntTheYetiGame.prototype.getConsequence = function () {
    if (this.consequence == "death") {
        return "The hunter has died. The game is over.";
    } else {
        if (this.deadYeti) {
            return "<audio src='http://james.church/gameAudio/spear_throw.mp3'/> <audio src='http://james.church/gameAudio/yeti_death.mp3'/> The spear hits the yeti! The yeti falls over dead and the hunter lives! <audio src='http://james.church/gameAudio/victory.mp3'/> The game is over. You win!";
        } else {
            if (!this.hasSpear) {
                return "<audio src='http://james.church/gameAudio/spear_throw.mp3'/> <audio src='http://james.church/gameAudio/spear_hits_wall.mp3'/> The hunter missed the yeti and is now defenseless. The game is over.";
            }
        }
    }
    return "";
};

module.exports = HuntTheYetiGame;
