module.exports = {
    "Bat": {
        name: "Bat",
        effect: "BatSounds",
        description: "An enormous bat swoops down and carries the hunter to a new location. Good luck!",
        consequence: "random_location"
    },
    "BatSounds": {
        name: "BatFluttering",
        effect: null,
        description: "Enormous bats are heard nearby.",
        consequence: ""
    },
    "Pit": {
        name: "Pit",
        effect: "PitDraft",
        description: "The hunter steps into an open pit and falls!",
        consequence: "death"
    },
    "PitDraft": {
        name: "PitDraft",
        effect: null,
        description: "The draft of an open pit is felt nearby.",
        consequence: ""
    },
    "Yeti": {
        name: "Yeti",
        effect: "YetiSmell",
        description: "The impressive Yeti attacks the hunter!",
        consequence: "death"
    },
    "YetiSmell": {
        name: "YetiSmell",
        effect: null,
        description: "The smell of a hungry Yeti is in the air.",
        consequence: ""
    },
    "Hunter": {
        name: "Hunter",
        effect: null,
        description: "The Hunter",
        consequence: ""
    }
};
