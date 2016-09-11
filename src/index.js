var APP_ID = "amzn1.ask.skill.cd76cca4-65d0-4df4-994e-49430b7ed7ed";

var AlexaSkill = require('./AlexaSkill');
var HuntTheYetiGame = require('./controller/HuntTheYetiGame');

/**
 * HuntTheYetiSkill is a child of AlexaSkill.
 */
var HuntTheYetiSkill = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
HuntTheYetiSkill.prototype = Object.create(AlexaSkill.prototype);
HuntTheYetiSkill.prototype.constructor = HuntTheYetiSkill;

HuntTheYetiSkill.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    session.attributes.game = null;

    console.log("HuntTheYetiSkill onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    var speechOutput = "Welcome to Yeti Hunt. Say 'Begin Game', or 'How to Play', or 'Overview'.";
    var repromptOutput = "Say 'Begin Game', or 'How to Play', or 'Overview'.";
    response.ask(speechOutput, repromptOutput);
};

HuntTheYetiSkill.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("HuntTheYetiSkill onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);
};

HuntTheYetiSkill.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("HuntTheYeti onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);
};

HuntTheYetiSkill.prototype.intentHandlers = {
    "HowToPlay": function (intent, session, response) {
        this.tellHowToPlay(session, response);
    },

    "Overview": function (intent, session, response) {
        this.tellOverview(session, response);
    },

    "PauseGame": function (intent, session, response) {
        this.pauseGame(session, response);
    },

    "BeginGame": function (intent, session, response) {
        this.beginGame(session, response);
    },

    "MoveHunter": function (intent, session, response) {
        this.moveHunter(intent, session, response);
    },

    "ThrowSpear": function (intent, session, response) {
        this.throwSpear(intent, session, response);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        this.endGame(session, response);
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        this.endGame(session, response);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        this.tellHowToPlay(session, response);
    }
};

HuntTheYetiSkill.prototype.beginGame = function (session, response) {
    session.attributes.game = new HuntTheYetiGame();
    var messages = session.attributes.game.getIntroduction();
    response.askSSML(messages[0], messages[1]);
};

HuntTheYetiSkill.prototype.endGame = function (session, response) {
    response.tellSSML("Okay. Bye. Thanks for playing.");
};

HuntTheYetiSkill.prototype.moveHunter = function (intent, session, response) {
    if (session.attributes.game == null) {
        presentNewGameMessage(response);
        return;
    }

    session.attributes.game = new HuntTheYetiGame(session.attributes.game);

    var aDirection = intent.slots.Direction.value;
    var messages = session.attributes.game.moveHunter(aDirection);
    response.askSSML(messages[0], messages[1]);
};

HuntTheYetiSkill.prototype.throwSpear = function (intent, session, response) {
    if (session.attributes.game == null) {
        presentNewGameMessage(response);
        return;
    }

    session.attributes.game = new HuntTheYetiGame(session.attributes.game);

    var aDirection = intent.slots.Direction.value;
    var messages = session.attributes.game.launchSpear(aDirection);
    response.askSSML(messages[0], messages[1]);
};

HuntTheYetiSkill.prototype.pauseGame = function (session, response) {
    if (session.attributes.game == null) {
        presentNewGameMessage(response);
        return;
    }

    session.attributes.game = new HuntTheYetiGame(session.attributes.game);

    var messages = session.attributes.game.pause();
    response.askSSML(messages[0], messages[1]);
};

HuntTheYetiSkill.prototype.tellHowToPlay = function (session, response) {
    var speechOutput = "You move the hunter by saying 'move' and then any of the four cardinal directions (north, south, east, or west). To throw your only spear, say 'throw the spear' and then any cardinal direction. Once you throw the spear, the game is over. To begin a new game, say 'Begin game'. For an overview, say 'overview'.";
    response.ask(speechOutput, getQuickHelp());
};

HuntTheYetiSkill.prototype.tellOverview = function (session, response) {
    var speechOutput = "In Yeti Hunt, you are a hunter, armed with a single spear, in a dark five by five room cave. There are bats, open pits, and a terrible Yeti. Your goal is to kill the Yeti with a single spear throw. To begin a new game, say 'Begin game'. To get help, say 'how to play'.";
    response.ask(speechOutput, getQuickHelp());
};

function presentNewGameMessage(response) {
    response.ask("To start a game, say 'Begin Game'.",
                 "To start, say 'Begin Game'.");
}

function getQuickHelp() {
    return "To begin a new game, say 'Begin game'. For an overview, say 'overview'. For help, say 'how to play'.";
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the HuntTheYetiSkill skill.
    var huntTheYeti = new HuntTheYetiSkill();
    huntTheYeti.execute(event, context);
};

