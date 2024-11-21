## Deploying
### Front End
- Check that android screen orientation lock works via mod (info here: https://stackoverflow.com/questions/60400336/how-can-i-generate-an-androidmanifest-xml-from-an-existing-react-native-project)
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
