var RoomObject = require('./RoomObject');
var BatSounds = require('./BatSounds');

Bat = function() {
    RoomObject.call(this);
};

Bat.prototype = Object.create(RoomObject.prototype);
Bat.prototype.constructor = RoomObject;

Bat.prototype.getEffect = function() {
    return new BatSounds();
};

Bat.prototype.getName = function() {
    return "Bat";
};

Bat.prototype.getDescription = function() {
    return "An enormous bat swoops down and carries the hunter to a new location. Good luck!";
};

Bat.prototype.getConsequence = function() {
    return "random_location";
};

module.exports = Bat;
