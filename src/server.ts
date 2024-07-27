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


// Services

import { RespondToClient } from '@v1services/Response.service';



// -- == [[ INITIALIZE EXPRESS APP AND FIRST MIDDLEWARES ]] == -- \\

const app = express();

app.use(express.json());



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

    app.listen(PORT, () => {
        console.log(`Server is ONLINE at PORT: ${PORT}`);
    })

}

StartServer();