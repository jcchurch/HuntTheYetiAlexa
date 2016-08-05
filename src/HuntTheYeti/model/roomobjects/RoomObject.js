var RoomObject = require('./RoomObject');

RoomObject = function() { };

RoomObject.prototype.getEffect = function() {
    return null;
};

RoomObject.prototype.getName = function() {
    return "RoomObject";
};

RoomObject.prototype.getDescription = function() {
    return "Widget";
};

RoomObject.prototype.getConsequence = function() {
    return "";
};

module.exports = RoomObject;
