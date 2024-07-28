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



// -- == [[ VALIDATOR METHODS ]] == -- \\

async function GetUserValidator(req: Request, res: Response, next: NextFunction) {

    try {

        const { id } = req.params;
        if (!id) {
            RespondToClient(res, {

                statusCode: 400,

                responseJson: {
                    error: "'id' parameter was not found. Please format your request to the following: /api/v1/user/{USER_ID_HERE}"
                }

            })
        }

        next();

    } catch (err) {

        CatchErr(err, "ERROR VALIDATING GET USER");

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

    GetUserValidator

}