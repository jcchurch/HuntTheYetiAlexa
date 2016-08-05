var RoomObject = require('./RoomObject');

var PitDraft = function() {
    RoomObject.call(this);
};

PitDraft.prototype = Object.create(RoomObject.prototype);
PitDraft.prototype.constructor = RoomObject;

PitDraft.prototype.getEffect = function() {
    return null;
};

PitDraft.prototype.getName = function() {
    return "PitDraft";
};

PitDraft.prototype.getDescription = function() {
    return "The hunter feels the draft of an open pit.";
};

PitDraft.prototype.getConsequence = function() {
    return "";
};

module.exports = PitDraft;
