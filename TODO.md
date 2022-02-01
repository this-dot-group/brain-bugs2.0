## TO DO List
***************************

** REVISIT and DISCUSS MVP **
- put things into MVP and Stretch Goals categories


Josh:  
- [x] Show how many questions are left in game
  - Make sure next question number doesn't show up until the next question shows up


- time period before rematch connects, one person goes to waiting room showing gamecode for a moment which is kind of weird user experience. person requests rematch, opponent says yes, requestors screen goes to waiting room (with the code showing) and the opponent screen stays on rematch with yes/no options showing

- Maybe - Issue with iPhone swiping to close the app horizontally
- Nan with # questions on game play screen
- replace faker (also look into bug with private game not working?)



Tia: 

- Look into how to have android keyboard within app, if possible
  ** not sure if i can make the keyboard smaller. but it seems what happens is the TextInput itself gets much taller, taking up the rest of the screen. If the TextInout stayed its normal size, it would show the rest of the stuff too. textinput stays the same size when youre in portrait mode.
  ** lets revisit this when we sort out layout and styling? might uncover some issues or insight in that process



BUG: whens someone says no to rematch, the requestor also sees the "your opponent has left room" alert (not just the "said no to rematch" alert)
  ** fixed, added a check with useRef to see if theyve already said no to the rematch 




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










Co-authored-by: Tia Low <lowtia@gmail.com>
Co-authored-by: Chris Hamersly <christopherhamersly@gmail.com>
Co-authored-by: Josh Williams <joshuasrwilliams@gmail.com>

## New Items


