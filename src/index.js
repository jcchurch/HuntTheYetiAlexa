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
const Alexa = require('alexa-sdk');
var HuntTheYetiGame = require('./controller/HuntTheYetiGame');

var APP_ID = "amzn1.ask.skill.cd76cca4-65d0-4df4-994e-49430b7ed7ed";

var openingMessage = "Welcome to Yeti Hunt. Say 'Begin Game', or 'How to Play', or 'Overview'.";
var openingMessageReprompt = "Say 'Begin Game', or 'How to Play', or 'Overview'.";
var howToPlayMessage = "You move the hunter by saying 'move' and then any of the four cardinal directions (north, south, east, or west). To throw your only spear, say 'throw the spear' and then any cardinal direction. Once you throw the spear, the game is over. To begin a new game, say 'Begin game'. For an overview, say 'overview'.";
var overviewMessage = "In Yeti Hunt, you are a hunter, armed with a single spear, in a dark five by five room cave. There are bats, open pits, and a terrible Yeti. Your goal is to kill the Yeti with a single spear throw. To begin a new game, say 'Begin game'. To get help, say 'how to play'.";
var newGameMessage = "To start a new game, say 'begin game'.";
var quickHelpMessage = "To begin a new game, say 'Begin game'. For an overview, say 'overview'. For help, say 'how to play'.";
var endGameMessage = "Okay. Bye. Thanks for playing.";

var beginGame = function () {
    this.attributes['game'] = new HuntTheYetiGame();
    var messages = this.attributes['game'].getIntroduction();
    this.emit(':ask', messages[0], messages[1]);
};

var moveHunter = function () {
    if (this.attributes['game'] == null) {
        this.emit(':ask', newGameMessage, newGameMessage);
        return;
    }

    this.attributes['game'] = new HuntTheYetiGame(this.attributes['game']);

    var aDirection = this.event.request.intent.slots.Direction.value;
    var messages = this.attributes['game'].moveHunter(aDirection);
    this.emit(':ask', messages[0], messages[1]);
};

var throwSpear = function () {
    if (this.attributes['game'] == null) {
        this.emit(':ask', newGameMessage, newGameMessage);
        return;
    }

    this.attributes['game'] = new HuntTheYetiGame(this.attributes['game']);

    var aDirection = this.event.request.intent.slots.Direction.value;
    var messages = this.attributes['game'].launchSpear(aDirection);
    this.emit(':ask', messages[0], messages[1]);
};

var pauseGame = function () {
    if (this.attributes['game'] == null) {
        this.emit(':ask', newGameMessage, newGameMessage);
        return;
    }

    this.attributes['game'] = new HuntTheYetiGame(this.attributes['game']);

    var messages = this.attributes['game'].pause();
    this.emit(':ask', messages[0], messages[1]);
};

var handlers = {
    "LaunchRequest": function () { this.emit(':ask', openingMessage, openingMessageReprompt) },
    "HowToPlay": function () { this.emit(':ask', howToPlayMessage, quickHelpMessage); },
    "Overview": function () { this.emit(':ask', overviewMessage, quickHelpMessage) },
    "PauseGame": pauseGame,
    "BeginGame": beginGame,
    "MoveHunter": moveHunter,
    "ThrowSpear": throwSpear,
    "AMAZON.CancelIntent": function () { this.emit(':tell', endGameMessage) },
    "AMAZON.StopIntent": function () { this.emit(':tell', endGameMessage) },
    "AMAZON.HelpIntent": function () { this.emit(':ask', howToPlayMessage, quickHelpMessage) },
    "Unhandled": function () { this.emit(':ask', howToPlayMessage, quickHelpMessage) }
};

exports.handler = (event, context, callback) => {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
