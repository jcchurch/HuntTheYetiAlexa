const i18next = require('i18next');
const languageStrings = {
    'en' : require('./en'),
    'fr' : require('./fr')
}
function init(locale) {
    i18next.init({
        lng: locale,
        fallbackLng: 'en',
        resources: languageStrings,
        returnObjects: true
    });
    function localize(...args) {
        const value = i18next.t(...args);
        //  automatically pick a response at random if a specific key has an array of possible responses
        if (Array.isArray(value)) {
            return value[Math.floor(Math.random() * value.length)];
        } else {
            return value;
        }
    }
    return localize;
}
module.exports = init;
