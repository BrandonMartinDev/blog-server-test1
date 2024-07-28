// -- == [[ INITIALIZE DOTENV ]] == -- \\

import 'dotenv/config';



// -- == [[ IMPORTS ]] == -- \\

// Types

import {
    type Request,
    type Response,
    type NextFunction
} from 'express';


// Defaults

import { PORT } from '@v1config/defaults';


// Modules/Packages

import express from 'express';


// Utils

import { CatchErr } from '@v1utils/CatchErr.utils';


// Database

import { ConnectToDB } from "@v1database/MongoDB.database";


// Routers

import MainRouter from '@v1routers/index.router';


// Services

import { RespondToClient } from '@v1services/Response.service';



// -- == [[ INITIALIZE EXPRESS APP AND FIRST MIDDLEWARES ]] == -- \\

const app = express();

app.use(express.json());



// -- == [[ INITIALIZE MAIN ROUTER ]] == -- \\

app.use('/api/v1', MainRouter);



// -- == [[ HANDLE CATCH-ALL ENDPOINTS ]] == -- \\


// GET '/'

app.get('/', (req: Request, res: Response, next: NextFunction) => {

    RespondToClient(res, {
        statusCode: 200,
        responseJson: {
            message: "Blog server is OK - now stop snooping around here... Please...",
        }
    });

    next();

})


// GET '/?'

app.get('*', (req: Request, res: Response, next: NextFunction) => {

    if (res.headersSent) return;

    RespondToClient(res, {
        statusCode: 404,
        responseJson: {
            error: `The endpoint you requested, '${req.originalUrl}', could not be found!`
        }
    });

    next();

})



// -- == [[ INITIALZE FINAL MIDDLEWARE ]] == -- \\




// -- == [[ INITIALIZE SERVER STARTUP METHOD ]] == -- \\

async function StartServer() {

    try {

        const connectedDB = await ConnectToDB();

        if (!connectedDB) throw new Error("There was an error connecting to database!");

        app.listen(PORT, () => {
            console.log(`Server is ONLINE at PORT: ${PORT}`);
        });

    } catch (err) {
        CatchErr(err, "SERVER COULD NOT START");
    }

}

StartServer();