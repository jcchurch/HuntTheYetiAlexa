module.exports = {
    canHandle(handlerInput) {
        const { request } = handlerInput.requestEnvelope;

        return request.type === 'LaunchRequest'
        || (request.type === 'IntentRequest'
            && request.intent.name === 'AMAZON.StartOverIntent');
    },
    handle(handlerInput) {
        const attributes = handlerInput.attributesManager.getRequestAttributes();
        return handlerInput.responseBuilder
        .speak(attributes.t('openingMessage'))
        .reprompt(attributes.t('openingMessageReprompt'))
        .getResponse();
    },
};