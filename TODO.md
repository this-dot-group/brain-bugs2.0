## TO DO List

* Update the urls for your own ip address
  * NEW! 5/21 Only need to change in env.js
  * StartGame Screen
  * Home screen
  * gameInfo Reducer
  * WaitingRoom Screen

***************************
# 6/6/21

Josh:
- Sound - fill out for more actions, look into changing moving sounds to root level so we can use sounds on screen changes
- Look into single player issue - is it also a multiplayer issue? What is causing it?
- X - Update scoring, so you get as many points as seconds left
- Don't allow submit unless an answer is selected
- Fix rematch for single player or remove

Tia:
- Push notification research
- Lady Bug Brain Bug
- Layout of Gameplay Screen

## Code
- When one person leaves, let other user know that they have left
- transition from question to question, "waiting for 1 player to answer..." lingers after other player has answered, and while the correct answer is showing
- if you dont answer a question, when the correct answer moment occurs it looks like you answered correctly (because no other option is selected)

## New Features
* Chat functionality at end
* Emoji decorations

## Styling/Content
- Content for all pages, such as how to play instructions 
- Could have a Submit button that is greyed out/disabled until the user chooses an answer
- React native ellipsis package has style props (see npm package site)
- Logo/img/etc

## Improvement ideas
* Single player fake opponent scoring
- Change one player game title to 'practice round'?
* Give higher score for a faster response

## Check in Future
- Single player does not work unless it is the first game, maybe same with multiplayer

## Manuel Testing
- Single Player Works
- Muliti Player
- Each one First
- Each One Second
- Works with both Game Maker and Game Joiner 








Co-authored-by: Tia Low <lowtia@gmail.com>
Co-authored-by: Chris Hamersly <christopherhamersly@gmail.com>
Co-authored-by: Josh Williams <joshuasrwilliams@gmail.com>
