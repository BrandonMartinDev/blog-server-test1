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
import { CreateUser } from '@v1/services/user.service';



// -- == [[ CONTROLLER METHODS ]] == -- \\

async function SignupUser(req: Request, res: Response, next: NextFunction) {

    try {

        // Get username and password from request body
        const { username, password } = req.body;

        
        // Creates the user

        const newUser = await CreateUser(username, password);
        if (!newUser) throw new Error("There was an error creating the user");

        RespondToClient(res, {

            statusCode: 201,

            responseJson: {
                message: `Successfully created user: ${username}`
            }

        });

    } catch (err) {

        CatchErr(err);

        RespondToClient(res, {

            statusCode: 500,

            responseJson: {
                error: "There was an error creating the user"
            }

        });

    }

}



// -- == [[ EXPORTS ]] == -- \\

export {

    SignupUser

}