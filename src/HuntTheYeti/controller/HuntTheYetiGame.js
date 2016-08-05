var Cave = require("../model/Cave");

function HuntTheYetiGame() {
    this.cave = new Cave();
    this.hasSpear = true;
    this.deadYeti = false;
    this.consequence = "";
}

HuntTheYetiGame.prototype.isPlaying = function () {
    return this.hasSpear && !this.deadYeti && this.consequence != "death";
}

HuntTheYetiGame.prototype.moveHunter = function (aDirection) {
    this.cave.moveHunter(aDirection);
    this.consequence = this.cave.activateConsequence();
}

HuntTheYetiGame.prototype.launchSpear = function (aDirection) {
    this.hasSpear = false;
    this.deadYeti = this.cave.launchSpear(aDirection);
    this.consequence = this.cave.activateConsequence();
}

HuntTheYetiGame.prototype.reportRoomDescription = function () {
    return this.cave.getRoomDescription();
}

HuntTheYetiGame.prototype.reportConsequence = function () {
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
}

module.exports = HuntTheYetiGame;