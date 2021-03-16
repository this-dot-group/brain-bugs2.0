## TO DO List

* time is very high for testing gameplay screens

* Update the urls for your own ip address
  * StartGame Screen
  * Home screen
  * gameInfo Reducer

***************************
# 3/10/21
# Josh
- X fix linter on my machine
- X every time there is a rematch, an extra correct answer is shown
- X Look into React memory leak issue, possibly related to following:
- NOTES:
  - The redirect socket was rendering in both modals ('private' and 'start'), so it was causing issues, and I added a check to make sure that it only redirected if the modal matched
  - Added a 'socket.off' in the return of every useEffect where there is a 'socket.on', and broke out the socket callbacks into functions

- refactor index.js in server repo


# Chris
- look into/work on changing the question choose/submit process to still highlight when an asnwer is chosen, and then press submit button to submit (instead of using onLongPress)
  - could have a Submit button that is greyed out/disabled until the user chooses an answer
  - could keep same behavior re when the submitted answer turns yellow, it would just now depend on clicking Submit button instead of onLongPress

# Tia
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