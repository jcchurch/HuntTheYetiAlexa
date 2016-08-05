var Cave = require("../model/Cave");

function HuntTheWumpusGame() {
    this.cave = new Cave();
    this.hasSpear = true;
    this.deadWumpus = false;
    this.consequence = "";
}

HuntTheWumpusGame.prototype.isPlaying = function () {
    return this.hasSpear && !this.deadWumpus && this.consequence != "death";
}

HuntTheWumpusGame.prototype.moveHunter = function (aDirection) {
    this.cave.moveHunter(aDirection);
    this.consequence = this.cave.activateConsequence();
}

HuntTheWumpusGame.prototype.launchSpear = function (aDirection) {
    this.hasSpear = false;
    this.deadWumpus = this.cave.launchSpear(aDirection);
    this.consequence = this.cave.activateConsequence();
}

HuntTheWumpusGame.prototype.reportRoomDescription = function () {
    return this.cave.getRoomDescription();
}

HuntTheWumpusGame.prototype.reportConsequence = function () {
    if (this.consequence == "death") {
        return "The hunter has died. The game is over.";
    } else {
        if (this.deadWumpus) {
            return "The spear hits the wumpus! The wumpus falls over dead and the hunter lives! The game is over. You win!";
        } else {
            if (!this.hasSpear) {
                return "The hunter missed the wumpus and is now defenseless. The game is over.";
            }
        }
    }
}

module.exports = HuntTheWumpusGame;
