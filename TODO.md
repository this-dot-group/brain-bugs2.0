## TO DO List

* time is very high for testing gameplay screens

* Update the urls for your own ip address
  * StartGame Screen
  * Home screen
  * gameInfo Reducer

***************************
# 3/10/21
# Josh
- Look into React memory leak issue, possibly related to following:
 - Oddities happening in second game
 - maybe has something to do with the way components are mounted and dismounted
 - Sometimes double correct answer on gameplay screen
  - every time there is a rematch, an extra correct answer is shown
- refactor index.js in server repo

# Chris
- look into/work on changing the question choose/submit process to still highlight when an asnwer is chosen, and then press submit button to submit (instead of using onLongPress)
  - could have a Submit button that is greyed out/disabled until the user chooses an answer
  - could keep same behavior re when the submitted answer turns yellow, it would just now depend on clicking Submit button instead of onLongPress

# Tia
- Green style indicator for correct answer isn't happening in second game
- Set up scaffolding for future styling theme
- Custom components?
- Rematch option at end of game 

### Game Play Screen
* Get questions into server for single player game


* How To Play modal? displaying before game starts and after countdown


## UPDATED Game Play notes 02/03/20
* Chat functionality at end
* Option for rematch 


## Style section (TODO)
* React native ellipsis package has style props (see npm package site)

Co-authored-by: Tia Low <lowtia@gmail.com>
Co-authored-by: Chris Hamersly <christopherhamersly@gmail.com>
Co-authored-by: Josh Williams <joshuasrwilliams@gmail.com>