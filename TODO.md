## TO DO List

* time is very high for testing gameplay screens

* Update the urls for your own ip address
  * StartGame Screen
  * Home screen
  * gameInfo Reducer

***************************

* Look into React memory leak issue

### Game Play Screen
* Get questions into server for single player game

* On gameplay screen, working towards some type of progress bar / visual indication to the user that theyve selected an answer and it will be submitted after a short period of time. for ex: user holds finger on answer (in a Pressable), onPressIn starts a "progress bar" that indicates time to submission. Countdown going on in the background as well.



## UPDATED Game Play notes 1/21/20
- submitting an answer disables the other Pressables
- onLongPress now starts the Animation, handleSubmitAnswer is chained to the end of the animation
- once both users submit, we'll show selected answer and correct answer before moving to next question

- Let user know that other user hasn't submitted yet



* Issue with being able to press and onLongPress same answer multiple times, affecting the ready property in server

* IF time runs out, selected answer is submitted automatically

* Chat functionality at end
* Option for rematch or lobby at end 
*  Need to render the correct answer (on a seperate screen, or view) in between each of the questions to let the user know whether or not the answer is correct. 


Co-authored-by: Tia Low <lowtia@gmail.com>
Co-authored-by: Josh Williams <joshuasrwilliams@gmail.com>
Co-authored-by: Chris Hamersly <christopherhamersly@gmail.com>