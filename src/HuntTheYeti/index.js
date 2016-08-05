var APP_ID = "amzn1.ask.skill.cd76cca4-65d0-4df4-994e-49430b7ed7ed";

var AlexaSkill = require('./AlexaSkill');
var HuntTheWumpusGame = require('./controller/HuntTheWumpusGame');

/**
 * HuntTheWumpusSkill is a child of AlexaSkill.
 */
var HuntTheWumpusSkill = function () {
    AlexaSkill.call(this, APP_ID);
    this.game = null;
};

// Extend AlexaSkill
HuntTheWumpusSkill.prototype = Object.create(AlexaSkill.prototype);
HuntTheWumpusSkill.prototype.constructor = HuntTheWumpusSkill;

HuntTheWumpusSkill.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("HuntTheWumpusSkill onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    var speechOutput = "Welcome to Hunt the Wumpus. Say 'Begin Game' to begin to the game. Say 'How to Play' to learn how to play the game. Or say 'Overview' for an overview of Hunt the Wumpus.";
    var repromptOutput = "I'm not sure what you mean. Say 'Begin Game' to begin to the game. Say 'How to Play' to learn how to play the game. Or say 'Overview' for an overview of Hunt the Wumpus.";
    response.ask(speechOutput, repromptOutput);
};

HuntTheWumpusSkill.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("HuntTheWumpusSkill onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);
};

HuntTheWumpusSkill.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("HelloWorld onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);
};

HuntTheWumpusSkill.prototype.intentHandlers = {
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
    }
};

HuntTheWumpusSkill.prototype.beginGame = function (session, response) {
    this.game = new HuntTheWumpusGame();

    response.ask("The hunter, armed with a spear, is lost in a cave. Help the hunter escape.", "");
    response.ask(this.game.reportRoomDescription(), "");
}

HuntTheWumpusSkill.prototype.moveHunter = function (intent, session, response) {
    if (this.game == null) {
        response.ask("To start a game, say 'Begin Game'.", "");
        return;
    }

    if (this.game.isPlaying()) {
        var aDirection = intent.slots.Direction.value;
        this.game.moveHunter(aDirection);
        response.ask(this.game.reportRoomDescription(), "");
        response.ask(this.game.reportConsequence(), "");
    }
    else {
        response.tell("The game is over.");
    }
}

HuntTheWumpusSkill.prototype.throwSpear = function (intent, session, response) {
    if (this.game == null) {
        response.ask("To start a game, say 'Begin Game'.", "");
        return;
    }

    if (this.game.isPlaying()) {
        var aDirection = intent.slots.Direction.value;
        this.game.moveHunter(aDirection);
        response.ask(this.game.reportConsequence());
    }
    else {
        response.tell("The game is over.");
    }
}

HuntTheWumpusSkill.prototype.tellHowToPlay = function (session, response) {
    var speechOutput = "You move the hunter by saying 'move north' for example to move the hunter north. You can say any of the four cardinal directions (north, south, east, or west) to move. Once you believe that you know where the wumpus is located, you can throw your only spear by saying 'throw the spear north' (or any cardinal direction). Once you throw the spear, the game is over.";
    response.ask(speechOutput, "");
};

HuntTheWumpusSkill.prototype.tellOverview = function (session, response) {
    var speechOutput = "In the game Hunt The Wumpus, you are a hunter, armed with a single spear, in a dark five by five room cave. There are two bats, two open pits, and a terrible Wumpus. You begin your adventure in a safe room of the cave. Your goal is to kill the Wumpus with your single spear. Beware! If you throw the spear and miss, you lose.";
    response.ask(speechOutput, "");
};

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the HelloWorld skill.
    var huntTheWumpus = new HuntTheWumpusSkill();
    huntTheWumpus.execute(event, context);
};
