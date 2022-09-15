## TO DO List
***************************

 # BUG TRACKING
 - keep an eye for repetitive errors, add to bug list below
 - eventually add error catchers in server wherever we notice errors that will somehow just end the game and reset at the beginning


Josh:  
- [ ] LAYOUT: Chat
  - [ ] Scroll while keyboard is active
  - [ ] Move the bottom of the convo up when activated
- [ ] Make sure you can see input on home when typing

- [ ] Feedback to user on category selection (loading circle until categories load in?)
  - [ ] React Native Dropdown Picker https://hossein-zare.github.io/react-native-dropdown-picker-website/docs/advanced/loading
- [ ] How To Play Modal

Tia: 
- [x] Use font scaling library
  - build for standard device, will scale on others
    - [ ] join existing game
    - [ ] join private game
    - [ ] everything after lobby screen (except game screen)
- [x] Checking for # of characters based on above, eliminate questions and answers based on that
  - TEST: how do the changes in gameInfoReducer affect maxing out a category?
  - TEST: Can we test categoryExpired state in fetchAndFormatQuestionObjects?
- [x] Fix right side answer alignment
- [x] Fix right side submit btn alignment
- [ ] BUG: not sure rematch works anymore?
- [ ] TEST: chat
- [x] Limit username input char #
- [x] Disable all buttons between questions
- [x] If you click an answer and submit after the time has run out, it will lock in that answer index for the next question (disable answer pressables and hide submit button after its been used)


 Ideas
- [ ] Breakpoints for different device sizes, and rejecting questions based on nmber of characters in answers
- [ ] Expanding the question when you click 
- [ ] Looking into how responsive font sizing on different devices

- [ ] need to revisit push notifications, read through code and figure out where the leaks are. how to handle no response to push notification, what does that look like for gameMaker who is waiting? revisit push notification permissions.
 

## Possible bugs
- Keyboard doesn't close when you press outside of it - https://reactnativecode.com/react-native-hide-dismiss-keyboard/
- App seems to load in portrait before switching to landscape, looks glitchy
 - Maybe this is caused by expo go
 - If a pivate game is cancelled after other player has already entered code but not pressed go, it appears that the game is still there
 - Show Go not working on start modal on lobby screen on iphone for two player games



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
 - Trophy Icon animation
 
- Content for all pages, such as how to play instructions, content for alerts
- Responsive font size for answer pressables and question on GameScreen
 - Longer questions are cut off on iPhone
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
- Look into how to have android keyboard within app, if possible
  ** not sure if i can make the keyboard smaller. but it seems what happens is the TextInput itself gets much taller, taking up the rest of the screen. If the TextInout stayed its normal size, it would show the rest of the stuff too. textinput stays the same size when youre in portrait mode.
  ** lets revisit this when we sort out layout and styling? might uncover some issues or insight in that process
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

Add to `.eslintrc.json`:
```
{
  "env": {
    "browser": true,
    "node": true,
    "commonjs": true,
    "jest": true,
    "es6": true
  },
  "globals": {
    "fail": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  "parser": "babel-eslint",
  "parserOptions": {
    "sourceType": "module",
    "ecmaVersion": 2018,
    "ecmaFeatures": {
      "jsx": true,
      "modules": true
    }
  },
  // "ecmaFeatures": {
  //   "jsx": true
  // },
  "rules": {
    "no-console": "off",
    "indent": [
      "error",
      2
    ],
    "quotes": [
      "error",
      "single",
      {
        "allowTemplateLiterals": true
      }
    ],
    "no-unused-vars": [
      1,
      {
        "vars": "local",
        "args": "none"
      }
    ],
    // "no-undef": "error",
    "react/prop-types": "off"
    // [
    //   "enabled",
    //    { "ignore":"ignore", "customValidators": "customValidator" }
    //  ]
  }
}
```
