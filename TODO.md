## TO DO List
***************************
# AUG

** REVISIT and DISCUSS MVP **
- put things into MVP and Stretch Goals categories

** PLAN OUT HOW TO APPROACH CHAT **


Josh:
- Ticking sound
- bug squashes

Tia:

**9/28/21**

- now we're emitting an event on StartGame to validate the pushToken on the server
  - if bad, Alert
  - if good, Alert
  - need to make it so that 'Go' doesnt show until youve interacted with the alert also

- appState is being recorded via new component AppStateTracker in WaitingRoom, will send event to server everytime it changes (active, background, etc) 

- DO WE STILL NEED WAITINGROOM2 in JOINGAME?

- when the gameMaker's game is joined, we check their appState in server and either start gameplay if theyre active OR do push notification if theyre anything but active

- what happens on bad token? on start game, we go to get token but say its bad. should we record that also? (so that when we try to send notification we know not to if we already know its a bad one?)

- improvement to consider: when the user backgrounds their app, they see an alert that further reminds them that theyll see a push notification to get them back into their game
- what about those who have already permissioned notification service? their token will already be validated, but we can check for it again? (to kick off the alert on good/bad token)

  https://docs.expo.dev/versions/latest/react-native/appstate/

- Push notification cleaup:
  - doesnt work as intended if you dont click push notification while its active 
    - *** THIS SEEMS TO WORK FINE?
    - *** maybe it works while app is in foreground, and doesnt work while app is in background

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

- Research deployment 
  - DEPLOY to app store:
    - make sure the app is sick (https://docs.expo.dev/distribution/app-stores/)
    - from expo cli, make a specifically ios or android build of the app
    - publish from cli
    - the most time will prob be spent on step 1, making sure everything is in order
    - paid dev acct through google play
    - if we deploy with android, we need to add Firebase Cloud Messaging for push notification functionality

  - DEPLOY to server:
    - heroku?

# NEW BUG - REMATCH: YES
- rematch doesnt work. person requests rematch, opponent says yes, requestors screen goes to waiting room (with the code showing) and the opponent screen stays on rematch with yes/no options showing



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
- Something to do in the WaitingRoom for gameMaker (jumping brain bug!)

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
