## TO DO List
***************************

** REVISIT and DISCUSS MVP **
- put things into MVP and Stretch Goals categories


Josh:  

- [x?] COULD NOT RECREATE - private game rematch, hangs on hourglass, hits catch in gameInfoReduce,line 88ish. possible issue with the id in the axios req?
 - Happens when Sim starts the private game, but phone starts the rematch.. or intermittently
- manual testing! run through game play scenarios
- [x] Maybe want to replace waiting image (hourglass) with a shared component for making changes. in the waiting room and game end
- [x] Look into countdown issues
  - Belive i fixed memory leak issues with counddown and user left game
- In server fixed issue with user leaving game and made it more precise.
- In server fixed one error that kept crashing the server

- Maybe - Issue with iPhone swiping to close the app horizontally

Manuel Testing Notes:

- When a game is started by sim, I wasn't able to see it on my phone sometimes
- Says "Phone vs Phone" on waiting room screen when Sim creates game, ie Game Joiner screen
- Timer should stop after both players have answered
- Should hourglass be removed after both players have answered?
- Increase waiting room screen time (I had reduced at some point to speed up testing)
- If countdown runs out, it doesn't start again


Tia: 

- MANUAL TESTING

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

  - Two Player (SIM v PHONE)
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

  - Two Player (PHONE vs IOS)
    - phone start game, iPhone joins
        - phone leaves during game (OK)
        - iPhone leaves during game (NO ALERT ON PHONE)
    - iPhone starts game, phone joins
        - iPhone leaves during game (ALERT SHOWS ON PHONE TWICE)
        - phone leaves during game (NO ALERT ON IPHONE)

    - Push Notifications
      - phone makes game, leaves while waiting, sim joins (OK)
      - iphone makes game, leaves while waiting, android joins (NO NOTIFICATION ON PHONE, DOES THIS WORK FOR JOSH?)

    - Back to lobby
      - shows Alert, removes chat and rematch buttons (OK)

  - check issue with same name on HowToPlay screen before game play
  - need to revisit push notifications, read through code and figure out where the leaks are. how to handle no response to push notification, what does that look like for gameMaker who is waiting? revisit push notification permissions.
  - test the following after pulling fresh (both fixed):
    - NO ALERT FOR GAMEMAKER WHEN GAMEJOINER LEAVES
    - WHEN GAMEMAKER LEAVES, GAMEJOINER SEES ALERT SEVERAL TIMES (when gameMaker is sim or iphone,    something to do with android?)







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
- Hide countdown after both players have answered


- Feedback patterns to user while waiting for opponent response
    - waiting room screen: loading spinner
    - gameplay: hourglass icon
    - game end, rematch request: "Rematch" changes to "Requesting..." 
    - if start game options are still loading: ____________

## Improvement ideas
* Single player fake opponent scoring (right now they get it right 50% of time, random # for points)
- use local storage to remember mute status, name, maybe high score? 
  - Track high score by category and num questions
- Something to do in the WaitingRoom for gameMaker (jumping brain bug!)
- Any special way to handle a tie?




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

 ## New 3/6
- Add error catcher in server wherever we notice errors that will somehow just end the game and reset at the beginning






Co-authored-by: Tia Low <lowtia@gmail.com>
Co-authored-by: Chris Hamersly <christopherhamersly@gmail.com>
Co-authored-by: Josh Williams <joshuasrwilliams@gmail.com>

## New Items


