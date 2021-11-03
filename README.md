# Brain Bugs - React Native Multiplayer Trivia Game

## The Team
   
Josh Williams - [GitHub](https://github.com/jswill88) || [LinkedIn](https://www.linkedin.com/in/joshua-s-williams/)      
Daisy Johnson - [GitHub](https://github.com/daisyjanejohnson) || [LinkedIn](https://www.linkedin.com/in/daisyjane-johnson/)      
Chris Hamersly - [GitHub](https://github.com/christopherhamersly) || [LinkedIn](https://www.linkedin.com/in/christopher-hamersly/)             
Tia Low - [Github](https://github.com/TiaLow) || [LinkedIn](https://www.linkedin.com/in/tia-low/)

## The App

(short description here)

### Features

## Push Notification explanation (should we start Readme or something with descriptions of features?)
- now we're emitting an event on StartGame to validate the pushToken on the server
  - if bad, Alert
  - if good, Alert
  - need to make it so that 'Go' doesnt show until youve interacted with the alert also
- appState is being recorded via new component AppStateTracker in WaitingRoom, will send event to server everytime it changes (active, background, etc) 
- Still have WaitingRoom2, has a bit different language about waiting for opponent to rejoin (vs waiting for one more player)
- when the gameMaker's game is joined, we check their appState in server and either start gameplay if theyre active OR do push notification if theyre anything but active
- we also have check for gameMaker being inactive and with bad token. in that case it emits new event and will generate an alert on both sides, with the ability to return to the lobby 
- 
- 

## Install

## Usage

## Contributing

## UML / Event Flow

## Wireframe
![wireframe image](assets/wireframe.png)

## Libraries

## Resources

## License
