## TO DO List
***************************

 # BUG TRACKING
 - keep an eye for repetitive errors, add to bug list below
 - eventually add error catchers in server wherever we notice errors that will somehow just end the game and reset at the beginning

Josh:
- [ ] Add more sounds
  - [ ] Make a list of where there should be a sound where there isn't already
    - [ ] Something when you press go to join a game or start a game
    - [ ] Something when the game starts
    - [ ] Ticking sound
    - [ ] Chat alert 
  - [ ] Add the sounds
- [x] When the opponent leaves after a rematch is denied, the message says Rematch is no longer enabled, but it was already disabled as soon as the rematch request was denied
- [x] If the game creator leaves the game after creating it, the game does not disappear from the Join Game list
  - [x] Style
  - [x] Rebase
  - [x] Clean up client code
  - [x] Clean up server code

New issues
- [ ] If your opponent leaves when you are on the chat screen, you don't get the alert
- [ ] The "Your opponent declined your rematch.." message was going off the modal on my phone
- [ ] Cache category list on server and on phone
- [ ] Cache the rest of the trivia questions? Maybe continually add questions to the server
    - I think that in production, the server would be making multiple requests at a time, causing server errors. There needs to be 5 seconds between each api request
      - Pro: we could figure out which questions are valid ahead of time
      - Con: We would have to deal with tokens ourselves
- [ ] Test chat extensively

Tia: 
- [x] Add how many questions the game has to the join game menu
- [x] Look into front end deployment (notes below)
- [x] clean up package.json unused dependencies
- [ ] Testing
- [ ] Change rematch to an alert?? Styling is weird
- [ ] Reorganize score on GameEnd to be more like name/score during GamePlay

## Deploying
### Front End
- [x] Need to update the `process.env.EXPO_PUBLIC_API_URL`
- Create Android build to get AAB file (https://docs.expo.dev/deploy/build-project/#production-builds-using-eas) 
- Create Google Play developer account ($25)
  - "Create App" in the new account
  - "Set up your app" - there are about 12 steps here
    - [ ] Create Privacy Policy (host it via github, we'll need a link to it as one of the steps)
    - "App access" means are any pages behind a login (doesn't apply to us since we don't ask for password)
    - "Set up store listing" is where we can put name and short/full description. Upload icon, feature image, screenshots of app, etc.
  - Upload app
    - [ ] Create AAB file (should be done via native build step above)
    - Release notes don't show up anywhere
- Google will review it (3-7 business days) and then you'll see app on play store

- Will we need to update the port number for the socket connections? It should be easy to test once we have the backend set up

Resources:
- https://www.youtube.com/watch?v=zMhhmaukhC4
- https://www.instabug.com/blog/react-native-app-ios-android
- https://docs.expo.dev/build/setup/
- https://docs.expo.dev/submit/android/


For Future
- code improvements
  - destructure props


## Possible bugs

## Code / Fit & finish
- Increase waiting room screen time (I had reduced at some point to speed up testing. can revisit all countdown timer # seconds)

## Styling/Content

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

    - Back to lobby
      - shows Alert, removes chat and rematch buttons ()


Co-authored-by: Tia Low <lowtia@gmail.com>
Co-authored-by: Josh Williams <joshuasrwilliams@gmail.com>
