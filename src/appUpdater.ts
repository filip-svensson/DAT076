import express, { Express, Request, Response } from "express";

const app : Express = express();
app.use(express.static("Client/public"));
app.listen(8080);

/*App that uses express to build all files in "Client/public" and starts a localhost on port 8080*/
/*Needs to be i folder src for tsconfig.json to find it*/
/*Purpose: Updates file everytime you edit files*/
/*How to use: Run "npm run dev" in terminal when located in project file*/