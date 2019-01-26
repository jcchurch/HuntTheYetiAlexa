const HuntTheYetiGame = require('../controller/HuntTheYetiGame');

module.exports = {
    canHandle({requestEnvelope}) {
        return requestEnvelope.request.type === 'IntentRequest'
        && requestEnvelope.request.intent.name === 'PauseGame';
    },
    handle(handlerInput){
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        const attributes = handlerInput.attributesManager.getRequestAttributes();

        if (sessionAttributes['game'] == null) {
            return handlerInput.responseBuilder
                .speak(attributes.t('newGameMessage'))
                .reprompt(attributes.t('newGameMessage'))
                .getResponse();
        }
    
        sessionAttributes['game'] = new HuntTheYetiGame(attributes.t, sessionAttributes['game']);
    
        var messages = sessionAttributes['game'].pause();
        handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
        return handlerInput.responseBuilder
        .speak(messages[0])
        .reprompt(messages[1])
        .getResponse();
    }
};
