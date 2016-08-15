module.exports = {
    "Bat": {
        name: "Bat",
        effect: "BatSounds",
        description: "<audio src='https://s3.amazonaws.com/yetihuntaudio/bat_screech.mp3'/> An enormous bat swoops down and carries the hunter to a new location. Good luck!",
        consequence: "random_location"
    },
    "BatSounds": {
        name: "BatFluttering",
        effect: null,
        description: "<audio src='https://s3.amazonaws.com/yetihuntaudio/bat_flutter.mp3'/> Enormous bats are heard nearby.",
        consequence: ""
    },
    "Pit": {
        name: "Pit",
        effect: "PitDraft",
        description: "<audio src='https://s3.amazonaws.com/yetihuntaudio/hunter_falls.mp3'/> The hunter steps into an open pit and falls!",
        consequence: "death"
    },
    "PitDraft": {
        name: "PitDraft",
        effect: null,
        description: "<audio src='https://s3.amazonaws.com/yetihuntaudio/pit_draft.mp3'/> The draft of an open pit is felt nearby.",
        consequence: ""
    },
    "Yeti": {
        name: "Yeti",
        effect: "YetiSmell",
        description: "<audio src='https://s3.amazonaws.com/yetihuntaudio/yeti_attack.mp3'/> The impressive Yeti attacks the hunter!",
        consequence: "death"
    },
    "YetiSmell": {
        name: "YetiSmell",
        effect: null,
        description: "<audio src='https://s3.amazonaws.com/yetihuntaudio/yeti_growl.mp3'/> The smell of a hungry Yeti is in the air.",
        consequence: ""
    },
    "Hunter": {
        name: "Hunter",
        effect: null,
        description: "The Hunter",
        consequence: ""
    }
};
