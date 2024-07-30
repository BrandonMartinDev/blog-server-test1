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
import { GetUserByID } from '@v1services/user.service';



// -- == [[ VALIDATOR METHODS ]] == -- \\

async function ValidateCanPostBlog(req: Request, res: Response, next: NextFunction) {

    try {

        // Gets logged in userid

        const userId = req.session.loggedInUserID;

        if (!userId) {

            RespondToClient(res, {

                statusCode: 401,

                responseJson: {
                    error: "Not logged in"
                }

            });

            return;

        }


        // Gets user from userid

        const user = await GetUserByID(userId);

        if (!user) {

            RespondToClient(res, {

                statusCode: 500,

                responseJson: {
                    error: "There was an error getting the current logged in user"
                }

            });

            return;

        }

        
        // Checks if user has valid permissions to post blog

        if (!user.permissions?.canPostBlog) {

            RespondToClient(res, {

                statusCode: 403,

                responseJson: {
                    error: "Unauthorized"
                }

            });

            return;

        }

        next();

    } catch (err) {

        CatchErr(err, "ERROR VALIDATING USER CAN POST BLOG");

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

    ValidateCanPostBlog,

}