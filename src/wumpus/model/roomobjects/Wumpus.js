var RoomObject = require('./RoomObject');
var WumpusSmell = require('./WumpusSmell');

var Wumpus = function() {
    RoomObject.call(this);
};

Wumpus.prototype = Object.create(RoomObject.prototype);
Wumpus.prototype.constructor = RoomObject;

Wumpus.prototype.getEffect = function() {
    return new WumpusSmell();
};

Wumpus.prototype.getName = function() {
    return "Wumpus";
};

Wumpus.prototype.getDescription = function() {
    return "The impressive Wumpus attacks the hunter!";
};

Wumpus.prototype.getConsequence = function() {
    return "death";
};

module.exports = Wumpus;
