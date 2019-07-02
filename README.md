# BigStack
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://GitHub.com/Naereen/StrapDown.js/graphs/commit-activity) [![Ask Me Anything !](https://img.shields.io/badge/Ask%20me-anything-1abc9c.svg)](https://GitHub.com/Naereen/ama) [![made-for-VSCode](https://img.shields.io/badge/Made%20for-VSCode-1f425f.svg)](https://code.visualstudio.com/) [![GitHub issues](https://img.shields.io/github/issues/S-ayanide/BigStack.svg)](https://github.com/S-ayanide/BigStack/issues)
[![GitHub forks](https://img.shields.io/github/forks/S-ayanide/BigStack.svg?style=social)](https://github.com/S-ayanide/BigStack/network) [![GitHub stars](https://img.shields.io/github/stars/S-ayanide/BigStack.svg?style=social)](https://github.com/S-ayanide/BigStack/stargazers) [![Open Source Love svg1](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://github.com/ellerbrock/open-source-badges/) 
[![GitHub license](https://img.shields.io/github/license/S-ayanide/BigStack.svg?style=for-the-badge)](https://github.com/S-ayanide/BigStack/blob/master/LICENSE)

A Node JS Project which is a miniature model of Stack Overflow Backend where users can post questions, answers and also upvote the answers. The users have login feature and has to be authenticated to upvote an answer. User Data is fetched from Mongo DB.
### 👉 If you like this repo then please give it a ⭐️

## Description
A Node JS Project where the User gets option to Login, all the user details are stored in Mongo DB. This application has features to post questions in the forum where users can answer them or even upvote them. For the answer to get upvoted the user Object ID has to be fetched from Mongo DB, which also means that the user has to be logged in/authenticated. 

This project is completely deployable and can be used with any FrontEnd. It uses RESTful API and explicitly takes advantages of HTTP methodologies.

## Prerequisites
To run this project on your system you need to meet these criterias:
* Basic understanding of Node.js and JavaScript.
* A terminal app for MacOS and Linux or PowerShell for Windows.
* Node.js v8+ and a Node.js package manager installed locally.

To install Node.js and NPM, use any of the [official Node.js installers](https://nodejs.org/en/download/) provided for your operating system.

## Initialization
Create a project directory named `Bigstack` to hold your application, and make that your working directory.
Use the `npm init` command to create a `package.json` file for your application.

Inside `package.json` set the `'main'` to `"server.js"` as that is going to be our primary end point of the application.

Instead of using the `node` command to run the application, we'll use, a tool called **nodemon** that monitors our application and automatically restarts the server when source code changes. With `node`, we'd have to restart the server manually when changes are made.

Install **nodemon** as a dependency of your Node.js application:
```
npm install nodemon
```
To make nodemon recognize the entry point of our application we need to map it with our main javaScript file. To do that open `package.json` and add the following line, after main:
```
"scripts": {
    "start": "node server.js"
 }
```

## Dependencies Used
* [Express](https://expressjs.com/)
* [Body Parser](https://www.npmjs.com/package/body-parser)
* [Mongoose](https://mongoosejs.com/)
* [Passport](https://www.npmjs.com/package/passport)
* [Passport-JWT](https://www.npmjs.com/package/passport-jwt)
* [Bycrypt.js](https://www.npmjs.com/package/bcryptjs)
* [Validator](https://www.npmjs.com/package/validator)
* [JSON Web Tokens](https://www.npmjs.com/package/jsonwebtoken)

To install these dependencies simply type this in the terminal:
```
npm install express body-parser mongoose passport bcryptjs passport-jwt validator jsonwebtoken
```
`--save` is not required to be typed since after node v5+ release all the packages are automatically saved inside `package.json`

## server.js
This is the primary end point of the application. This javaScript file handles the *Strategies* as well as *routes*.

It creates a running connection with Mongo DB and displays a message in the terminal on which port the web server is currently running and also if Mongo DB is successfully connected or not.

It connects our application to the RESTful API through custom routes.

## Schemas
In this project we have three schemas namely Profile Schema, Question Schema and User Schema.(They can be modified according to the developer as per what details they want to take from the Users).

**Profile Schema** --
It takes neccessary informations like *username* and *launguges*, other information are optional. The user data is fetched from Mongo DB by their Object ID :
```
user: {
        type: Schema.Types.ObjectId,
        ref: "myPerson"
    }
```
Where `myPerson` is the Mongoose Model for the User Schema.

**Question Schema** --
In this Schema compulsory attributes are *textone*, *texttwo* and *answers.text*. Again the user data is fetched from Mongo DB to only allow the logged in users to answer questions and also to upvote.
```
user: {
        type: Schema.Types.ObjectId,
        ref: "myPerson"
    }
```
Where `myPerson` is the Mongoose Model for User Schema.

**User Schema** --
This Schema is used to register users for the first time. It has necessary attributes like *name*, *email*, *password* and *gender*
Based on the gender it switches the default avatar picture. It adds the user to the database and creates a Mongoose Model called `myPerson`

## NOTE:
This project is subject to change by the developer and is still in development

## Pull Request

Pull Requests are welcome. Please follow these rules for the ease of understanding:
* Make sure to check for available issues before raising one
* Give me a maximum of 24-48 hours to respond
* Have proper documentation on the parts you are changing/adding

#### Feel free to contribute

## Developed & Maintained by
[Sayan Mondal](https://github.com/S-ayanide) 
[📷 Insta](https://www.instagram.com/s_ayanide/)
[🐤 Twitter](https://www.instagram.com/s_ayanide/) [![Twitter](https://img.shields.io/twitter/url/https/github.com/S-ayanide/BigStack.svg?style=social)](https://twitter.com/intent/tweet?text=Wow:&url=https%3A%2F%2Fgithub.com%2FS-ayanide%2FBigStack)

## License 
[![GitHub license](https://img.shields.io/github/license/S-ayanide/BigStack.svg?style=for-the-badge)](https://github.com/S-ayanide/BigStack/blob/master/LICENSE)
```Copyright 2019 Sayan Mondal

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```

## Getting Started
For help getting started with Node, view our online [documentation](https://nodejs.org/en/docs/).
