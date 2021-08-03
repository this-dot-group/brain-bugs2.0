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
  - Can refactor to do more cleanly, by getting id from socket at the start
- X Fix rematch for single player or remove
- X Tokens - each user gets a token at the beginning of their session. If there is a rematch, the token from the person who originally created the game will always be used. Afterward, each player will continue to use their own token
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
  - Track high score by category and num questions
- Cancel a game from the waiting room, in case you change your mind or nobody joins> you can go to home now, but not just back

## Manuel Testing
- Single Player Works
- Multi Player
- Each one First
- Each One Second
- Works with both Game Maker and Game Joiner 

## Possible bugs
- Single player does not work unless it is the first game, maybe same with multiplayer
- Shouldn't be able to start a game without selecting public or private, or there should be a default option. Maybe same issue with other dropdown items









Co-authored-by: Tia Low <lowtia@gmail.com>
Co-authored-by: Chris Hamersly <christopherhamersly@gmail.com>
Co-authored-by: Josh Williams <joshuasrwilliams@gmail.com>
