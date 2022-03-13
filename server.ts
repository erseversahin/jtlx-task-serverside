import express, {Request,Response,NextFunction,Errback} from 'express'
const app = express();
import {connectDatabase} from './helpers/database/connectDatabase'
import {customErrorHandler} from './middlewares/errors/customErrorHandler'
import fs, {readFileSync} from 'fs'
import swaggerJsDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import router from "./routers"
import mongoSanitize from "express-mongo-sanitize"
import helmet from 'helmet';
import {limitAccess } from "./middlewares/auth/limitAccess"
import cors from "cors"

//Open Api Documentation
let swaggerOptions:any = fs.readFileSync( "./swagger.json" );
const swaggerDefinition = JSON.parse(swaggerOptions);
const swaggerDocs = swaggerJsDoc(swaggerDefinition);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//Mongo Connection
connectDatabase();
app.use(express.json())

//Security
app.use(mongoSanitize());
app.use(helmet());
app.use(cors({
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
}));

//Static Files
app.use(express.static("./public"))




//Router
app.use("/api",router)

//Error Handler
app.use(customErrorHandler)



app.listen(process.env.PORT,()=>{
    console.log(`App started on ${process.env.PORT} Mode : ${process.env.ENV}`);
})


