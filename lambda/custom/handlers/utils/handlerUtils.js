function getResolvedEntityId(handlerInput, slotName) {
    const entity = handlerInput.requestEnvelope.request.intent.slots[slotName];
    
    let ret = entity.value;
    if (entity.resolutions && entity.resolutions.resolutionsPerAuthority) {
        for (let resolution of entity.resolutions.resolutionsPerAuthority) {
            if (resolution.status.code == 'ER_SUCCESS_MATCH') {
                ret = resolution.values[0].value.id;
            }
        }
    }
    if (ret == entity.value) {
        console.warn(`Could not find entity ID, fallback to ${ret}`, JSON.stringify(entity, null, '\t'));
    }
    return ret;
}

module.exports = {
    getResolvedEntityId
};