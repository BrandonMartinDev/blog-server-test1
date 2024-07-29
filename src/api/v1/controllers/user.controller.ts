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

        const { id } = req.params;

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

        const sanitizedUser = {

            username: user.username,
            displayName: user.displayName,
            createdBlogArticles: user.createdBlogArticles,
            createdComments: user.createdComments,

            createdAt: user.createdAt

        }

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