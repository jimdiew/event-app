The project is an event manager app. You can see first the upcoming events (5 days from today), the events divided by category and a form to create a new event.

## Technologies used

**Front end**

- Vite
- React
- Typescript

**Back end**

- Springboot
- Java

**Testing**

- Vitest

## How to run the app

1- Run Springboot project in
`./event-service`

2- Run React project
`npm run dev`

To work around the next CORS error
`Access to fetch at 'http://localhost:8081/categories' from origin 'http://localhost:5174' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.`
I used this chrome extension
https://chromewebstore.google.com/detail/moesif-origincors-changer/digfbfaphojjndkpccljibejjbppifbc

## How to run tests

`npm test`
