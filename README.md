# RatMessenger

Well, I tried to make a Discord clone with chatGPT but it's missing a few neurons so I decided to do it all myself.
I wanted to leave a trace of what I'd done but I couldn't push the new code into a separate branch...
So I made a new repo after deleting the old one.<br /><br />

If you want to try the actual state of the development (not recommended), here's how :<br />

Create a [MongoDB](https://www.mongodb.com) account and setup your cluster.<br />
Install [nodejs](https://nodejs.org)<br />

`npm install` in both Client and Server folder.<br />
`npm install -g nodemon` to run the Server with the `npm run start` script (or just `node .`).<br />

I use vite for the Client so you can just use the package.json scripts (`npm run dev`).<br />

Create a .env file in the Server folder and follow the .env.example (the `JWT_TOKEN` is just a random string of your choice).<br />
`ATLAS_URI` for your MongoDB connection.<br />
<br />
Also in Client/src/Utils/Services.js, update the baseUrl with `http://localhost:5000/api` unless you have a configured domain.
