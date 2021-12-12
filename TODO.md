## TO DO List
***************************
# OCT

** REVISIT and DISCUSS MVP **
- put things into MVP and Stretch Goals categories


Tia:
- DONE bug(?) re push notification and Go button when sim starts game
  - using Constants.isDevice 
- when player leaves during game play, alert works for opponent, but when the player that left rejoins the app theyre on same screen. cancelGame send something back from server to use? 

Josh:  
- Show how many questions are left in game
- Take off chat from final screen for one player
- time period before rematch connects, one person goes to waiting room showing gamecode for a moment which is kind of weird user experience. person requests rematch, opponent says yes, requestors screen goes to waiting room (with the code showing) and the opponent screen stays on rematch with yes/no options showing



Tia: 
- Finishing game leaver redirect
- Some modals (How to Play) are still portrait
- Maybe - Issue with iPhone swiping to close the app horizontally

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


## Code
- clean up package.json unused dependencies

## New Features
* Emoji decorations 

## Styling/Content
- Content for all pages, such as how to play instructions, content for alerts
- Responsive font size for answer pressables and question on GameScreen
- Logo/img/etc
- if you dont answer a question, when the correct answer moment occurs it looks like you answered correctly (because no other option is selected)
- improve selected/submitted feedback (raining down smileys/sads)
- More sounds (ticking sound)
- need to fix alert language in redirectGameJoinerToLobby   : )
- add the following to app.json to customize notifications
    "plugins": [
      [
        "expo-notifications",
        {
          "icon": "./local/path/to/myNotificationIcon.png",
          "color": "#ffffff",
          "sounds": ["./local/path/to/mySound.wav", "./local/path/to/myOtherSound.wav"],
          "mode": "production"
        }
      ]
    ],

## Improvement ideas
* Single player fake opponent scoring (right now they get it right 50% of time, random # for points)
- use local storage to remember mute status, name, maybe high score? 
  - Track high score by category and num questions
- Something to do in the WaitingRoom for gameMaker (jumping brain bug!)



## Manuel Testing
- Single Player Works
- Multi Player
- Each one First
- Each One Second
- Works with both Game Maker and Game Joiner 

## Possible bugs

- Look into how to have android keyboard within app, if possible
- Keyboard doesn't close when you press outside of it - https://reactnativecode.com/react-native-hide-dismiss-keyboard/
- App seems to load in portrait before switching to landscape, looks glitchy









Co-authored-by: Tia Low <lowtia@gmail.com>
Co-authored-by: Chris Hamersly <christopherhamersly@gmail.com>
Co-authored-by: Josh Williams <joshuasrwilliams@gmail.com>

## New Items


