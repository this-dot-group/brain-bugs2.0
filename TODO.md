## TO DO List
***************************

 # BUG TRACKING
 - keep an eye for repetitive errors, add to bug list below
 - eventually add error catchers in server wherever we notice errors that will somehow just end the game and reset at the beginning

Josh:
- [ ] Add more sounds
  - [ ] List of Sounds Needed
    - [ ] Something when you press go to join a game or start a game
    - [ ] Something when the game starts
    - [ ] Ticking sound
    - [ ] Chat alert
  - [ ] Add the sounds
- [x] Cache category
  - [x] On server
  - [x] On phone
- [ ] Look into issue of too many requests from server
  - Caching plan
    - Make a db for the questions
      - Should it be mongo or sql? Would relational database be more efficient for getting by category?
      - Need to know how many questions of each category
        - Maybe for some categories beneath a certain amount, like any category with less than 100 verified questions, we don't display that category, and just use those category questions in general knowledge quizzes
    - Make a service that mines open trivia db for questions
      - Every few minutes we could ask for 50 more questions
      - We should move the filtering and modifying of questions here, before we add them to the db. Maybe even make it so we have to do less on the from end.
      - If the question is not already in the db, and it matches our pattern, we add it
        - I think we could still add the question even if it doesn't match the pattern, and maybe have a db field like `valid: false`
      - We can check the `total_num_of_verified_questions` at `/api_count_global.php`
      - If the amount is greater than the number of questions we have, we continue requesting for more
      - Otherwise, we will check every so often if there are new questions
    - On the server
      - When a new game is started, fetch questions from our db
        - Is there an easy way to get a random set of questions?
      - Use memory cache to keep track of each question a person has seen
        - We could create a token to use as the `key`
        - We could keep track of the category count, so we know how many are left in each category as well for each player
        - When a question is sent to a player, it gets added to the cache as a question they have seen, and we can set the cache to refresh after a certain amount of time
        - the request would be something like
          - find questions where
            - question does not equal any in the cache for the token of the requester
            - question is valid
            - Limit to the num needed
- [ ] Come up with tests to run for chat



New issues 
- [ ] Cache the rest of the trivia questions? Maybe continually add questions to the server
    - I think that in production, the server would be making multiple requests at a time, causing server errors. There needs to be 5 seconds between each api request
      - Pro: we could figure out which questions are valid ahead of time
      - Con: We would have to deal with tokens ourselves
    - Ideas
     -  Move api to client?
     -  Make a db and add the questions?
     -  Fake the ip address
     -  Keep the questions in working memory

Tia: 
- [ ] Testing
- [ ] Change rematch to an alert?? Styling is weird
- [ ] Reorganize score on GameEnd to be more like name/score during GamePlay
- [ ] If your opponent leaves when you are on the chat screen, you don't get the alert
- [ ] The "Your opponent declined your rematch.." message was going off the modal on my phone
- [ ] Look into issue of too many requests from server

## Deploying
### Front End
- [x] Need to update the `process.env.EXPO_PUBLIC_API_URL`
- Create Android build to get AAB file (https://docs.expo.dev/deploy/build-project/#production-builds-using-eas) 
- Create Google Play developer account ($25)
  - "Create App" in the new account
  - "Set up your app" - there are about 12 steps here
    - [ ] Create Privacy Policy (host it via github, we'll need a link to it as one of the steps)
    - "App access" means are any pages behind a login (doesn't apply to us since we don't ask for password)
    - "Set up store listing" is where we can put name and short/full description. Upload icon, feature image, screenshots of app, etc.
  - Upload app
    - [ ] Create AAB file (should be done via native build step above)
    - Release notes don't show up anywhere
- Google will review it (3-7 business days) and then you'll see app on play store

- Will we need to update the port number for the socket connections? It should be easy to test once we have the backend set up

Resources:
- https://www.youtube.com/watch?v=zMhhmaukhC4
- https://www.instabug.com/blog/react-native-app-ios-android
- https://docs.expo.dev/build/setup/
- https://docs.expo.dev/submit/android/


For Future
- code improvements
  - destructure props


## Possible bugs

## Code / Fit & finish
- Increase waiting room screen time (I had reduced at some point to speed up testing. can revisit all countdown timer # seconds)

## Styling/Content

## Improvement ideas
* Single player fake opponent scoring (right now they get it right 50% of time, random # for points)
- Any special way to handle a tie?

## Manuel Testing
- Single Player Works
- Multi Player
- Each one First
- Each One Second
- Works with both Game Maker and Game Joiner 

  - Two Player, private code
    - phone makes code, sim joins (OK)
        - phone asks for rematch, sim says yes (OK)
        - phone asks for rematch, sim says no (OK)
        - sim asks for rematch, phone says yes (OK)
        - sim asks for rematch, phone says no (OK)
    - sim makes code, phone joins (OK)
        - sim asks for rematch, phone says yes (OK)
        - sim asks for rematch, phone says no (OK)
        - phone asks for rematch, sim says yes (OK)
        - phone asks for rematch, sim says no (OK)

  - Two Player (SIM v PHONE)
    - phone start game, sim joins (OK)
        - phone asks for rematch, sim says yes (OK)
        - phone asks for rematch, sim says no (OK)
        - phone leaves during game (OK)
        - sim leaves during game (NO ALERT ON PHONE)
    - sim starts game, phone joins
        - sim asks for rematch, phone says yes (OK)
        - sim asks for rematch, phone says no (OK)
        - sim leaves during game (ALERT SHOWS ON PHONE, HAVE TO CLICK SEVERAL TIMES)
        - phone leaves during game (NO ALERT ON SIM)

  - Two Player (PHONE vs IOS)
    - phone start game, iPhone joins
        - phone leaves during game (OK)
        - iPhone leaves during game (NO ALERT ON PHONE)
    - iPhone starts game, phone joins
        - iPhone leaves during game (ALERT SHOWS ON PHONE TWICE)
        - phone leaves during game ()

    - Back to lobby
      - shows Alert, removes chat and rematch buttons ()


Co-authored-by: Tia Low <lowtia@gmail.com>
Co-authored-by: Josh Williams <joshuasrwilliams@gmail.com>
