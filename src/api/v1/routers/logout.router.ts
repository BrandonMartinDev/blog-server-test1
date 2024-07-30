// -- == [[ IMPORTS ]] == -- \\

// Types

import {
    type Request,
    type Response,
    type NextFunction
} from 'express';


// Modules/Packages

import express from 'express';


// Validators

import { ValidateUserIsLoggedIn } from '@v1validators/login.validator';


// Controllers

import { LogoutUser } from '@v1controllers/logout.controller';


// Services

import { RespondToClient } from '@v1services/Response.service';



// -- == [[ INITIALIZE LOGOUT ROUTER ]] == -- \\

const LogoutRouter = express.Router();



// -- == [[ ROUTE ENDPOINTS TO ROUTERS ]] == -- \\

LogoutRouter.route('/')
    // DELETE /api/v1/login
    .delete(ValidateUserIsLoggedIn, LogoutUser)
    // GET /api/v1/login
    .get((req: Request, res: Response, next: NextFunction) => {

        RespondToClient(res, {

            statusCode: 200,

            responseJson: {
                message: "/api/v1/logout is OK"
            }

        });

    })



// -- == [[ EXPORTS ]] == -- \\

export default LogoutRouter;