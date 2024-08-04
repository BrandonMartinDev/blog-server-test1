// -- == [[ IMPORTS ]] == -- \\

// Modules/Packages

import bcrypt from 'bcrypt';


// Types

import {
    type Request,
    type Response,
    type NextFunction
} from 'express';


// Defaults

import { SALT_ROUNDS } from '@v1config/defaults';


// Utils

import { CatchErr } from '@v1utils/CatchErr.utils';


// Services

import { RespondToClient } from '@v1services/Response.service';
import { CreateUser } from '@v1services/user.service';



// -- == [[ CONTROLLER METHODS ]] == -- \\

async function SignupUser(req: Request, res: Response, next: NextFunction) {

    try {

        // Get username and password from request body

        const { username, password } = req.body;

        // Hash password

        bcrypt.hash(password, SALT_ROUNDS, async (err, hashedPassword) => {

            if (err) {
                CatchErr(err);
                throw new Error("There was an error creating the user");
            }

            const newUser = await CreateUser(username, hashedPassword);
            if (!newUser) throw new Error("There was an error creating the user");

            RespondToClient(res, {

                statusCode: 201,

                responseJson: {
                    message: `Successfully created user: ${username}`
                }

            });

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