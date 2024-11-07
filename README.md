# ALLaM-Hackathon-WebApplication

## Framework Used:
- ReactJS
- Express
- Tailwind (CSS)

## Frontend (/client):

### Pages (/src/pages):
- About (/About.js):
This is where the about details is found.
- Home (/Home.js):
Home is where all the magic happens. In this page you can find the chat bar where you can send messages to the Isnad model, also history of previous chats can be seen on the right side of the page.

 #### Files worth mentioning:
 - /App.js: This is the second landing page that ReactJS redirect to. In this file you can find the routes to the pages that the application works on.
 - /index.js: This is the first landing page that ReactJS redirect to. In this file most of the base line is defiend mostly it doesn't need any changing.

### Components (/src/components):
- ALLaM.js (Should be ignored - no longer called or used)
- ActiveChat.js:
Here where the active chat with the Isnad model is shown.
- ChatBar.js:
Here where the user can write prompts to the Isnad user. The code also defines some of the writing features that the user can take advantage of.
- ChatContext.js (Should be ignored - no longer called or used)
- ChatControls.js (Should be ignored - no longer called or used)
- Header.js:
This where the header with Isnad logo is defined and called by both Home and About page. Nothing else :)
- History.js:
This code preserves, previews, and organize old chats with the model.
- MainChat.js:
The most important component. Here the chat context and saving previous and current chat with the model is defined also it passes a lot of argument to both ActiveChat and Chatbar components. This is where also calls to the backend API is made.

## Backend (/server):

### Server.js:
This file deals with the IBM API and exports the results to the frontend.


## Proxy (/client/src/setupProxy.js):
An internal proxy that sends and receives data from the backend API.



## Deployment:
Deployment to Heroku is made possible by the two files in the root directory (package.json, procfile). 

- procfile:
This tells Heroku to run the below code to start the web application.
```
web: node server/server.js
```

- packaga.json:
Heroku by default runs npm start. Therefore, the same command in procfile is written. And after running it we will tell Heroku to run a postbuild command that would ensure frontend dependencies are installed and application is built. 
```json
"scripts": {
  "frontend": "cd client && npm start",
  "api": "cd server && nodemon server.js",
  "dev": "concurrently --kill-others-on-fail \"npm run api\" \"npm run frontend\"",
  "start": "node server/server.js",
  "heroku-postbuild": "cd client && npm install && npm run build"
}
```

