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
* Populate questions

* Answering questions - determine how to have an input when answering
* Revealing correct answer
* Counting points

* On gameplay screen, working towards some type of progress bar / visual indication to the user that theyve selected an answer and it will be submitted after a short period of time. for ex: user holds finger on answer (in a Pressable), onPressIn starts a "progress bar" that indicates time to submission. Countdown going on in the background as well. 

## UPDATED Game Play notes 1/11/20

* bring countdown in (sending in # of secs we want)
* need functions to handle what happens when you submit an answer. using the props on the Pressable element
  * onPressIn, onLongPress, delayLongPress
* score keeping can be handled on the server side (see TODO there) but we need to render scoreboard here

