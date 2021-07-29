## TO DO List

* Update the urls for your own ip address
  * NEW! 5/21 Only need to change in env.js
  * StartGame Screen
  * Home screen
  * gameInfo Reducer
  * WaitingRoom Screen

***************************
# 7/20/21

** REVISIT and DISCUSS MVP **
- put things into MVP and Stretch Goals categories

** PLAN OUT HOW TO APPROACH CHAT **

Josh:
- X Not a great way to see which player is which on final screen - in the code
  - Keep track of socket from start in redux, and use that to identify user at end by attaching to score object coming from server, or possibly at other places
- X Fix rematch for single player or remove
- Ticking sound


Tia:
- Push notification
- Research deployment 

PUSH NOTIFICATIONS
- add the following to app.json to customize notifications
    // "plugins": [
    //   [
    //     "expo-notifications",
    //     {
    //       "icon": "./local/path/to/myNotificationIcon.png",
    //       "color": "#ffffff",
    //       "sounds": ["./local/path/to/mySound.wav", "./local/path/to/myOtherSound.wav"],
    //       "mode": "production"
    //     }
    //   ]
    // ],

## Code
- When one person leaves, let other user know that they have left
- if you dont answer a question, when the correct answer moment occurs it looks like you answered correctly (because no other option is selected)
  - improve selected/submitted feedback (raining down smileys/sads)
- clean up package.json unused dependencies

## New Features
* Chat functionality at end
* Emoji decorations 

## Styling/Content
- Responsive font size for answer pressables and question on GameScreen
- Content for all pages, such as how to play instructions 
- Logo/img/etc

## Improvement ideas
* Single player fake opponent scoring (right now they get it right 50% of time, random # for points)
- Change one player game title to 'practice round'?
- use local storage to remember mute status, name, maybe high score? 

## Manuel Testing
- Single Player Works
- Multi Player
- Each one First
- Each One Second
- Works with both Game Maker and Game Joiner 

## Possible bugs
- Single player does not work unless it is the first game, maybe same with multiplayer









Co-authored-by: Tia Low <lowtia@gmail.com>
Co-authored-by: Chris Hamersly <christopherhamersly@gmail.com>
Co-authored-by: Josh Williams <joshuasrwilliams@gmail.com>
