module.exports = {
    canHandle({requestEnvelope}) {
        return requestEnvelope.request.type === 'IntentRequest'
        && ['AMAZON.HelpIntent', 'HowToPlay'].indexOf(requestEnvelope.request.intent.name)>=0;
    },
    handle(handlerInput){
        const attributes = handlerInput.attributesManager.getRequestAttributes();
        return handlerInput.responseBuilder
        .speak(attributes.t('howToPlayMessage'))
        .reprompt(attributes.t('quickHelpMessage'))
        .getResponse();
    }
};
