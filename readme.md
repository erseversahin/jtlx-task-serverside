## UserAPI

This project was created for Jetlexa.

![NodeJs](https://img.shields.io/badge/-NodeJS-05122A?style=flat&logo=node.js&logoColor=FFA518)
![ExpressJS](https://img.shields.io/badge/-ExpressJS-05122A?style=flat&logo=express&logoColor=FFA518)
![JavaScript](https://img.shields.io/badge/-JavaScript-05122A?style=flat&logo=javascript)
![TypeScript](https://img.shields.io/badge/-TypeScript-05122A?style=flat&logo=typescript)

## Getting started

To get the Node server running locally:

- Clone this repo
- `npm install` to install all required dependencies
- Create MongoDb Cluster and Get Connection MongoDb URI
- Set environment variables in `.dev.env` and `.production.env` under `./env/` folder.
  * Set `MONGO_URI = <YOUR_MONGO_URI>`
  * Set `JWT_SECRET_KEY = <YOUR_SECRET_KEY>`
  * Set `JWT_EXPIRE = <AUTHENTICATION_EXPIRE_TIME>`
  * Set `JWT_COOKIE = <AUTHENTICATION_EXPIRE_TIME>`
  * Set `PORT = <YOUR_PORT>`
  * Set `ENV = <DEVELOPMENT | PRODUCTION>`
  
- `npm run watch:tsc` will watch .ts files and converting to .js live and builds to `./build` folder
- `npm run build:tsc` will all .ts files converting to .js and builds to `./build` folder
- `npm run dev` start server with development environments `.dev.env`
- `npm run start` start server with production environments `.dev.env`

## API Documentation

![PostMan](https://img.shields.io/badge/-PostMan-05122A?style=flat&logo=postman)
![Swagger UL](https://img.shields.io/badge/-SwaggerUI-05122A?style=flat&logo=Swagger)

- [Swagger UI](https://jtlx-task-serverside.herokuapp.com/api-docs/) - You can test in Swagger UI ([Go to SwaggerUI](https://jtlx-task-serverside.herokuapp.com/api-docs/))
- [Postman Collection v2.1](JetlexaTask.postman_collection.json) - Download Postman Collection and test it. ([Go to Postman Collection](JetlexaTask.postman_collection.json))

## Dependencies

- [express](https://github.com/expressjs/express) - The server for handling and routing HTTP requests
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) - For generating JWTs used by authentication
- [mongoose](https://github.com/Automattic/mongoose) - For modeling and mapping MongoDB data to JavaScript 
- [bcryptjs](https://github.com/dcodeIO/bcrypt.js) - Hashing Password
- [dotenv](https://github.com/motdotla/dotenv) - Zero-Dependency module that loads environment variables
- [cors](https://github.com/motdotla/dotenv) - CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
- [express-async-handler](https://github.com/Abazhenov/express-async-handler) - Simple middleware for handling exceptions inside of async express routes and passing them to your express error handlers.
- [express-mongo-sanitize](https://github.com/fiznool/express-mongo-sanitize) - Express 4.x middleware which sanitizes user-supplied data to prevent MongoDB Operator Injection.
- [express-rate-limit](https://github.com/nfriedly/express-rate-limit) - Basic rate-limiting middleware for Express. Use to limit repeated requests to public APIs and/or endpoints such as password reset.
- [helmet](https://github.com/helmetjs/helmet) - Helmet helps you secure your Express apps by setting various HTTP headers.
- [multer](https://github.com/expressjs/multer) - Multer is a node.js middleware for handling `multipart/form-data`, which is primarily used for uploading files. It is written on top of busboy for maximum efficiency.
- [nodemon](https://github.com/remy/nodemon) - nodemon is a tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected.
- [swagger-jsdoc](https://github.com/Surnet/swagger-jsdoc) - This library reads your JSDoc-annotated source code and generates an OpenAPI (Swagger) specification.
- [swagger-ui-express](https://github.com/scottie1984/swagger-ui-express) - This module allows you to serve auto-generated swagger-ui generated API docs from express, based on a swagger.json file. The result is living documentation for your API hosted from your API server via a route.

## Application Structure
- `server.js` - The entry point to our application. This file defines our express server and connects it to MongoDB using mongoose. It also inncludes the routes we'll be using in the application.
- `env/` - This folder contains configuration for central location environment variables and other configurations.
- `routes/` - This folder contains the route definitions (user, account etc. ) for the API.
- `models/` - This folder contains the schema definitions for our Mongoose models (User, Account).
- `controllers/` - This folder contains controllers for our API.
- `middlewares/` - This folder contains middlewares for our API.
- `helpers/` - This folder contains helper functions for adapting 3rd party libraries for the API.


## Error Handling
In `middlewares/errors/customErrorHandler.js`, I define a error-handling middleware for handling Mongoose's errors and our own errors.

## Authentication
Requests are authenticated using the `Authorization` header and value `Bearer {{token}}`. with a valid JWT. 
I define express middlewares in `middlewares/auth/auth.js` that can be used to authenticate requests. The `required` middlewares returns `401` or `403`.
