var RoomObject = require('./RoomObject');

var BatSounds = function() {
    RoomObject.call(this);
};

BatSounds.prototype = Object.create(RoomObject.prototype);
BatSounds.prototype.constructor = RoomObject;

BatSounds.prototype.getEffect = function() {
    return null;
};

BatSounds.prototype.getName = function() {
    return "BatFluttering";
};

BatSounds.prototype.getDescription = function() {
    return "The hunter hears the sounds of nearby enormous bats.";
};

BatSounds.prototype.getConsequence = function() {
    return "";
};

module.exports = BatSounds;
