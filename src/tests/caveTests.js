'use strict';
var Cave = require("../model/Cave");

function assert(condition, message) {
    if (!condition) {
        console.log(message);
    }
}

function WhenSpearThrownWest_YetiMissed() {
    var cave = new Cave([ [], [],         [],            [],            [],
                          [], [],         [],            ['YetiSmell'], [],
                          [], ['Hunter'], ['YetiSmell'], ['Yeti'],      ['YetiSmell'],
                          [], [],         [],            ['YetiSmell'], [],
                          [], [],         [],            [],            [] ],
                        5, 5);

    var hitYeti = cave.launchSpear("west");
    assert(!hitYeti, "Failed to miss yeti when throwing spear west");
}

function WhenSpearThrownEast_YetiHit() {
    var cave = new Cave([ [], [],         [],            [],            [],
                          [], [],         [],            ['YetiSmell'], [],
                          [], ['Hunter'], ['YetiSmell'], ['Yeti'],      ['YetiSmell'],
                          [], [],         [],            ['YetiSmell'], [],
                          [], [],         [],            [],            [] ],
                        5, 5);

    var hitYeti = cave.launchSpear("east");
    assert(hitYeti, "Failed to hit yeti when throwing spear east");
}

function WhenSpearThrownEast_NoTraceOfYetiOrSmell() {
    var cave = new Cave([ [], [],         [],            [],            [],
                          [], [],         [],            ['YetiSmell'], [],
                          [], ['Hunter'], ['YetiSmell'], ['Yeti'],      ['YetiSmell'],
                          [], [],         [],            ['YetiSmell'], [],
                          [], [],         [],            [],            [] ],
                        5, 5);

    var hitYeti = cave.launchSpear("east");
    var yetiLocation = cave.find("Yeti");
    var yetiSmellLocation = cave.find("YetiSmell");

    assert(yetiLocation == -1 && yetiSmellLocation == -1, "Either yeti or yeti smell found when throwing spear east");
}

WhenSpearThrownWest_YetiMissed();
WhenSpearThrownEast_YetiHit();
WhenSpearThrownEast_NoTraceOfYetiOrSmell();
