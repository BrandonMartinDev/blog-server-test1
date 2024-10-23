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



// -- == [[ CONTROLLER METHODS ]] == -- \\

async function LogoutUser(req: Request, res: Response, next: NextFunction) {

    try {

        // Gets session

        const session = req.session;

        if (!session.loggedInUserID) {

            RespondToClient(res, {

                statusCode: 401,

                responseJson: {
                    error: `Not logged in`
                }

            });

            return;

        }


        // Destroys the session

        session.destroy((err) => {
            if (err) throw new Error("There was an error destroy the session");
        });
        
        
        RespondToClient(res, {

            statusCode: 200,

            responseJson: {
                message: `Successfully logged out`
            }

        });

    } catch (err) {

        CatchErr(err, "ERROR LOGGING OUT");

        RespondToClient(res, {

            statusCode: 500,

            responseJson: {
                error: "There was an error logging out"
            }

        });

    }

}



// -- == [[ EXPORTS ]] == -- \\

export {

    LogoutUser

}