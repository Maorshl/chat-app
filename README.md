# Chat app

## What the app do? 
 
* The app allows to sign in using google authentication.

* In the home page you will see the rooms available for you, a sign out button and a create new room button.

* You can join a room by clicking on the button of the room you're interested
    the room can be either private or public.

* You can also create a new room by clicking on the new room button at any time.

* When entered a chat room you can start typing and sending the messages, HAVE FUN!


## How the app works? 

 - The app is serverless using firebase services, and react for front end.

 - The rooms created are stored on fireStore and the messages sent is also stored to fireStore.

 - When sending a message a it is sent to fireStore and using firebase useCollectionData the messages renders on every new message coming.

 - The app is hosted on firebase hosting and you can try for yourself: [Chat-app](https://chat-app-8fa84.web.app/)
