// -- == [[ IMPORTS ]] == -- \\

// Types

import {
    type Request,
    type Response,
    type NextFunction
} from 'express';


// Modules/Packages

import mongoose from 'mongoose';


// Utils

import { CatchErr } from '@v1utils/CatchErr.utils'


// Services

import { RespondToClient } from '@v1/services/Response.service';
import { GetUserByID } from '@v1services/user.service';



// -- == [[ VALIDATOR METHODS ]] == -- \\



async function ValidateBlogInfo(req: Request, res: Response, next: NextFunction) {


    try {

        // Checks if coverImage, title and body exist on request body

        const { coverImage, title, body } = req.body;

        if (!coverImage) {

            RespondToClient(res, {

                statusCode: 400,

                responseJson: {
                    error: "'coverImage' was not provided in the request body"
                }

            });

            return;

        }

        if (!title) {

            RespondToClient(res, {

                statusCode: 400,

                responseJson: {
                    error: "'title' was not provided in the request body"
                }

            });

            return;

        }

        if (!body) {

            RespondToClient(res, {

                statusCode: 400,

                responseJson: {
                    error: "'body' was not provided in the request body"
                }

            });

            return;

        }


        // Validates coverImage, title and body

        if (!coverImage.length || coverImage.length < 3 || coverImage.length > 1000) {

            RespondToClient(res, {

                statusCode: 400,

                responseJson: {
                    error: "'coverImage' url must be between 3-1000 characters long!"
                }

            });

            return;

        }

        if (!title.length || title.length < 3 || title.length > 100) {

            RespondToClient(res, {

                statusCode: 400,

                responseJson: {
                    error: "'title' must be between 3-100 characters long!"
                }

            });

            return;

        }

        if (!body.length || body.length < 5 || body.length > 25000) {

            RespondToClient(res, {

                statusCode: 400,

                responseJson: {
                    error: "'body' must be between 5-25000 characters long!"
                }

            });

            return;

        }

        next();

    } catch (err) {

        CatchErr(err, "ERROR VALIDATING BLOG INFO");

        RespondToClient(res, {

            statusCode: 500,

            responseJson: {
                error: "There was an unknown error processing your request"
            }

        });

    }

}

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

async function ValidateGetBlog(req: Request, res: Response, next: NextFunction) {

    try {

        // Gets blog_id 

        if (!("blog_id" in req.params)) {

            RespondToClient(res, {

                statusCode: 400,

                responseJson: {
                    error: "'blog_id' parameter was not found. Please format your request to the following: /api/v1/blog/{BLOG_ID_HERE}"
                }

            });

            return;

        }

        const { blog_id } = req.params;


        // Validates blog_id

        const validID = mongoose.isValidObjectId(blog_id);

        if (!validID) {

            RespondToClient(res, {

                statusCode: 400,

                responseJson: {
                    error: `id parameter provided, '${blog_id}', is not a valid BSON object id!`
                }

            })

            return;

        }

        next();

    } catch (err) {

        CatchErr(err, "ERROR VALIDATING GET BLOG");

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

    ValidateBlogInfo,
    ValidateCanPostBlog,
    ValidateGetBlog

}