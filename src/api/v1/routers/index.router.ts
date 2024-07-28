// -- == [[ IMPORTS ]] == -- \\

// Types

import {
    type Request,
    type Response,
    type NextFunction
} from 'express';


// Modules/Packages

import express from 'express';


// Routers

import SignupRouter from '@v1routers/signup.router';
import UserRouter from '@v1routers/user.router';


// Services

import { RespondToClient } from '@v1services/Response.service';



// -- == [[ INITIALIZE MAIN ROUTER ]] == -- \\

const MainRouter = express.Router();



// -- == [[ ROUTE ENDPOINTS TO ROUTERS ]] == -- \\

MainRouter.use('/signup', SignupRouter);
MainRouter.use('/user', UserRouter);




// -- == [[ HANDLE CATCH-ALL ENDPOINTS ]] == -- \\

MainRouter.route('/')
    // ALL /api/v1/
    .all((req: Request, res: Response, next: NextFunction) => {

        RespondToClient(res, {
            statusCode: 200,
            responseJson: {
                message: "/api/v1/ is OK"
            }
        });

    });



// -- == [[ EXPORTS ]] == -- \\

export default MainRouter;