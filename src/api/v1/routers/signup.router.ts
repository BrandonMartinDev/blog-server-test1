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

import { PostSignupValidator } from '@v1validators/signup.validator';


// Controllers

import { SignupUser } from '@v1controllers/signup.controller';


// Services

import { RespondToClient } from '@v1services/Response.service';



// -- == [[ INITIALIZE SIGNUP ROUTER ]] == -- \\

const SignupRouter = express.Router();



// -- == [[ ROUTE ENDPOINTS TO ROUTERS ]] == -- \\

SignupRouter.route('/')
    // POST /api/v1/signup
    .post(PostSignupValidator, SignupUser)
    // GET /api/v1/signup
    .get((req: Request, res: Response, next: NextFunction) => {

        RespondToClient(res, {
            statusCode: 200,
            responseJson: {
                message: "/api/v1/signup is OK"
            }
        });

    })



// -- == [[ EXPORTS ]] == -- \\

export default SignupRouter;