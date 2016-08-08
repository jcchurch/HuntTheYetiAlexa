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
    var speechOutput = "Welcome to Hunt the Yeti. Say 'Begin Game', or 'How to Play', or 'Overview'.";
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
    var roomDescription = session.attributes.game.getRoomDescription();
    var roomOpenings = session.attributes.game.getRoomOpenings();

    response.ask("The hunter, armed with a spear, is lost in a cave. Help the hunter escape. "
                 + roomDescription
                 + " "
                 + roomOpenings
                 ,
                 roomOpenings);
};

HuntTheYetiSkill.prototype.endGame = function (session, response) {
    response.tell("Okay. Bye. Thanks for playing.");
};

HuntTheYetiSkill.prototype.moveHunter = function (intent, session, response) {
    if (session.attributes.game == null) {
        response.ask("To start a game, say 'Begin Game'.", "To start, say 'Begin Game'.");
        return;
    }

    session.attributes.game = new HuntTheYetiGame(session.attributes.game);

    if (session.attributes.game.isPlaying()) {
        var aDirection = intent.slots.Direction.value;
        session.attributes.game.moveHunter(aDirection);

        if (session.attributes.game.isPlaying()) {
            response.ask(aDirection
                     + ". "
                     + session.attributes.game.getRoomDescription()
                     + " "
                     + session.attributes.game.getRoomOpenings(),
                     "I'm ready to play when you are.");
        }
    }

    if (!session.attributes.game.isPlaying()) {
        response.tell(session.attributes.game.getRoomDescription()
                      + " "
                      + session.attributes.game.getConsequence());
    }
};

HuntTheYetiSkill.prototype.throwSpear = function (intent, session, response) {
    if (session.attributes.game == null) {
        response.ask("To start a game, say 'Begin Game'.", "To start, say 'Begin Game'.");
        return;
    }

    session.attributes.game = new HuntTheYetiGame(session.attributes.game);

    if (session.attributes.game.isPlaying()) {
        var aDirection = intent.slots.Direction.value;
        session.attributes.game.launchSpear(aDirection);
        response.tell(session.attributes.game.getConsequence());
    }
    else {
        response.tell("The game is over.");
    }
};

HuntTheYetiSkill.prototype.pauseGame = function (session, response) {
    var speechOutput = "I'll wait. To begin a new game, say 'Begin game.' To move, say 'move' and a direction. To throw the spear, say 'throw' and a direction.";
    response.ask(speechOutput, "I'm ready to play when you are.");
};


HuntTheYetiSkill.prototype.tellHowToPlay = function (session, response) {
    var speechOutput = "You move the hunter by saying 'move north' or any of the four cardinal directions (north, south, east, or west). To throw your only spear, say 'throw the spear north' (or any cardinal direction). Once you throw the spear, the game is over. To begin a new game, say 'Begin game'.";
    response.ask(speechOutput, "I'm ready to play when you are.");
};

HuntTheYetiSkill.prototype.tellOverview = function (session, response) {
    var speechOutput = "In Hunt The Yeti, you are a hunter, armed with a single spear, in a dark five by five room cave. There are bats, open pits, and a terrible Yeti. Your goal is to kill the Yeti with a single spear throw. To begin a new game, say 'Begin game'.";
    response.ask(speechOutput, "I'm ready to play when you are.");
};

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the HuntTheYetiSkill skill.
    var huntTheYeti = new HuntTheYetiSkill();
    huntTheYeti.execute(event, context);
};

