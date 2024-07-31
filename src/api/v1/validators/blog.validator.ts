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


        // Checks if title and sections exist on request body

        const { title, sections } = req.body;

        if (!title) {

            RespondToClient(res, {

                statusCode: 400,

                responseJson: {
                    error: "'title' was not provided in the request body"
                }

            });

            return;

        }

        if (!sections) {

            RespondToClient(res, {

                statusCode: 400,

                responseJson: {
                    error: "'sections' was not provided in the request body"
                }

            });

            return;

        }

        if (!sections.length || sections.length < 1) {

            RespondToClient(res, {

                statusCode: 400,

                responseJson: {
                    error: "There must be at least 1 section provided in 'sections'"
                }

            });

            return;

        }


        // Validates sections data

        for (let i = 0; i < sections.length; i++) {

            const section = sections[i];


            // Validate section heading

            if (!section.heading) {

                RespondToClient(res, {

                    statusCode: 400,

                    responseJson: {
                        error: (`'heading' missing on section '${i}'`)
                    }

                });

                return;

            }

            if (!section.heading.length || section.heading.length > 100 || section.heading.length < 3) {

                RespondToClient(res, {

                    statusCode: 400,

                    responseJson: {
                        error: (`'heading' on section '${i}' must be between 3-100 characters long.`)
                    }

                });

                return;

            }


            // Validate section textSections

            if (!section.textSections) {

                RespondToClient(res, {

                    statusCode: 400,

                    responseJson: {
                        error: (`'textSections' missing on section '${i}'`)
                    }

                });

                return;

            }

            if (!section.textSections.length || section.textSections.length < 1) {

                RespondToClient(res, {

                    statusCode: 400,

                    responseJson: {
                        error: (`section '${i}' must have at least one textSection`)
                    }

                });

                return;

            }


            // Validate each textSection

            for (let j = 0; j < section.textSections.length; j++) {

                const textSection = section.textSections[j];


                // Validate textSection body

                if (!textSection.body) {

                    RespondToClient(res, {

                        statusCode: 400,

                        responseJson: {
                            error: (`'body' missing on textSection '${j}' in section '${i}'`)
                        }

                    });

                    return;

                }

                if (!textSection.body.length || textSection.body.length > 1500 || textSection.body.length < 5) {

                    RespondToClient(res, {

                        statusCode: 400,

                        responseJson: {
                            error: (`'body' on textSection '${j}' in section '${i}' must be between 5-1500 characters long.`)
                        }

                    });

                    return;

                }


                // Validate textSection image (image is not required)

                if ("image" in textSection) {

                    if (!textSection.image.url) {

                        RespondToClient(res, {

                            statusCode: 400,

                            responseJson: {
                                error: (`'url' missing on 'image' in textSection '${j}' in section '${i}'`)
                            }

                        });

                        return;

                    }

                    if (!textSection.image.url.length || textSection.image.url.length > 1000 || textSection.image.url.length < 3) {

                        RespondToClient(res, {

                            statusCode: 400,

                            responseJson: {
                                error: (`'url' on 'image' in textSection '${j}' in section '${i}' must be between 3-1000 characters long.`)
                            }

                        });

                        return;

                    }

                }

            }

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

    ValidateCanPostBlog,
    ValidateGetBlog

}