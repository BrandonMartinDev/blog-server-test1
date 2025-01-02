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

import {

    GetLoggedInUser,
    GetUser,
    GetUserArticleLikes,
    GetCurrentUserArticleLikes,

    AddArticleLike,
    RemoveArticleLike

} from '@v1controllers/user.controller';


// Services

import { RespondToClient } from '@v1services/Response.service';



// -- == [[ INITIALIZE USER ROUTER ]] == -- \\

const UserRouter = express.Router();



// -- == [[ ROUTE ENDPOINTS TO ROUTERS ]] == -- \\

UserRouter.route('/current/likes')
    // GET /api/v1/user/current/likes
    .get(ValidateUserIsLoggedIn, GetCurrentUserArticleLikes)
    // POST /api/v1/user/current/likes
    .post(ValidateUserIsLoggedIn, AddArticleLike)
    // DELETE /api/v1/user/current/likes
    .delete(ValidateUserIsLoggedIn, RemoveArticleLike);

UserRouter.route('/current')
    // GET /api/v1/user/current
    .get(ValidateUserIsLoggedIn, GetLoggedInUser);



UserRouter.route('/:id/likes')
    // GET /api/v1/user/{UserID}/likes
    .get(GetUserValidator, GetUserArticleLikes)
    // POST /api/v1/user/{UserID}/likes
    .post(ValidateUserIsLoggedIn, GetUserValidator);

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