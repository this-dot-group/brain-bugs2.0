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
- [ ] Cache category list on server and on phone
- [ ] Look into issue of too many requests from server
- [ ] Come up with tests to run for chat

New issues 
- [ ] Cache the rest of the trivia questions? Maybe continually add questions to the server
    - I think that in production, the server would be making multiple requests at a time, causing server errors. There needs to be 5 seconds between each api request
      - Pro: we could figure out which questions are valid ahead of time
      - Con: We would have to deal with tokens ourselves
    - Ideas
     -  Move api to client?
     -  Make a db and add the questions?
     -  Fake the ip address
     -  Keep the questions in working memory

Tia: 
- [ ] Testing
- [x] Look into issue of too many requests from server (RangeError: Property storage exceeds 196607 properties, js engine: hermes)
  - TODO: look into this... not seeing this anymore??
  - this was introduced with RN upgrade to 72.1 ::face-palm:: 
  - hermes team is working on this but they don't have an expected patch date
  - sounds like its only an issue in development? interesting discussion: https://github.com/facebook/hermes/issues/851
  - i think it has to do with our animations and useNativeDriver (https://github.com/mananbordia/Minimal-Repro-Code-Hermes-useNativeDriver/tree/main)
- TODO: hear from josh about custom font issue?
- [x] screen orientation doesnt lock on android
  - looks like expo screen orientation doesnt work on eas build anyway
  - added a mod to app.json to affect the AndroidManifest when we do an android build, that should hopefully lock orientation in landscape. needs to be tested once we get to build stage!!
  - https://stackoverflow.com/questions/60400336/how-can-i-generate-an-androidmanifest-xml-from-an-existing-react-native-project
- [ ] looks like i don't have to press Go on android, it just starts?
  - the issue is on android the keyboard takes up the full screen, and the only way to get out of it is to press Go/(enter) which i think automatically triggers our Go btn
  - TODO: switch branches to see if it's the same behavior before this work
- TODO: defaultProps issue: https://github.com/recharts/recharts/issues/3615
- [x] first chat message goes over the X button
- [x] expo go no longer supports multiple SDK versions, they'll only support one. current expo go version supports SDK, so i had to update
  - had to upgrade node
  - had to upgrade SDK 49 -> 50 -> 51

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
