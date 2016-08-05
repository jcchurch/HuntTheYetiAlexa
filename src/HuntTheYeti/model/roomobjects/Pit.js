var RoomObject = require('./RoomObject');
var PitDraft = require('./PitDraft');

var Pit = function() {
    RoomObject.call(this);
};

Pit.prototype = Object.create(RoomObject.prototype);
Pit.prototype.constructor = RoomObject;

Pit.prototype.getEffect = function() {
    return new PitDraft();
};

Pit.prototype.getName = function() {
    return "Pit";
};

Pit.prototype.getDescription = function() {
    return "The hunter steps into an open pit and falls!";
};

Pit.prototype.getConsequence = function() {
    return "death";
};

module.exports = Pit;
