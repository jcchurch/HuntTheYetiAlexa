const localize = require('../i18n/localize');

module.exports = {
    process(handlerInput) {
        const attributes = handlerInput.attributesManager.getRequestAttributes();
        attributes.t = localize(handlerInput.requestEnvelope.request.locale);
    },
};