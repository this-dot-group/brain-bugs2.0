## TO DO List
***************************

** REVISIT and DISCUSS MVP **
- put things into MVP and Stretch Goals categories


Josh:  

- private game rematch, hangs on hourglass, hits catch in gameInfoReduce,line 88ish. possible issue with the id in the axios req?
- manual testing! run through game play scenarios
- [x] Maybe want to replace waiting image (hourglass) with a shared component for making changes. in the waiting room and game end
- Maybe - Issue with iPhone swiping to close the app horizontally



Tia: 

- rematch, leave room mid-game from phone, Alert shows on sim but doesnt go back to lobby?
- manual testing! run through game play scenarios
- Look into how to have android keyboard within app, if possible
  ** not sure if i can make the keyboard smaller. but it seems what happens is the TextInput itself gets much taller, taking up the rest of the screen. If the TextInout stayed its normal size, it would show the rest of the stuff too. textinput stays the same size when youre in portrait mode.
  ** lets revisit this when we sort out layout and styling? might uncover some issues or insight in that process


## BUGS





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
- Keyboard doesn't close when you press outside of it - https://reactnativecode.com/react-native-hide-dismiss-keyboard/
- App seems to load in portrait before switching to landscape, looks glitchy


## New 1/23
 - Longer questions are cut off on iPhone







Co-authored-by: Tia Low <lowtia@gmail.com>
Co-authored-by: Chris Hamersly <christopherhamersly@gmail.com>
Co-authored-by: Josh Williams <joshuasrwilliams@gmail.com>

## New Items


