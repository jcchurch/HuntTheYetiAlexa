const HuntTheYetiGame = require('../controller/HuntTheYetiGame');

module.exports = {
    canHandle(handlerInput) {
      const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
          && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.RepeatIntent'
          && sessionAttributes['game'];
    },
    handle(handlerInput) {
      const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
      const attributes = handlerInput.attributesManager.getRequestAttributes();

      sessionAttributes['game'] = new HuntTheYetiGame(attributes.t, sessionAttributes['game']);
  
      var description = sessionAttributes['game'].getRoomDescriptionAndOpenings();

      return handlerInput.responseBuilder
      .speak(description)
      .reprompt(description)
      .getResponse();
    }
  };
