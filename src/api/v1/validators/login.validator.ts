// -- == [[ IMPORTS ]] == -- \\

// Types

import {
    type Request,
    type Response,
    type NextFunction
} from 'express';


// Utils

import { CatchErr } from '@v1utils/CatchErr.utils'


// Services

import { RespondToClient } from '@v1/services/Response.service';
import { GetUserByName } from '@v1services/user.service';



// -- == [[ VALIDATOR METHODS ]] == -- \\

async function ValidateUserIsLoggedIn(req: Request, res: Response, next: NextFunction) {

    try {

        console.log(req.session);

        if (req.session) {

        }

        next();

    } catch (err) {

        CatchErr(err, "ERROR VALIDATING USER IS LOGGED IN");

        RespondToClient(res, {

            statusCode: 500,

            responseJson: {
                error: "There was an unknown error processing your request"
            }

        });

    }

}

async function LoginValidator(req: Request, res: Response, next: NextFunction) {

    try {

        // Checks if a logged in user exists in the session

        const userId = req.session.loggedInUserID;        

        if (userId) {

            console.log(`${req.ip} was already logged in as ${userId}`);

            // If it does exist, returns what user is already logged in

            RespondToClient(res, {

                statusCode: 200,

                responseJson: {
                    message: (`Successfully logged in as ${userId}`)
                }

            })

            return;

        }


        // Checks if there is a username and password in the request body

        const { username, password } = req.body;

        if (!username) {

            RespondToClient(res, {

                statusCode: 400,

                responseJson: {
                    error: "'username' was not provided in the request body."
                }

            });

            return;

        }

        if (!password) {

            RespondToClient(res, {

                statusCode: 400,

                responseJson: {
                    error: "'password' was not provided in the request body."
                }

            });

            return;

        }

        next();

    } catch (err) {

        CatchErr(err, "ERROR VALIDATING LOGIN");

        RespondToClient(res, {

            statusCode: 500,

            responseJson: {
                error: "There was an unknown error processing your request"
            }

        });

    }

}



// -- == [[ EXPORTS ]] == -- \\

export {

    ValidateUserIsLoggedIn,
    LoginValidator

}