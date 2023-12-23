## TO DO List
***************************

 # BUG TRACKING
 - keep an eye for repetitive errors, add to bug list below
 - eventually add error catchers in server wherever we notice errors that will somehow just end the game and reset at the beginning

Josh:
- [ ] Add more sounds
- [ ] Deploy backend
- [ ] Answer buttons aren't wrapping to two lines anymore
- [ ] Change size of bug!

New:
Q: is the linting not doing enough work?

Tia: 
- [ ] get rid of spinner on HowToPlay/countdown screen and maybe add crawling bugs instead
- [ ] Refactor player name/score/check/x area (see slide 8 in canva)
- [ ] upgrade react native to 0.69.9


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

## Styling/Content
- Animation Ideas
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
- Any special way to handle a tie?

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
