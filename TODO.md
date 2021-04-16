## TO DO List

* time is very high for testing gameplay screens

* Update the urls for your own ip address
  * StartGame Screen
  * Home screen
  * gameInfo Reducer
  * NEW!! 4/6 WaitingRoom Screen

***************************
# 3/21/21

# Josh
- X Single player
- Lil research re possible sound effects
New:  
- X Need to make sure that player leaves room after game if they are not playing again... otherwise their phone will 'watch' the other player's next game
- When one person leaves, let other user know that they have left
- change one player game title to 'practice round'?
- clean up code

# Chris
- look into/work on changing the question choose/submit process to still highlight when an answer is chosen, and then press submit button to submit (instead of using onLongPress)
  - could have a Submit button that is greyed out/disabled until the user chooses an answer
  - could keep same behavior re when the submitted answer turns yellow, it would just now depend on clicking Submit button instead of onLongPress

# Tia
- Carry styling (colors) through basic components
- React native ellipsis package has style props (see npm package site)
- Logo/img/etc
- Rematch option at end of game 


## General Notes
* Single player stuff
* How To Play screen should display before game starts and after countdown
  - settle on wording of this screen, also wording on lobby screen for 3 options
* New name (?), logo/icon, image for homescreen
* Sound effects? Arcade sounds?
* Chat functionality at end
* Emojis
* Alert to user who makes a public, 2P game and is waiting. There should be some sort of alert to let them know when someone joined their game
* Bugs
  - transition from question to question, "waiting for 1 player to answer..." lingers after other player has answered, and while the correct answer is showing
  - if you dont answer a question, when the correct answer moment occurs it looks like you answered correctly (because no other option is selected)







Co-authored-by: Tia Low <lowtia@gmail.com>
Co-authored-by: Chris Hamersly <christopherhamersly@gmail.com>
Co-authored-by: Josh Williams <joshuasrwilliams@gmail.com>