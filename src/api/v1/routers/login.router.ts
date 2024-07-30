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

import { LoginValidator } from '@v1validators/login.validator';


// Controllers

import { LoginUser } from '@v1controllers/login.controller';


// Services

import { RespondToClient } from '@v1services/Response.service';



// -- == [[ INITIALIZE LOGIN ROUTER ]] == -- \\

const LoginRouter = express.Router();



// -- == [[ ROUTE ENDPOINTS TO ROUTERS ]] == -- \\

LoginRouter.route('/')
    // POST /api/v1/login
    .post(LoginValidator, LoginUser)
    // GET /api/v1/login
    .get((req: Request, res: Response, next: NextFunction) => {

        RespondToClient(res, {

            statusCode: 200,

            responseJson: {
                message: "/api/v1/login is OK"
            }

        });

    })



// -- == [[ EXPORTS ]] == -- \\

export default LoginRouter;