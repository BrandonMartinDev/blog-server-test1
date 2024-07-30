// -- == [[ IMPORTS ]] == -- \\

// Types

import {
    type Request,
    type Response,
    type NextFunction
} from 'express';


// Utils

import { CatchErr } from '@v1/utils/CatchErr.utils';


// Services

import { RespondToClient } from '@v1/services/Response.service';
import { GetUserByName } from '@v1services/user.service';



// -- == [[ CONTROLLER METHODS ]] == -- \\

async function LoginUser(req: Request, res: Response, next: NextFunction) {

    try {

        // Get username and password from request body
        const { username, password } = req.body;


        // Checks if a user with the username provided exists

        const user = await GetUserByName(username);

        if (!user) {

            RespondToClient(res, {

                statusCode: 200,

                responseJson: {
                    error: `Username or password is incorrect.`
                }

            });

            return;

        };


        // Checks if a the password provided is the same as the user's password

        if (password !== user.password) {

            RespondToClient(res, {

                statusCode: 200,

                responseJson: {
                    error: `Username or password is incorrect.`
                }

            });

            return;

        }


        // Sets the session's loggedInUserID to the user

        req.session.loggedInUserID = user._id.toString();


        RespondToClient(res, {

            statusCode: 200,

            responseJson: {
                message: `Successfully logged in as ${user._id}`
            }

        });

    } catch (err) {

        CatchErr(err, "ERROR LOGGING IN");

        RespondToClient(res, {

            statusCode: 500,

            responseJson: {
                error: "There was an error logging in"
            }

        });

    }

}



// -- == [[ EXPORTS ]] == -- \\

export {

    LoginUser

}