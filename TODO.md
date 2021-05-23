## TO DO List

* Update the urls for your own ip address
  * NEW! 5/21 Only need to change in env.js
  * StartGame Screen
  * Home screen
  * gameInfo Reducer
  * WaitingRoom Screen

***************************
# 5/16/21

Josh:
- X - BUG - Countdown does not continue while changing selections
- Lil research re possible sound effects
  - Sound working, but warning:  "Can't perform a React state update on an unmounted component."
  - Need to do `npm i` to get expo audio package installed
- NEW - Single player does not work unless it is the first game, maybe same with multiplayer

Tia:
- Let rematch requester know if the other person says no
- Alert to user who makes a public, 2P game and is waiting. There should be some sort of alert to let them know when someone joined their game
- Take a look at how to play screen in Canva

## Code
- When one person leaves, let other user know that they have left
- transition from question to question, "waiting for 1 player to answer..." lingers after other player has answered, and while the correct answer is showing
- if you dont answer a question, when the correct answer moment occurs it looks like you answered correctly (because no other option is selected)

## New Features
* Chat functionality at end
* Emojis


## Styling/Content
- Content for all pages, such as how to play instructions 
- Could have a Submit button that is greyed out/disabled until the user chooses an answer
- React native ellipsis package has style props (see npm package site)
- Logo/img/etc

## Improvement ideas
* Single player fake opponent scoring
- Change one player game title to 'practice round'?
* Give higher score for a faster response
  








Co-authored-by: Tia Low <lowtia@gmail.com>
Co-authored-by: Chris Hamersly <christopherhamersly@gmail.com>
Co-authored-by: Josh Williams <joshuasrwilliams@gmail.com>
