module.exports = {
    canHandle() {
      return true;
    },
    handle(handlerInput, error) {
      const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
      let errorMessage = requestAttributes.t ? requestAttributes.t("errorMessage") : "Je n'ai pas compris, veuillez répéter";
      if (error) {
        errorMessage = `<say-as interpret-as="interjection">Oups</say-as>, une erreur est survenue. <lang xml:lang="en-US">${error.message}</lang>`
        console.warn(`Error handled: ${error.message}`);
      }
  
      return handlerInput.responseBuilder
        .speak(errorMessage)
        .reprompt(errorMessage)
        .getResponse();
    },
};