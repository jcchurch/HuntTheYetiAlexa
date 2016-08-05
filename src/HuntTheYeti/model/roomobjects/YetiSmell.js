var RoomObject = require('./RoomObject');

var YetiSmell = function() {
    RoomObject.call(this);
};

YetiSmell.prototype = Object.create(RoomObject.prototype);
YetiSmell.prototype.constructor = RoomObject;

YetiSmell.prototype.getEffect = function() {
    return null;
};

YetiSmell.prototype.getName = function() {
    return "YetiSmell";
};

YetiSmell.prototype.getDescription = function() {
    return "The hunter smells the stench of the yeti.";
};

YetiSmell.prototype.getConsequence = function() {
    return "";
};

module.exports = YetiSmell;
