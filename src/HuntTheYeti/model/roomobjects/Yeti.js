var RoomObject = require('./RoomObject');
var YetiSmell = require('./YetiSmell');

var Yeti = function() {
    RoomObject.call(this);
};

Yeti.prototype = Object.create(RoomObject.prototype);
Yeti.prototype.constructor = RoomObject;

Yeti.prototype.getEffect = function() {
    return new YetiSmell();
};

Yeti.prototype.getName = function() {
    return "Yeti";
};

Yeti.prototype.getDescription = function() {
    return "The impressive Yeti attacks the hunter!";
};

Yeti.prototype.getConsequence = function() {
    return "death";
};

module.exports = Yeti;
