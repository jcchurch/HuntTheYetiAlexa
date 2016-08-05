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
    var speechOutput = "Welcome to Hunt the Yeti. Say 'Begin Game' to begin to the game. Say 'How to Play' to learn how to play the game. Or say 'Overview' for an overview of Hunt the Yeti.";
    var repromptOutput = "I'm not sure what you mean. Say 'Begin Game' to begin to the game. Say 'How to Play' to learn how to play the game. Or say 'Overview' for an overview of Hunt the Yeti.";
    response.ask(speechOutput, repromptOutput);
};

HuntTheYetiSkill.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("HuntTheYetiSkill onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);
};

HuntTheYetiSkill.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("HelloWorld onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);
};

HuntTheYetiSkill.prototype.intentHandlers = {
    "HowToPlay": function (intent, session, response) {
        this.tellHowToPlay(session, response);
    },

    "Overview": function (intent, session, response) {
        this.tellOverview(session, response);
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
        this.tellHowToPlay(session, response);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        this.endGame(session, response);
    }

};

HuntTheYetiSkill.prototype.beginGame = function (session, response) {
    session.attributes.game = new HuntTheYetiGame();

    response.ask("The hunter, armed with a spear, is lost in a cave. Help the hunter escape.", "");
    response.ask(session.attributes.game.reportRoomDescription(), "");
}

HuntTheYetiSkill.prototype.endGame = function (session, response) {
    response.tell("Okay. Bye. Thanks for playing.");
}

HuntTheYetiSkill.prototype.moveHunter = function (intent, session, response) {
    if (session.attributes.game == null) {
        response.ask("To start a game, say 'Begin Game'.", "");
        return;
    }

    if (session.attributes.game.isPlaying()) {
        var aDirection = intent.slots.Direction.value;
        session.attributes.game.moveHunter(aDirection);
        response.ask(session.attributes.game.reportRoomDescription(), "");
        response.ask(session.attributes.game.reportConsequence(), "");
    }
    else {
        response.tell("The game is over.");
    }
}

HuntTheYetiSkill.prototype.throwSpear = function (intent, session, response) {
    if (session.attributes.game == null) {
        response.ask("To start a game, say 'Begin Game'.", "");
        return;
    }

    if (session.attributes.game.isPlaying()) {
        var aDirection = intent.slots.Direction.value;
        session.attributes.game.throwSpear(aDirection);
        response.ask(session.attributes.game.reportConsequence());
    }
    else {
        response.tell("The game is over.");
    }
}

HuntTheYetiSkill.prototype.tellHowToPlay = function (session, response) {
    var speechOutput = "You move the hunter by saying 'move north' for example to move the hunter north. You can say any of the four cardinal directions (north, south, east, or west) to move. Once you believe that you know where the Yeti is located, you can throw your only spear by saying 'throw the spear north' (or any cardinal direction). Once you throw the spear, the game is over.";
    response.ask(speechOutput, "");
};

HuntTheYetiSkill.prototype.tellOverview = function (session, response) {
    var speechOutput = "In the game Hunt The Yeti, you are a hunter, armed with a single spear, in a dark five by five room cave. There are two bats, two open pits, and a terrible Yeti. You begin your adventure in a safe room of the cave. Your goal is to kill the Yeti with your single spear. Beware! If you throw the spear and miss, you lose.";
    response.ask(speechOutput, "");
};

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the HelloWorld skill.
    var huntTheYeti = new HuntTheYetiSkill();
    huntTheYeti.execute(event, context);
};
