// -- == [[ IMPORTS ]] == -- \\

// Modules/Packages

import bcrypt from 'bcrypt';


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



        // Compares if the password provided with the user's hashed password

        const isValidPass = await bcrypt.compare(password, user.password);

        if (!isValidPass) {

            RespondToClient(res, {

                statusCode: 200,
    
                responseJson: {
                    error: `Username or password is incorrect.`
                }
    
            });
    
            return;

        }


        // Sets the session's loggedInUserID to the user

        const loggedInUserID = user._id.toString();

        req.session.loggedInUserID = loggedInUserID;


        RespondToClient(res, {

            statusCode: 200,

            responseJson: {
                message: `Successfully logged in as ${user.displayName} - ${user._id}`,
                data: loggedInUserID
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