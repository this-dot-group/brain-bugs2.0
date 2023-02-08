## TO DO List
***************************

 # BUG TRACKING
 - keep an eye for repetitive errors, add to bug list below
 - eventually add error catchers in server wherever we notice errors that will somehow just end the game and reset at the beginning

Josh:  
- [ ] Manual testing for bugs, possible issues with component mounting
- [ ] Revisit Colors
 - [ ] replace 'black' and 'white' color strings with variables - not really using eigher enough to make an impact
- [ ] Animations
 - [ ] Animation on screen transition
 - [x] Mute Button
 - [x] replace all buttons with animated PixelPressable button 
  - [x] Chat
  - [x] GameScreen
  - [x] HomeScreen
  - [x] HowToPlay
  - [x] JoinGame
  - [x] PrivateGame
  - [x] StartGame - Don't think I can do dropdowns, animation relies on pressable attributes
  - [x] LobbyScreen
  - [x] WaitingRoom
  - [x] WaitingRoom2 
- [ ] Keyboard hiding input on home screen
- [x] 'How to Play' Modal on Countdown screen is missing styles
Local Storage
- [ ] Think about keeping track of player stats
- [ ] Remember Mute State


New:
- [ ] 'Back To Lobby' Button on end screen doesn't fit in button
- [ ] 'Submit' button animation - something that smoothly makes it clear that the answer was submitted
- [ ] Does not always stay in landscape for me, especially at beginning


For Future
- code improvements
  - destructure props
  - make some shared components/variables
    - answer buttons
    - [x] mute button
  - Delete unused things
   - hourglass gif
   - Emoji.js
  - Clean Up GameScreen code


Tia: 
- [ ] test out sound on sim vs phone (broken on sim?)
- [ ] look into chat new message red alert not showing up on android
- [ ] make push notifications work reliably
- look into this when revisiting push notifications - do we need 'no more questions' scenario on waiting room 2 also? this is the situation where we are notifying user via push notification, waiting for them 
- [ ] Bug with user going back to home screen when clicking on push notification - maybe has something to do with changes for app state tracker on waiting room screen recently made


 Ideas
- [ ] need to revisit push notifications, read through code and figure out where the leaks are. how to handle no response to push notification, what does that look like for gameMaker who is waiting? revisit push notification permissions.
- [ ] Add how many questions were answered correctly for each player on end screen
- [ ] Add user stats button (high score, game record, number games player, etc)
 

## Possible bugs
- Keyboard doesn't close when you press outside of it - https://reactnativecode.com/react-native-hide-dismiss-keyboard/
- App seems to load in portrait before switching to landscape, looks glitchy
 - Maybe this is caused by expo go
 - If a private game is cancelled after other player has already entered code but not pressed go, it appears that the game is still there


## Code / Fit & finish
- clean up package.json unused dependencies
- Increase waiting room screen time (I had reduced at some point to speed up testing. can revisit all countdown timer # seconds)


## New Features
* Emoji decorations 

## Styling/Content
- Animation Ideas
 - Bug crawling in background - homescreen, endscreen
 - Feedback copying private game code
 - Bounce or something on pixel button
 
 
- Content for all pages, such as how to play instructions, content for alerts
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
- Feedback patterns to user while waiting for opponent response
    - waiting room screen: loading spinner
    - gameplay: Waiting for other user... text
    - game end, rematch request: "Rematch" changes to "Requesting..." 
    - if start game options are still loading: ____________
- Dropdown buttons should be taller or wider for longer category titles
- Trophy is not a consistent size
- Issue with Sounds - I think when it starts on mute
- style consistency
  - for ex- all headings in caps?

## Improvement ideas
* Single player fake opponent scoring (right now they get it right 50% of time, random # for points)
- use local storage to remember mute status, name, maybe high score? 
  - Track high score by category and num questions
- Something to do in the WaitingRoom for gameMaker (jumping brain bug!)
- Any special way to handle a tie?
- If rematch is requested, hide chat screen, or show rematch request in chat (cant see the request since its behind the chat screen)
- Cancel Game from waiting room should have an "are you sure" modal
 


## Manuel Testing
- Single Player Works
- Multi Player
- Each one First
- Each One Second
- Works with both Game Maker and Game Joiner 

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
        - phone leaves during game ()

    - Push Notifications
      - phone makes game, leaves while waiting, sim joins ()
      - iphone makes game, leaves while waiting, android joins ()

    - Back to lobby
      - shows Alert, removes chat and rematch buttons ()



Co-authored-by: Tia Low <lowtia@gmail.com>
Co-authored-by: Chris Hamersly <christopherhamersly@gmail.com>
Co-authored-by: Josh Williams <joshuasrwilliams@gmail.com>
