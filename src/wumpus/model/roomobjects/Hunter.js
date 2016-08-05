var RoomObject = require('./RoomObject');

var Hunter = function() {
    RoomObject.call(this);
};

Hunter.prototype = Object.create(RoomObject.prototype);
Hunter.prototype.constructor = RoomObject;

Hunter.prototype.getEffect = function() {
    return null;
};

Hunter.prototype.getName = function() {
    return "Hunter";
};

Hunter.prototype.getDescription = function() {
    return "The Hunter";
};

Hunter.prototype.getConsequence = function() {
    return "";
};

module.exports = Hunter;
