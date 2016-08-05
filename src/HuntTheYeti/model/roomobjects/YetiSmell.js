var RoomObject = require('./RoomObject');

var WumpusSmell = function() {
    RoomObject.call(this);
};

WumpusSmell.prototype = Object.create(RoomObject.prototype);
WumpusSmell.prototype.constructor = RoomObject;

WumpusSmell.prototype.getEffect = function() {
    return null;
};

WumpusSmell.prototype.getName = function() {
    return "WumpusSmell";
};

WumpusSmell.prototype.getDescription = function() {
    return "The hunter smells the stench of the wumpus.";
};

WumpusSmell.prototype.getConsequence = function() {
    return "";
};

module.exports = WumpusSmell;
