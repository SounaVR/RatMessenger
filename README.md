# RatMessenger

Well, I tried to make a Discord clone with chatGPT but it's missing a few neurons so I decided to do it all myself.
I wanted to leave a trace of what I'd done but I couldn't push the new code into a separate branch...
So I made a new repo after deleting the old one.<br /><br />

If you want to try the actual state of the development (not recommended), here's how :<br />

Create a [MongoDB](https://www.mongodb.com) account and setup your cluster.<br />
Install [nodejs](https://nodejs.org)<br />

`npm install` in both Client, Server and Socket folders.<br />
`npm install -g nodemon` to run the API and the Socket Server with the `npm run start` script.<br />

I use vite for the Client so you can just use the package.json scripts (`npm run dev`).<br />

Create a .env file in the Server folder and follow the .env.example (the `JWT_TOKEN` is just a random string of your choice).<br />
`ATLAS_URI` for your MongoDB connection.<br />
^ Same for Socket, create a .env at the root and add `ATLAS_URI`<br />
You can also populate a .env at the root of the project and use the same for the API, the Socket server and the Client if needed
<br />