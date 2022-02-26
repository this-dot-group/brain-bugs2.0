## TO DO List
***************************

** REVISIT and DISCUSS MVP **
- put things into MVP and Stretch Goals categories


Josh:  

- private game rematch, hangs on hourglass, hits catch in gameInfoReduce,line 88ish. possible issue with the id in the axios req?
- manual testing! run through game play scenarios
- Maybe want to replace waiting image (hourglass) with a shared component for making changes. in the waiting room and game end
- Maybe - Issue with iPhone swiping to close the app horizontally



Tia: 

- MANUAL TESTING

  - Single Player
    - no rematch on single player. intentional, right?

  - Two Player, private code
    - phone makes code, sim joins (OK)
        - phone asks for rematch, sim says yes (OK)
        - phone asks for rematch, sim says no (OK)
        - sim asks for rematch, phone says yes (OK)
        - sim asks for rematch, phone says no (OK)
    - sim makes code, phone joins (OK)
        - sim asks for rematch, phone says yes (OK)
        - sim asks for rematch, phone says no (OK)
        - phone asks for rematch, sim says yes (OK)
        - phone asks for rematch, sim says no (OK)

  - Two Player
    - phone start game, sim joins (OK)
        - phone asks for rematch, sim says yes (OK)
        - phone asks for rematch, sim says no (OK)
        - phone leaves during game (OK)
        - sim leaves during game (NO ALERT ON PHONE)
    - sim starts game, phone joins
        - sim asks for rematch, phone says yes (OK)
        - sim asks for rematch, phone says no (OK)
        - sim leaves during game (ALERT SHOWS ON PHONE, HAVE TO CLICK SEVERAL TIMES)
        - phone leaves during game (NO ALERT ON SIM)

    - Push Notifications
      - phone makes game, leaves while waiting, sim joins (OK)
      - (cant test opposite since push notification dont work on sim)

    - Back to lobby
      - shows Alert, removes chat and rematch buttons (OK)


Observations:
- we need feedback for rematch requestor. they dont know whats happening while opponent is choosing yes or no. 
- should anything special happen in case of tie?
- RE ERROR about setting state in unmounted component: see log in Countdown. the component rerenders a ton of times, more than just the updates from countdown in HowToPlay and GamePlay (including both players, that should be around 26 times at max, num of seconds in each mount? 3+3+10+10). i think the reason we're seeing the error is because it trips up and can't keep up. (I added the log in Countdown and a "place" prop to it's use sites) 



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


