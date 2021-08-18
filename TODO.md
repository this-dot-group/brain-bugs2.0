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
- clean up package.json unused dependencies

## New Features
* Chat functionality at end
* Emoji decorations 

## Styling/Content
- Responsive font size for answer pressables and question on GameScreen
- Content for all pages, such as how to play instructions 
- Logo/img/etc
- if you dont answer a question, when the correct answer moment occurs it looks like you answered correctly (because no other option is selected)
  - improve selected/submitted feedback (raining down smileys/sads)

## Improvement ideas
* Single player fake opponent scoring (right now they get it right 50% of time, random # for points)
- Change one player game title to 'practice round'?
- use local storage to remember mute status, name, maybe high score? 
  - Track high score by category and num questions
- Cancel a game from the waiting room, in case you change your mind or nobody joins you can go to home now, but not just back

## Manuel Testing
- Single Player Works
- Multi Player
- Each one First
- Each One Second
- Works with both Game Maker and Game Joiner 

## Possible bugs
- Shouldn't be able to start a game without selecting all the necessary dropdown items needed
- You can hit submit many times in a row, at least in single player, and it will resubmit answer for next question
- Handle error if run out of questions for a token
- If one player chooses "back to lobby" or leaves the app, the other person should not have the option to rematch
- When one person leaves mid-game, let other user know that they have left
- Need to relook at timer not going down while picking answers









Co-authored-by: Tia Low <lowtia@gmail.com>
Co-authored-by: Chris Hamersly <christopherhamersly@gmail.com>
Co-authored-by: Josh Williams <joshuasrwilliams@gmail.com>
