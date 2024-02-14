## TO DO List
***************************

 # BUG TRACKING
 - keep an eye for repetitive errors, add to bug list below
 - eventually add error catchers in server wherever we notice errors that will somehow just end the game and reset at the beginning

Josh:
- [ ] Add more sounds
- [ ] Test dif user scenarios (private game etc)
- [x] Look into how we customize icon for app store

New:
Q: is the linting not doing enough work?
- [ ] On Lobby Screen, when you open a modal, the background goes up with the modal, and I think it would look smoother to fade in
- [ ] On Create a Game Modal on Lobby Screen, there needs to be more padding bottom
- [ ] When opponent denies game request, the text gets cut off of the screen
- [ ] Show chat button is on right of game end screen, and after a game request is denied, it moves to the left of the screen
- [ ] When the opponent leaves after a rematch is denied, the message says Rematch is no longer enabled, but it was already disabled as soon as the rematch request was denied
- [ ] If the game creator leaves the game after creating it, the game does not disappear from the list
 - [ ] If the creator comes back, and the other person is still on that screen and tries to join - it sends the creator back to the home screen ??

Tia: 
- [ ] Continue updating player name/score/check/x styling (see slide 8 in canva)
- [ ] Try deployed backend on phone
- [ ] Test dif user scenarios (private game etc)
- [ ] Update README
- [ ] Delete unused things like hourglass gif



For Future
- code improvements
  - destructure props


## Possible bugs

## Code / Fit & finish
- clean up package.json unused dependencies
- Increase waiting room screen time (I had reduced at some point to speed up testing. can revisit all countdown timer # seconds)
- Update ReadMe

## Styling/Content
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

## Deploying
### Front End
- Need to add an icon
- Need to update the `process.env.EXPO_PUBLIC_API_URL`
- Then we will just need to follow the instructions below 
- Google play looks easier and cheaper to deploy to, so we should start with that
- Will we need to update the port number for the socket connections? It should be easy to test once we have the backend set up

Resources:
- https://www.instabug.com/blog/react-native-app-ios-android
- https://docs.expo.dev/build/setup/
- https://docs.expo.dev/submit/android/

### Back End
- We can use Render to host our back end https://render.com
  - It has a free tier
- We should set this up first, and see if it is working with our undeployed project
- I don't think we will have to change any code in the server


Co-authored-by: Tia Low <lowtia@gmail.com>
Co-authored-by: Chris Hamersly <christopherhamersly@gmail.com>
Co-authored-by: Josh Williams <joshuasrwilliams@gmail.com>
