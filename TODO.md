## TO DO List
***************************

 # BUG TRACKING
 - keep an eye for repetitive errors, add to bug list below
 - eventually add error catchers in server wherever we notice errors that will somehow just end the game and reset at the beginning

Josh:
- [ ] Add expanded touch range for pixel pressable
- [ ] Match styles of "Create a game" buttons and modals to rest of app
  - [ ] Titles on these buttons should be centered
  - [ ] Should we just match the styles of the other modal on these modals?
- [ ] Bug crawling animation
- [ ] bug: rematch request inside chat doesn't go away once it's interacted with
- [ ] Add expanded touch range for pixel pressable
- [ ] Match styles of "Create a game" buttons and modals to rest of app
  - [ ] Update color of underline
  - [ ] Close button could match
- [ ] Update SDK
- [ ] Consolidate images and assets folders

Tia: 
- [ ] Custom alert (styling?)
- [ ] Center main content
- [ ] Streamline disabled overlay (in Menu too)
- [ ] Bug crawling animation
- [ ] Modals in Start game are off on Android (have screenshots on phone)
- [ ] Buttons in Start game are too squished when all 4 are showing (at least on medium size phone, test other sizes)
- [ ] Error - undefined is not an object (evaluating 'soundsReducer[soundName].replayAsync')  
- [ ] Do we want all that stuff on How to Play screen if we only have a couple seconds on clock? Not sure we need Quit btn and settings drawer. If we remove Quit btn than we can remove CustomAlert. Or we could keep CustomAlert, and wire up the app state listener to show the same alert if one player backgrounds the app.
- [ ] in JoinGame should we cancel the game if it can't be joined? (test this- try to trigger situation where game can't be joined and see if it does cancel)
Small screen issues:
  - [ ] Pressable options in Create a Game modal are too big on small screen
  - [ ] Cancel game btns in CustomAlert too big on small screen




For Future
- code improvements
  - destructure props
  - make some shared components/variables
    - answer buttons
  - Delete unused things
   - hourglass gif
   - Emoji.js
  - Clean Up GameScreen code
 

## Possible bugs

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
- Any special way to handle a tie?
- Weird apple shapes over the screen

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
