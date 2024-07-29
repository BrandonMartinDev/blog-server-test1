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

async function PostSignupValidator(req: Request, res: Response, next: NextFunction) {

    try {

        // Get username and password from request body
        const { username, password } = req.body;


        // Validate username and password exist on request body

        if (!username) {

            RespondToClient(res, {

                statusCode: 422,

                responseJson: {
                    error: "'username' was not provided in the request's body"
                }

            });

            return;

        }

        if (!password) {

            RespondToClient(res, {

                statusCode: 422,

                responseJson: {
                    error: "'password' was not provided in the request's body"
                }

            });

            return;

        }


        // Validate username and password are within the correct length range

        if (username.length > 23 || username.length < 3) {

            RespondToClient(res, {

                statusCode: 422,

                responseJson: {
                    error: "Username field length is invalid. Username must be between 3-23 characters long."
                }

            });

            return;

        }

        if (password.length > 150 || password.length < 8) {

            RespondToClient(res, {

                statusCode: 422,

                responseJson: {
                    error: "Password field length is invalid. Password must be between 8-150 characters long."
                }

            });

            return;

        }


        // Validate username is in the correct format

        const usernameRegEx = new RegExp(/^[A-Za-z]{1}\w{1,21}[A-Za-z0-9]{1}$/, "g");
        const passedUsernameRegEx = usernameRegEx.test(username);

        if (!passedUsernameRegEx) {

            RespondToClient(res, {

                statusCode: 422,

                responseJson: {
                    error: "Usernames must start with a letter and can contain any alphanumeric character and underscores. Usernames must also end with only an alphanumeric character and must be between 3-23 characters in length."
                }

            });

            return;

        }


        // Checks if user with the same username already exists

        const user = await GetUserByName(username);

        if (user) {

            RespondToClient(res, {

                statusCode: 409,

                responseJson: {
                    error: `A user with the username '${username}' already exists!`
                }

            });

            return;

        }

        next();

    } catch (err) {

        CatchErr(err, "ERROR VALIDATING SIGNUP");

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

    PostSignupValidator

}