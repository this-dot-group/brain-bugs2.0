## TO DO List
***************************

 # BUG TRACKING
 - keep an eye for repetitive errors, add to bug list below
 - eventually add error catchers in server wherever we notice errors that will somehow just end the game and reset at the beginning

Josh:
- [ ] Chat alert sound
- [ ] Come up with tests to run for chat
 - [ ] Send 
- [x] "Join Existing Game" should be "Join Public Game" or something like that
- [x] Cursor is not vertically centered in chat compose text box (at least on iPhone)
- [ ] If one of the players leaves end game, the other play can still access chat and still type out and try to send a message. but the message doesn't actually send. Should the text box input be disabled? Something to indicate you can no longer send a chat / opponent will not receive it
  - [ ] Tried to reproduce - alert comes up when opponent closes or goes to lobby and chat button dissappears
    - [ ] With chat open
    - [ ] With text in chat
    - [ ] If app crashes on one end - this happens
- [x] Need to update seconds on game play questions
- [x] We should take the "Quit" button off the countdown screen that you see right before going to a game. Doesn't work and it's too little time to really read it and interact.
- [x] Stats screen need a spacer of some sort between title and stat (colon, dash, etc

- [ ] Chat modal not covering whole back
- [ ] Numeric input for private game
- [ ] Invalid code flashed for private game
- [ ] Property storage exceeds 196607 properties error


Tia: 
- [ ] No sounds when the app starts (like during create a game), UNTIL you interact with the settings drawer...?
- [ ] Join private game - when you type the game code in and get to 5 digits, field is disabled and you can no longer edit. What if you typed wrong code?
   - [ ] Test with invalid code as well
- [ ] Go btn misaligned on create game screen (or maybe text not centered in btn)
- [ ] Go btn on Join Private game is misaligned
- [ ] error around the time i copied pivate game code -  ERROR  [Error: expo.modules.av.AudioFocusNotAcquiredException: This experience is currently in the background, so audio focus could not be acquired.]



  

## Deploying
### Front End
- Check that android screen orientation lock works via mod (info here: https://stackoverflow.com/questions/60400336/how-can-i-generate-an-androidmanifest-xml-from-an-existing-react-native-project)
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
