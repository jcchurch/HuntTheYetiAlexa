/**

This file is part of Hunt the Yeti.

Hunt the Yeti is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.

*/

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
