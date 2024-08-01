// -- == [[ IMPORTS ]] == -- \\

// Types

import {
    type Request,
    type Response,
    type NextFunction
} from 'express';

import { User } from '@v1/types/user-types';


// Utils

import { CatchErr } from '@v1utils/CatchErr.utils';


// Services

import { RespondToClient } from '@v1services/Response.service';
import { GetUserByID } from '@v1services/user.service';
import { SanitizeUser } from '@v1/services/sanitize.service';



// -- == [[ CONTROLLER METHODS ]] == -- \\

async function GetUser(req: Request, res: Response, next: NextFunction) {

    try {

        // Gets id from request parameters

        const { id } = req.params;
        if (!id) throw new Error("Could not get 'id' parameter!");


        // Gets user from id

        const user = await GetUserByID(id);

        if (!user) {

            RespondToClient(res, {

                statusCode: 404,

                responseJson: {
                    error: `A user with an id of ${id} could not be found!`
                }

            });

            return;

        }


        // Sanitizes user to be sent to client safely

        const sanitizedUser = SanitizeUser(user as unknown as User);


        RespondToClient(res, {

            statusCode: 200,

            responseJson: {

                message: "Successfully retrieved user info",
                data: sanitizedUser

            }

        })

    } catch (err) {
        CatchErr(err, "ERROR GETTING USER")
    }

}



// -- == [[ EXPORTS ]] == -- \\

export {

    GetUser

}