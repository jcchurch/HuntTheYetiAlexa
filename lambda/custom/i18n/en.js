module.exports = { translation : {
    "openingMessage" : "Welcome to Yeti Hunt. Say 'Begin Game', or 'How to Play', or 'Overview'.",
    "openingMessageReprompt" : "Say 'Begin Game', or 'How to Play', or 'Overview'.",
    "howToPlayMessage" : "You move the hunter by saying 'move' and then any of the four cardinal directions (north, south, east, or west). To throw your only spear, say 'throw the spear' and then any cardinal direction. Once you throw the spear, the game is over. To begin a new game, say 'Begin game'. For an overview, say 'overview'.",
    "overviewMessage" : "In Yeti Hunt, you are a hunter, armed with a single spear, in a dark five by five room cave. There are bats, open pits, and a terrible Yeti. Your goal is to kill the Yeti with a single spear throw. To begin a new game, say 'Begin game'. To get help, say 'how to play'.",
    "newGameMessage" : "To start a new game, say 'begin game'.",
    "quickHelpMessage" : "To begin a new game, say 'Begin game'. For an overview, say 'overview'. For help, say 'how to play'.",
    "endGameMessage" : "Okay. Bye. Thanks for playing.",
    "saved": " Your game was saved.",
    "objectsDescriptions": {
        "Bat": "<audio src='https://s3.amazonaws.com/yetihuntaudio/bat_screech.mp3'/> An enormous bat swoops down and carries the hunter to a new location. Good luck!",
        "BatSounds": "<audio src='https://s3.amazonaws.com/yetihuntaudio/bat_flutter.mp3'/> Enormous bats are heard nearby.",
        "Pit": "<audio src='https://s3.amazonaws.com/yetihuntaudio/hunter_falls.mp3'/> The hunter steps into an open pit and falls!",
        "PitDraft": "<audio src='https://s3.amazonaws.com/yetihuntaudio/pit_draft.mp3'/> The draft of an open pit is felt nearby.",
        "Yeti": "<audio src='https://s3.amazonaws.com/yetihuntaudio/yeti_attack.mp3'/> The impressive Yeti attacks the hunter!",
        "YetiSmell": "<audio src='https://s3.amazonaws.com/yetihuntaudio/yeti_growl.mp3'/> The smell of a hungry Yeti is in the air.",
        "Hunter": "The Hunter"
    },
    "consequencesDescriptions": {
        "random_location": "<audio src='https://s3.amazonaws.com/yetihuntaudio/bat_screech.mp3'/> Enormous bats have picked up and dropped the hunter in a different part of the cave. ",
        "cannot_move": "<audio src='https://s3.amazonaws.com/yetihuntaudio/hunter_bumps_into_wall.mp3'/> The hunter bumps into a wall. ",
        "death": "The hunter has died. The game is over."
    },
    "hunterSensesNothing": "The hunter does not sense anything near. ",
    "directions": {
        "NORTH": "north",
        "SOUTH": "south",
        "EAST": "east",
        "WEST": "west",
        "confirmation": {
            "NORTH": "north",
            "SOUTH": "south",
            "EAST": "east",
            "WEST": "west"
        }
    },
    "errorMessage": "Sorry, I didn't understand. Please say again.",
    "hunterMayMoveMessage": "The hunter may move ",
    "openDirections": "Rooms are open ",
    "or": " or ",
    "gameOverMessage": "The game is over. Say 'Begin Game' or 'Stop'.",
    "introMessage": "The hunter, armed with a spear, is lost in a cave. Help the hunter escape. ",
    "introMessage_plural": "The hunter, armed with {{count}} spears, is lost in a cave. Help the hunter escape. ",
    "playAgainMessage": " If you would like to play again, say 'Begin Game' or say 'Stop'",
    "playAgainReprompt": "The game is over. Say 'Begin Game' or 'Stop'.",
    "stillThereMessage": "Are you still there? ",
    "audio": {
        "spearHit": "<audio src='https://s3.amazonaws.com/yetihuntaudio/spear_throw.mp3'/> <audio src='https://s3.amazonaws.com/yetihuntaudio/yeti_death.mp3'/>",
        "spearMiss": "<audio src='https://s3.amazonaws.com/yetihuntaudio/spear_throw.mp3'/> <audio src='https://s3.amazonaws.com/yetihuntaudio/spear_hits_wall.mp3'/>"
    },
    "killYetiMessage": "$t(audio.spearHit) The spear hits the yeti! The yeti falls over dead and the hunter lives! <audio src='https://s3.amazonaws.com/yetihuntaudio/victory.mp3'/> The game is over. You win!",
    "didHit": "$t(audio.spearHit) The spear hits the yeti! Keep hunting. There are still more yeti lurking in the cave.",
    "didMiss": "$t(audio.spearMiss) The hunter missed the yeti and is now defenseless. The game is over.",
    "didMissOneAndLose": "$t(audio.spearMiss) The hunter missed the yeti. The hunter lacks enough spears to defeat the remaining yeti. The game is over.",
    "didMissOne": "$t(audio.spearMiss) The hunter missed the yeti. Your spear count is dwindling. Keep going.",
    "IllWaitMessage": "I'll wait. ",
    "IllWaitReprompt": "Are you still there? "
} };