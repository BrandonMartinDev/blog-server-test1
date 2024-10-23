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

import { GetUserValidator } from '@v1validators/user.validator';
import { ValidateUserIsLoggedIn } from '@v1/validators/login.validator';


// Controllers

import { GetLoggedInUser, GetUser } from '@v1controllers/user.controller';


// Services

import { RespondToClient } from '@v1services/Response.service';



// -- == [[ INITIALIZE USER ROUTER ]] == -- \\

const UserRouter = express.Router();



// -- == [[ ROUTE ENDPOINTS TO ROUTERS ]] == -- \\

UserRouter.route('/current')
    // GET /api/v1/user/current
    .get(ValidateUserIsLoggedIn, GetLoggedInUser);



UserRouter.route('/:id')
    // GET /api/v1/user/{UserID}
    .get(GetUserValidator, GetUser);



UserRouter.route('/')
    // GET /api/v1/user
    .get((req: Request, res: Response, next: NextFunction) => {

        RespondToClient(res, {
            statusCode: 200,
            responseJson: {
                message: "/api/v1/user is OK"
            }
        });

    });



// -- == [[ EXPORTS ]] == -- \\

export default UserRouter;