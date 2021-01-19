## TO DO List

* Update the urls for your own ip address
  * StartGame Screen
  * Home screen
  * gameInfo Reducer

***************************

* clean up inline styling in StartGame (and prob others) file, move out to main style file

* Look into React memory leak issue

* deal with punctuation issues in question/answers from API (we saw one that should have been an apostrophe but it came back as literally &#039;)


### Game Play Screen
* Get questions into server for single player game

* On gameplay screen, working towards some type of progress bar / visual indication to the user that theyve selected an answer and it will be submitted after a short period of time. for ex: user holds finger on answer (in a Pressable), onPressIn starts a "progress bar" that indicates time to submission. Countdown going on in the background as well. 

## UPDATED Game Play notes 1/13/20
* Make sure countdown timer is re-rendering at 10 (or set amount) after each questions. 
* Still need to decide on making a selection using the following;
  * onPressIn, onLongPress, delayLongPress
* Keeping track of score on server side but we need to render scoreboard here
* User only able to answer each question once.  Currently they have the ability to answer multiple times. 
*  What to happen at the end of the game.  
*  Need to render the correct answer (on a seperate screen, or view) in between each of the questions to let the user know whether or not the answer is correct. 

