## TO DO List
***************************

Josh:
- [ ] Property storage exceeds 196607 properties error ?? No idea ?? Async Storage related?
 - [ ] https://github.com/facebook/hermes/issues/851
 - [ ] https://github.com/mananbordia/Minimal-Repro-Code-Hermes-useNativeDriver/tree/main
- [ ] Review deployment steps (our next mtg will most likely to be trying deployment)

Tia: 
- [ ] Check to try and repro: Invalid code flashed for private game (even when a valid code is entered, invalid message appears for an instant)
- [ ] Numeric input for private game (type = number? or other setting on component)
- [ ] Still seeing this? ERROR  [Error: expo.modules.av.AudioFocusNotAcquiredException: This experience is currently in the background, so audio focus could not be acquired.]
- [ ] Review deployment steps (our next mtg will most likely to be trying deployment)

  

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

### Chat Tests
  - If chat screen is open, and a rematch comes in, rematch alert shows 
  - Red badge should show up
    - If you haven't opened the chat yet
    - If a message comes after you close the chat
  - Red badge should not show up
    - If you close the modal after receiving a message
    - When the rematch alert closes the modal
  - Chat bubbles are on their correct side. (This depends on the socket id, so may not work after code refresh)
  - Input should clear on send - doesn't seem to work on sim

Co-authored-by: Tia Low <lowtia@gmail.com>
Co-authored-by: Josh Williams <joshuasrwilliams@gmail.com>
