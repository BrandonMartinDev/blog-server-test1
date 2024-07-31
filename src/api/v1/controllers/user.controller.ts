// -- == [[ IMPORTS ]] == -- \\

// Types

import {
    type Request,
    type Response,
    type NextFunction
} from 'express';


// Utils

import { CatchErr } from '@v1utils/CatchErr.utils';


// Services

import { RespondToClient } from '@v1services/Response.service';
import { GetUserByID } from '@v1services/user.service';



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

        const sanitizedUser: any = user;        // I knowwww I hate using any too, but this will have to do for now ~ 7/31/2024

        sanitizedUser.__v = undefined;          // I would have preferred to use the 'delete' syntax, but this will have to do :(
        sanitizedUser.password = undefined;
        sanitizedUser.updatedAt = undefined;


        RespondToClient(res, {

            statusCode: 200,

            responseJson: {

                message: "Successfully retrieved user info",
                data: {
                    user: sanitizedUser
                }

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