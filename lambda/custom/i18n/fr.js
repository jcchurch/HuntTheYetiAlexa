module.exports = { translation : {
    "openingMessage" : "Bienvenue à la chasse au Yéti. Dites 'Nouveau jeu', ou 'Comment jouer', ou 'Introduction'.",
    "openingMessageReprompt" : "Dites 'Nouveau jeu', ou 'Comment jouer', ou 'Introduction'.",
    "howToPlayMessage" : "Vous déplacez le chasseur en disant par exemple 'va vers le Nord', l'<w role='amazon:NN'>Est</w>, l'Ouest ou le Sud. Pour lancer votre lance, dites 'attaque vers le Nord' ou 'envoie la lance vers le Sud', l'<w role='amazon:NN'>Est</w>, ou l'Ouest. Une fois que vous avez envoyé la lance, le jeu est terminé - si vous avez envoyé la lance dans la direction du Yéti, vous avez gagné, sinon, le Yéti va finir par attaquer le chasseur sans défense. Pour commencer un nouveau jeu, dites 'nouveau jeu'. Pour une introduction, dites 'introduction'.",
    "overviewMessage" : "Dans Chasse au Yéti, vous êtes un chasseur, armé d'une seule lance, dans une grotte de cinq cases par cinq. Il y a deux chauve-souris géantes, deux fosses profondes, et un terrible Yéti. Votre objectif est de tuer le Yéti en un seul tir de lance. Pour commencer un nouveau jeu, dites 'Nouveau jeu'. Pour les règles, dites 'comment jouer'.",
    "newGameMessage" : "Pour démarrer un nouveau jeu, dites 'nouveau jeu'.",
    "quickHelpMessage" : "Pour commencer un nouveau jeu, dites 'nouveau jeu'. Pour une introduction, dites 'introduction'. Pour les règles, dites 'comment jouer'.",
    "endGameMessage" : "D'accord, au revoir. Merci d'avoir joué.",
    "saved": " Votre partie a été sauvegardée.",
    "objectsDescriptions": {
        "Bat": "<audio src='https://s3.amazonaws.com/yetihuntaudio/bat_screech.mp3'/> Une énorme chauve-souris descend en piqué et transporte le chasseur vers un nouvel endroit. Bonne chance !",
        "BatSounds": "<audio src='https://s3.amazonaws.com/yetihuntaudio/bat_flutter.mp3'/> On entend d'énormes chauves-souris à proximité.",
        "Pit": "<audio src='https://s3.amazonaws.com/yetihuntaudio/hunter_falls.mp3'/> Le chasseur tombe dans une fosse profonde !",
        "PitDraft": "<audio src='https://s3.amazonaws.com/yetihuntaudio/pit_draft.mp3'/> On sent le courant d'air d'une fosse profonde pas loin.",
        "Yeti": "<audio src='https://s3.amazonaws.com/yetihuntaudio/yeti_attack.mp3'/> L'impressionnant Yéti attaque le chasseur !",
        "YetiSmell": "<audio src='https://s3.amazonaws.com/yetihuntaudio/yeti_growl.mp3'/> L'odeur d'un Yeti affamé est dans l'air.",
        "Hunter": "Le chasseur"
    },
    "consequencesDescriptions": {
        "random_location": "<audio src='https://s3.amazonaws.com/yetihuntaudio/bat_screech.mp3'/> D'énormes chauves-souris ont soulevé et transporté le chasseur dans un autre endroit de la grotte. ",
        "cannot_move": "<audio src='https://s3.amazonaws.com/yetihuntaudio/hunter_bumps_into_wall.mp3'/> Le chasseur se cogne contre un mur. ",
        "death": "Le chasseur est mort. La partie est terminée."
    },
    "hunterSensesNothing": "Le chasseur ne sent rien dans les environs. ",
    "directions": {
        "NORTH": "le Nord",
        "SOUTH": "le Sud",
        "EAST": "l'<w role='amazon:NN'>Est</w>",
        "WEST": "l'Ouest",
        "confirmation": {
            "NORTH": "Nord",
            "SOUTH": "Sud",
            "EAST": "<w role='amazon:NN'>Est</w>",
            "WEST": "Ouest"
        }
    },
    "errorMessage": "Désolé, je n'ai pas compris. Que voulez-vous dire ?",
    "hunterMayMoveMessage": "Le chasseur peut aller vers ",
    "openDirections": "Il y a une salle vers ",
    "or": " ou ",
    "gameOverMessage": "La partie est terminée. Dites 'nouvelle partie' ou 'stop'.",
    "introMessage": "Le chasseur, armé d'une lance, est perdu dans une grotte. Aide le chasseur à s'échapper. ",
    "introMessage_plural": "Le chasseur, armé de {{count}} lances, est perdu dans une grotte. Aide le chasseur à s'échapper. ",
    "playAgainMessage": " Si vous voulez recommencer, dites 'nouvelle partie', sinon dites 'Stop'",
    "playAgainReprompt": "Le jeu est terminé. Dites 'nouvelle partie' ou 'stop'.",
    "stillThereMessage": "Êtes-vous toujours là ? ",
    "audio": {
        "spearHit": "<audio src='https://s3.amazonaws.com/yetihuntaudio/spear_throw.mp3'/> <audio src='https://s3.amazonaws.com/yetihuntaudio/yeti_death.mp3'/>",
        "spearMiss": "<audio src='https://s3.amazonaws.com/yetihuntaudio/spear_throw.mp3'/> <audio src='https://s3.amazonaws.com/yetihuntaudio/spear_hits_wall.mp3'/>"
    },
    "killYetiMessage": "$t(audio.spearHit) La lance frappe le yéti! Le yéti est mort et le chasseur est vivant ! <audio src='https://s3.amazonaws.com/yetihuntaudio/victory.mp3'/> La partie est terminée. Vous avez gagné !",
    "didHit": "$t(audio.spearHit) La lance frappe le yéti ! Continuez à chasser. Il y a encore d'autres yétis qui se cachent dans la grotte.",
    "didMiss": "$t(audio.spearMiss) Le chasseur a raté le yeti et est maintenant sans défense. Le jeu est terminé.",
    "didMissOneAndLose": "$t(audio.spearMiss) Le chasseur a raté le yeti. Le chasseur n'a plus suffisamment de lances pour vaincre les yétis restants. Le jeu est terminé.",
    "didMissOne": "$t(audio.spearMiss) Le chasseur a raté le yeti. Vous avez une lance de moins. Continuez.",
    "IllWaitMessage": "D'accord j'attends. ",
    "IllWaitReprompt": "Êtes-vous toujours là ? "
} }