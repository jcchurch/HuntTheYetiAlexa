const HuntTheYetiGame = require('../controller/HuntTheYetiGame');

module.exports = {
    canHandle({requestEnvelope}) {
        return requestEnvelope.request.type === 'IntentRequest'
        && requestEnvelope.request.intent.name === 'BeginGame';
    },
    handle(handlerInput) {
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        const attributes = handlerInput.attributesManager.getRequestAttributes();
        sessionAttributes['game'] = new HuntTheYetiGame(attributes.t);
        var messages = sessionAttributes['game'].getIntroduction();
        handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
        return handlerInput.responseBuilder
        .speak(messages[0])
        .reprompt(messages[1])
        .getResponse();
    }
};