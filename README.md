# Hunt the Yeti skill for Amazon Echo

## License 

As of May 16, 2017, this code is distributed under the GPL. You may use the code under the GPL terms and conditions, [which are best explained here](https://tldrlegal.com/license/gnu-general-public-license-v3-(gpl-3)). The most notable requirement of the GPL is that you must disclose your source code. You may use this in a commercial product, but ultimately I want this to be an educational experience. 

## Overview

Hunt the Yeti is an interpretation of Hunt the Wumpus, a classic game for teaching artificial intelligence. The game is played on a five-by-five grid of rooms called a cave. Scattered around the cave are:

- 1 hunter: You control the hunter.
- 1 yeti: Your goal is to defeat the yeti.
- 2 open pits: If the hunter falls into a pit, the hunter dies.
- 2 bats: If the hunter enters a room with bats, the bats pick the hunter up and carries the hunter to a random room.

## How to play

To begin the game, say "Alexa, launch the Yeti Hunt Game", then "Begin Game".

You can move the hunter in any of the four cardinal directions: north, south, east, or west. To move, say 'move north', or 'step east', or 'go west', or simply 'south'.

Once the hunter has figured out the direction of the yeti, the hunter should throw a spear. To throw the spear, say 'launch the spear north', or 'throw south', or 'attack east'.

## Understanding This Code

It is recommended that you study the [sample code provided by Amazon Echo Skill Team](https://github.com/amzn/alexa-skills-kit-js). There are several sample applications to help you get started.

To prepare this project for uploading, move into the `src` folder.

    cd src

Then zip the project.

    zip -r yeti.zip *

Then upload the zip file produced.

## Attributions

### Game itself.

This game is based on Hunt the Wumpus (MIT, 1972).

### Icon

- [Nature Walking Animal Strong](https://www.pexels.com/photo/nature-walking-animal-strong-4075/) (No attribution required)

### Audio Clips

- Hunter Bumps Into Wall: [hurt3](https://www.freesound.org/people/thecheeseman/sounds/44430/) (Attribution License.)
- Spear Throw: [Metal Lever 1](https://www.freesound.org/people/timgormly/sounds/151271/) (Creative Commons 0 License.)
- Spear Misses: [Water Drop Dark](https://www.freesound.org/people/Ev-Dawg/sounds/337525/) (Creative Commons 0 License.)
- Yeti Growl: [Toni-DeepGrowl2](https://www.freesound.org/people/enochrooted/sounds/49465/) (Attribution License.)
- Yeti Attack: [attack 2](https://www.freesound.org/people/sonidotv/sounds/238317/) (Attribution License.)
- Yeti Dies: [Slow Zombie Death](https://www.freesound.org/people/scorpion67890/sounds/169058/) (Creative Commons 0 License.)
- Bat Fluttering: [Breathe Hope Paper](https://www.freesound.org/people/smallsushi/sounds/2294/) (Sampling+ License.)
- Bat Screeching: [pterodactyl](https://www.freesound.org/people/dinodilopho/sounds/263530/) (Creative Commons 0 License.)
- Pit Draft: [Whistling Wind](https://www.freesound.org/people/Motion_S/sounds/218386/) (Creative Commons 0 License.)
- Hunter Falling in Pit: [Sad Cry 5](https://www.freesound.org/people/jorickhoofd/sounds/180310/) (Attribution License.)
- Victory Chime: [Action 03](https://www.freesound.org/people/rhodesmas/sounds/320883/) (Attribution License.)
