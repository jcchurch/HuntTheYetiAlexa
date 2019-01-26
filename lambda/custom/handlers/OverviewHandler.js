module.exports = {
    canHandle({requestEnvelope}) {
        return requestEnvelope.request.type === 'IntentRequest'
        && requestEnvelope.request.intent.name === 'Overview';
    },
    handle(handlerInput){
        const attributes = handlerInput.attributesManager.getRequestAttributes();
        return handlerInput.responseBuilder
        .speak(attributes.t('overviewMessage'))
        .reprompt(attributes.t('quickHelpMessage'))
        .getResponse();
    }
}
