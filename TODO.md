## TO DO List
***************************
# OCT

** REVISIT and DISCUSS MVP **
- put things into MVP and Stretch Goals categories

Josh:  
- Continue to work on Chat
- Handle error if run out of questions for a token
  - Give player option to continue in the same category but with old questions (get a new token), or to choose a new category

Tia:
- Continue to work on push notifications
- Change waiting room "Go Home" button to cancel game, and make sure the game is removed from available games, and redirect to lobby

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
- Responsive font size for answer pressables and question on GameScreen
- Content for all pages, such as how to play instructions, content for alerts
- Logo/img/etc
- if you dont answer a question, when the correct answer moment occurs it looks like you answered correctly (because no other option is selected)
- improve selected/submitted feedback (raining down smileys/sads)
- More sounds (ticking sound)

## Improvement ideas
* Single player fake opponent scoring (right now they get it right 50% of time, random # for points)
- use local storage to remember mute status, name, maybe high score? 
  - Track high score by category and num questions

## Manuel Testing
- Single Player Works
- Multi Player
- Each one First
- Each One Second
- Works with both Game Maker and Game Joiner 

## Possible bugs
- If one player chooses "back to lobby" on the end screen or leaves the app, the other person should not have the option to rematch
- When one person leaves mid-game, let other user know that they have left









Co-authored-by: Tia Low <lowtia@gmail.com>
Co-authored-by: Chris Hamersly <christopherhamersly@gmail.com>
Co-authored-by: Josh Williams <joshuasrwilliams@gmail.com>
